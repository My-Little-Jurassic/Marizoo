package com.marizoo.user.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marizoo.user.api.LoginResponseApi;
import com.marizoo.user.auth.PrincipalDetails;
import com.marizoo.user.dto.LoginRequestDto;
import com.marizoo.user.entity.User;
import com.marizoo.user.dto.ExceptionResponseDto;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static com.marizoo.user.constant.JwtConstant.*;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    private final ObjectMapper om;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            LoginRequestDto loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDto.getUid(), loginRequestDto.getPwd());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            return authentication;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        
        // access token 생성
        String accessToken = createAccessToken(principalDetails);

        // refresh token 생성
        String refreshToken = createRefreshToken(principalDetails);

        // DB에 refreshToken 저장한다.
        User user = saveRefreshToken(principalDetails, refreshToken);

        // header에 access token을 저장한다.
        response.addHeader(AT_HEADER, TOKEN_HEADER_PREFIX + accessToken);
        response.getWriter().write(om.writeValueAsString(new LoginResponseApi(user.getId(), user.getUid(), user.getNickname())));

        // refresh token 쿠키에 저장한다.
        setCookieRefreshToken(response, refreshToken);

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        if (failed instanceof BadCredentialsException) {
            log.error("로그인 에러");

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(om.writeValueAsString(new ExceptionResponseDto("아이디 또는 비밀번호가 일치하지 않습니다.")));
        } else if (failed instanceof UsernameNotFoundException) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(om.writeValueAsString(new ExceptionResponseDto(failed.getMessage())));
        }
        // UsernameNotFoundException : 계정 없음
        //BadCredentialsException : 아이디 또는 비밀번호 불일치
        //AccountStatusException
        //AccountExpiredException : 계정만료
        //CredentialsExpiredException : 비밀번호 만료
        //DisabledException : 계정 비활성화
        //LockedException : 계정 잠김
    }

    private static void setCookieRefreshToken(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(RT_HEADER, refreshToken)
                .httpOnly(true)
                .maxAge(RT_EXP_TIME)
                .domain("localhost")
                .path("/refresh")
                .sameSite("none")
                .secure(true)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    private User saveRefreshToken(PrincipalDetails principalDetails, String refreshToken) {
        User user = userRepository.findByUid(principalDetails.getUser().getUid()).orElseThrow(
                () -> new UsernameNotFoundException("로그인 중 에러가 발생하였습니다.")
        );

        user.setRefreshToken(refreshToken);
        return userRepository.save(user);
    }

    private static String createRefreshToken(PrincipalDetails principalDetails) {
        String refreshToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + RT_EXP_TIME))
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .sign(Algorithm.HMAC512(JWT_SECRET));
        return refreshToken;
    }

    private static String createAccessToken(PrincipalDetails principalDetails) {
        String accessToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + AT_EXP_TIME))
                .withClaim("uid", principalDetails.getUser().getUid())
                .sign(Algorithm.HMAC512(JWT_SECRET));
        return accessToken;
    }

}
