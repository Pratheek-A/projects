//package com.pocproject.FlightBookingSystem.jwt;
//
//import java.util.Collection;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.server.resource.authentication.DelegatingJwtGrantedAuthoritiesConverter;
//
//public class CustomJwtGrantedAuthoritiesConverter extends DelegatingJwtGrantedAuthoritiesConverter{
//
//	@Override
//	public Collection<GrantedAuthority> convert(Jwt jwt) {
//		Collection<GrantedAuthority> authorities = super.convert(jwt);
//		return mapAuthorities(authorities);
//	}
//
//	private Collection<GrantedAuthority> mapAuthorities(Collection<GrantedAuthority> authorities) {
//		
//		if (authorities.stream().anyMatch(authority -> authority.getAuthority().equals("SCOPE_ROLE_ADMIN"))) {
//            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
//        }
//        return authorities;
//	}
//}
