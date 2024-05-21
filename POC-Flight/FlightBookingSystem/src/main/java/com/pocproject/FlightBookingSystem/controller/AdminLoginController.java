package com.pocproject.FlightBookingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pocproject.FlightBookingSystem.dto.DelayRequest;

import com.pocproject.FlightBookingSystem.model.Cancellation;
import com.pocproject.FlightBookingSystem.model.Flight;
import com.pocproject.FlightBookingSystem.service.AdminService;

import com.pocproject.FlightBookingSystem.service.CancellationService;


import jakarta.mail.MessagingException;

@RestController
@CrossOrigin("*")
public class AdminLoginController {

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private CancellationService cancellationService;
	
//	@Autowired
//	private BookingService bookingService;
	
	@GetMapping("/admin/home")
	public ResponseEntity<String> adminLogin() {
		System.out.println("Admin Logged in!");
		return ResponseEntity.ok("Admin logged in!");
	}
	
	@GetMapping("/admin/cancellations")
	public List<Cancellation> getCancellations(){
		return cancellationService.getAllCancellations();
	}
	
	@GetMapping("/admin/cancelTicket/{cancellationId}/{bookingId}")
	public ResponseEntity<String> cancelTicket(@PathVariable Long cancellationId, @PathVariable Long bookingId) throws MessagingException{
		adminService.sendCancellationEmail(bookingId);
		adminService.deleteCancellation(cancellationId);
		adminService.deleteBooking(bookingId);
		return ResponseEntity.ok("Ticket cancelled");
	}
	
	@PutMapping("/flights/delay/{flightId}")
	public ResponseEntity<String> flightDelay(@PathVariable Long flightId, @RequestBody DelayRequest delayRequest) throws MessagingException{
		Flight flight = adminService.updateFlightDelay(flightId, delayRequest);
		
		if(flight!=null) {
			return ResponseEntity.ok("Flight delay updated successfully");
		}else {
			throw new RuntimeException();
		}
		
	}
}
