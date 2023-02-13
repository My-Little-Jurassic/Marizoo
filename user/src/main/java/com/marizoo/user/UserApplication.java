package com.marizoo.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@EnableJpaAuditing
@SpringBootApplication
public class UserApplication {

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuditorAware<String> auditorProvider() {
		return () -> Optional.ofNullable(SecurityContextHolder.getContext())
				.map(SecurityContext::getAuthentication)
				.map(authentication -> {
					Collection<? extends GrantedAuthority> auth = authentication.getAuthorities();
					boolean isUser = auth.contains(new SimpleGrantedAuthority("ROLE_USER"));
					if (isUser) return authentication.getName();
					return null;
				});
	}

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
}
