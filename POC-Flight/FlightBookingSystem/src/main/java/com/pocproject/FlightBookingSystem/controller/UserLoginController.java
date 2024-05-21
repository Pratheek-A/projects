package com.pocproject.FlightBookingSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;


import com.pocproject.FlightBookingSystem.model.User;
import com.pocproject.FlightBookingSystem.service.UserService;


import jakarta.mail.MessagingException;


@RestController
@CrossOrigin("*")
public class UserLoginController {
		
		@Autowired
		UserService userService;
		
		
		@PostMapping("/userLogin")
		public ResponseEntity<?> login(@RequestBody User user){
			return userService.loginCheck(user);
		}

		@PostMapping("/userRegister/{otp}")
		public String register(@PathVariable String otp, @RequestBody User user){
			System.out.println(user);
			String response = userService.registerUser(user, otp);
			return response;
		}
		
		@PostMapping("/sendOtp/{userEmail}")
		public void emailVerification(@PathVariable String userEmail){
			System.out.println(userEmail);
			try {
				userService.sendVerificationEmail(userEmail);
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		}
		
		@GetMapping("/userLogout")
		public ResponseEntity<String> logout(){
			return userService.logout();
		}
	
}