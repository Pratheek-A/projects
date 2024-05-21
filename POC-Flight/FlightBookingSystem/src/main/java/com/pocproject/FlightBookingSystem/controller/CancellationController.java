package com.pocproject.FlightBookingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pocproject.FlightBookingSystem.model.Booking;
import com.pocproject.FlightBookingSystem.model.Cancellation;
import com.pocproject.FlightBookingSystem.service.BookingService;
import com.pocproject.FlightBookingSystem.service.CancellationService;


@RestController
@CrossOrigin("*")
public class CancellationController {
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private CancellationService cancellationService;

	@GetMapping("/cancel-booking/{userId}/{bookingId}")
	public ResponseEntity<String> cancelBooking(@PathVariable Long userId, @PathVariable Long bookingId){
		Booking booking = bookingService.getBookingById(bookingId);
		cancellationService.addCancellation(booking, true);
		return ResponseEntity.ok("Initiated cancellation process. You will receive a mail shortly!");
		
	}
	
	@GetMapping("/flights/booking/cancellations/{userId}")
	public List<Cancellation> getCancellationsByUserId(@PathVariable Long userId){
		return cancellationService.getCancellationsById(userId);
	}
}
