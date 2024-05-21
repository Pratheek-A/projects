package com.pocproject.FlightBookingSystem.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.model.User;
import com.pocproject.FlightBookingSystem.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private HttpSession httpSession;
	
	@Autowired
	private EmailService emailService;
	
	private static String otp;
	
	
	public User getUserById(Long id) {
		return userRepository.findById(id).get();
	}
	
	
	public User getByEmail(String email) {
		return userRepository.findByUserEmail(email);
	}

	
	public ResponseEntity<?> loginCheck(User user){
		if(getByEmail(user.getUserEmail())!=null) {
			User user1=getByEmail(user.getUserEmail());
			if(user1.getPassword().equals(user.getPassword())) {
				httpSession.setAttribute("user", user1);
				return ResponseEntity.ok(user1);
			}
			else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials! Please enter valid credentials");
			}
			
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	}
	
	
	public String registerUser(User user, String inputOtp){
		if(inputOtp.equals(otp)) {
			userRepository.save(user);
			return "registration successful";
		}else {
			throw new RuntimeException("User already exists");
		}
	}
	
	public ResponseEntity<String> logout(){
		httpSession.removeAttribute("user");
		return new ResponseEntity<>("logout successfully", HttpStatus.OK);
	}
	
	
	public void sendVerificationEmail(String email) throws MessagingException {
		
		if(getByEmail(email)==null) {
			otp = generateOTP();
			System.out.println(otp);
			String subject = "Email Verification";
			String body = "Your OTP for registering the Flight Booking System " + otp;
			
			emailService.sendEmail(email, subject, body);
			
		}else {
			throw new RuntimeException("User already exists");
		}
		
	}
	
	public String generateOTP() {
		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		return String.valueOf(otp);
	}

}
