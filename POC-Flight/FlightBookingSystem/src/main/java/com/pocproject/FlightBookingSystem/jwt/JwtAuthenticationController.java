package com.pocproject.FlightBookingSystem.jwt;
			
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;


import com.pocproject.FlightBookingSystem.service.UserService;
			
			
@RestController
@CrossOrigin("*")
public class JwtAuthenticationController {

	@Autowired
   private JwtTokenService tokenService;
	
	@Autowired
   private UserService userService;
  
   
   @PostMapping("/authenticate")
   public ResponseEntity<JwtTokenResponse> generateTokenForUser(@RequestBody JwtTokenRequest jwtTokenRequest) {
	   
	   com.pocproject.FlightBookingSystem.model.User user = userService.getByEmail(jwtTokenRequest.username());
	   
	   var authenticationToken =
               new UsernamePasswordAuthenticationToken(
                       jwtTokenRequest.username(),
                       jwtTokenRequest.password());
	  
	   var authenticationProvider = new DaoAuthenticationProvider();
	   
	   UserDetails regularUser = User.withUsername(user.getUserEmail())
						   			.password("{noop}"+user.getPassword())
						   			.authorities("read")
						   			.roles("USER")
						   			.build();
	   
	   authenticationProvider.setUserDetailsService(
						   new InMemoryUserDetailsManager(regularUser));
	   
	   
	   var authenticationManager = new ProviderManager(authenticationProvider);
       var authentication =
    		   authenticationManager.authenticate(authenticationToken);
       var token = tokenService.generateToken(authentication);
       System.out.println("Authoritites of user "+regularUser.getAuthorities());
       return ResponseEntity.ok(new JwtTokenResponse(token));
       }
   
   
   
   @PostMapping("/authenticateAdmin")
   public ResponseEntity<JwtTokenResponse> generateTokenForAdmin(@RequestBody JwtTokenRequest jwtTokenRequest) {
	   var authenticationToken =
               new UsernamePasswordAuthenticationToken(
                       jwtTokenRequest.username(),
                       jwtTokenRequest.password());
	  
	   var authenticationProvider = new DaoAuthenticationProvider();
	   UserDetails admin = User.withUsername("flightbooking78@gmail.com")
						   			.password("{noop}Wipro@123")
						   			.authorities("read")
						   			.roles("ADMIN")
						   			.build();
	   
	   authenticationProvider.setUserDetailsService(
						   new InMemoryUserDetailsManager(admin));
	   
	   var authenticationManager = new ProviderManager(authenticationProvider);
       var authentication =
    		   authenticationManager.authenticate(authenticationToken);
       var token = tokenService.generateToken(authentication);
       System.out.println("Authoritites of admin "+admin.getAuthorities());
       return ResponseEntity.ok(new JwtTokenResponse(token));
   		}
   }
 
