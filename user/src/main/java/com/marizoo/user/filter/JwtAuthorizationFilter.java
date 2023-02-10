package com.marizoo.user.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.marizoo.user.auth.PrincipalDetails;
import com.marizoo.user.entity.User;
import com.marizoo.user.exception.AccessTokenException;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.marizoo.user.constant.JwtConstant.*;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("권한이나 인증 처리를 위한 필터 입장:)");
        log.info("URI = {}", request.getRequestURI());
        String servletPath = request.getServletPath();
        String jwtHeader = request.getHeader(AT_HEADER);

        if (servletPath.equals("/refresh")) {
            log.info("리프레스 요청을 처리하는 필터 입장:)");
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtHeader == null || !jwtHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            log.info("Jwt 헤더가 없거나 Barer Jwt가 아닌경우 처리하는 필터 입장:)");
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = jwtHeader.replace(TOKEN_HEADER_PREFIX, "");

        if (jwtToken != null) {
            String uid = validateJwtToken(jwtToken);

            if (uid == null) {
                log.error("UID is NULL");
                throw new AccessTokenException("엑세스 토큰이 잘못되었습니다.");
            }


            User userEntity = userRepository.findByUid(uid).orElseThrow(() -> {
                log.error("UID = {}, User Entity is NULL", uid);
                throw new AccessTokenException("엑세스 토큰이 잘못되었습니다.");
            });

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    principalDetails,
                    null,
                    principalDetails.getAuthorities()
            );

            // 강제로 시큐리티 세션에 접근하여 authentication 객체를 저장함.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        }
    }

    private String validateJwtToken(String jwtToken) {
        try {
            return JWT.require(Algorithm.HMAC512(JWT_SECRET))
                    .build()
                    .verify(jwtToken)
                    .getClaim("uid")
                    .asString();
        } catch (JWTDecodeException e) {
            log.error(e.getClass().toString());
            log.error(e.getMessage());
            throw e;
        } catch (TokenExpiredException e) {
            log.error(e.getClass().toString());
            log.error(e.getMessage());
            throw e;
        }
    }
}
