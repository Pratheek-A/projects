package com.pocproject.FlightBookingSystem.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.dto.DelayRequest;
import com.pocproject.FlightBookingSystem.model.Booking;

import com.pocproject.FlightBookingSystem.model.Flight;


import jakarta.mail.MessagingException;

@Service
public class AdminService {

//	@Autowired
//	private AdminRepository adminRepository;
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private FlightService flightService;
	
	@Autowired
	private CancellationService cancellationService;
	
	@Autowired
	private EmailService emailService;
	
	@Async
	public void sendCancellationEmail(Long bookingId) throws MessagingException {
		//Cancellation cancellation = cancellationService.getCancellationById(cancellationId);
		Booking booking = bookingService.getBookingById(bookingId);
		String subject = "Ticket cancellation successful";
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("Your ticket with number ");
		stringBuilder.append(booking.getTicket());
		stringBuilder.append(" for the flight ");
		stringBuilder.append(booking.getFlight().getAirLines());
		stringBuilder.append(" (");
		stringBuilder.append(booking.getFlight().getFlightNumber());
		stringBuilder.append(") from ");
		stringBuilder.append(booking.getFlight().getSource());
		stringBuilder.append(" to ");
		stringBuilder.append(booking.getTotalPrice());
		stringBuilder.append(" will be refunded to your bank account within 24 hours.");
		
		String body = stringBuilder.toString();
		emailService.sendEmail(booking.getUser().getUserEmail(), subject, body);
	}

	public void deleteCancellation(Long cancellationId) {
		cancellationService.deleteCancellation(cancellationId);
		
	}

	public void deleteBooking(Long bookingId) {
		bookingService.deleteBooking(bookingId);
		
	}

	public Flight updateFlightDelay(Long flightId, DelayRequest delayRequest) throws MessagingException {
		Flight updatedFlight = flightService.getFlightById(flightId);
		
		LocalDateTime dateTime = LocalDateTime.parse(updatedFlight.getDepartureDate().toString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
		LocalDateTime updatedDateTime = dateTime.plusHours(delayRequest.getDelayHours());
		
		updatedFlight.setDepartureDate(updatedDateTime);
		
		sendDelayMails(flightId, delayRequest);
		return flightService.addFlightDetails(updatedFlight);
//		System.out.println(updatedFlight.getDepartureDate());
//		System.out.println(delayRequest.getDelayHours());
	}
	
	@Async
	public void sendDelayMails(Long flightId, DelayRequest delayRequest) throws MessagingException {
		List<Booking> bookings = bookingService.getBookingsByFlightId(flightId);
		for(Booking booking : bookings) {
			String maitlTo = booking.getUser().getUserEmail();
			String subject = "Scheduled Flight Delay!";
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append("Dear passenger, we regret to inform you that your scheduled flight is running late by ");
			stringBuilder.append(delayRequest.getDelayHours());
			stringBuilder.append((" due to "));
			stringBuilder.append(delayRequest.getReason());
			stringBuilder.append(". Apologies for the inconvenience caused. Thank you for your patience and understanding.");
			
			String body = stringBuilder.toString();
			
			emailService.sendEmail(maitlTo, subject, body);
		}
	}
}
