package com.marizoo.user.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marizoo.user.entity.User;
import com.marizoo.user.filter.ExceptionHandlerFilter;
import com.marizoo.user.filter.JwtAuthenticationFilter;
import com.marizoo.user.filter.JwtAuthorizationFilter;
import com.marizoo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final UserRepository userRepository;
    private final ObjectMapper om;

    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeRequests()
//                .antMatchers("/users", "/refresh").permitAll()
//                .antMatchers(
//                        "/swagger-resources/**",
//                        "/swagger-ui.html",
//                        "/v2/api-docs",
//                        "/webjars/**")
//                .permitAll()
                .anyRequest().permitAll()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .apply(new MyCustomDsl())
                .and()
                .logout(
                        logout -> logout
                        .logoutUrl("/api/user/logout")
                        .logoutSuccessHandler(((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }))
                        .invalidateHttpSession(true)
                        .addLogoutHandler(((request, response, authentication) -> {
                            Long userId = Long.getLong(request.getParameter("userId"));
                            log.info("userId = {}", userId);
                            User user = userRepository.findById(userId).get();
                            user.setRefreshToken("");

                            userRepository.save(user);
                            log.info("Logout Success");
                        }))
                )
                .build();
    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, userRepository, om);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/user/login");
            http
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterBefore(new JwtAuthorizationFilter(userRepository), UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(new ExceptionHandlerFilter(om), JwtAuthorizationFilter.class);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("https://localhost:3000", "https://i8b208.p.ssafy.io"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("access-token");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
