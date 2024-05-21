package com.pocproject.FlightBookingSystem.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;


import com.lowagie.text.DocumentException;
import com.pocproject.FlightBookingSystem.dto.BookingDto;
import com.pocproject.FlightBookingSystem.model.Booking;

import com.pocproject.FlightBookingSystem.service.BookingService;


import jakarta.mail.MessagingException;


@RestController
@CrossOrigin("*")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/flights/bookings/all")
	public List<Booking> allBookings() {
		return bookingService.getAllBookings();
	}

	
	@PostMapping("/flights/book-flight")
	public String addNewBooking(@RequestBody List<BookingDto> bookings) throws IOException, DocumentException, MessagingException {
		
		for(BookingDto booking : bookings) {
			bookingService.book(booking);
		}
		
		return "Success";
		
	}
	
	@GetMapping("/flights/bookings/{userId}")
	public List<Booking> getAllBookingsByUserId(@PathVariable Long userId){
		List<Booking> bookingsList = bookingService.getAllBookingsByUserId(userId);
		return bookingsList;
	}

	@GetMapping("/flights/bookings/booking/{bookingId}")
	public Booking getByBookingById(@PathVariable Long bookingId) {
		return bookingService.getBookingById(bookingId);
	}
	
}
