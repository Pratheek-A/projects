package com.pocproject.FlightBookingSystem.service;



import java.io.IOException;

import java.util.List;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.lowagie.text.DocumentException;

import com.pocproject.FlightBookingSystem.dto.BookingDto;
import com.pocproject.FlightBookingSystem.model.Booking;
import com.pocproject.FlightBookingSystem.model.CabinClass;
import com.pocproject.FlightBookingSystem.model.Flight;
import com.pocproject.FlightBookingSystem.model.User;
import com.pocproject.FlightBookingSystem.repository.BookingRepository;
import com.pocproject.FlightBookingSystem.repository.ClassRepository;
import com.pocproject.FlightBookingSystem.repository.FlightRepository;
import com.pocproject.FlightBookingSystem.repository.UserRepository;

import jakarta.mail.MessagingException;

import jakarta.transaction.Transactional;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private FlightRepository flightRepository;
	
	@Autowired
	private ClassRepository classRepository;
	
	@Autowired
	private EmailService emailService;
	
	private static int downloadCount = 1;
	
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}
	
	
	public Booking book(BookingDto booking) throws IOException, DocumentException, MessagingException {
		
		User user = userRepository.findById(booking.getUserId()).get();
		Flight flight =flightRepository.findById(booking.getFlightId()).get();
		CabinClass cabin = classRepository.findById(booking.getCabinId()).get();
		
		Booking newBooking = new Booking();
		
		
		newBooking.setUser(user);
		newBooking.setFlight(flight);
		newBooking.setCabin(cabin);
		newBooking.setPassengerType(booking.getPassengerType());
		newBooking.setFirstName(booking.getFirstName());
		newBooking.setLastName(booking.getLastName());
		newBooking.setAge(booking.getAge());
		newBooking.setEmail(booking.getEmail());
		newBooking.setMobileNumber(booking.getMobileNumber());
		newBooking.setGender(booking.getGender());
		newBooking.setTotalPrice(booking.getTotalPrice());
		newBooking.setTransactionId(booking.getTransactionId());
		
		String ticket = ticketNunberGenerator(newBooking);
		System.out.println("Ticket Number : "+ticket);
		newBooking.setTicket(ticket);
		
//		String mailTo = newBooking.getUser().getUserEmail();
//		String subject = "Ticket Booking Confirmation";
//		String body = "Your ticket for passenger "+newBooking.getFirstName()+" "+newBooking.getLastName()+" for flight "
//				+newBooking.getFlight().getAirLines()+" ("+newBooking.getFlight().getFlightNumber()
//				+") from "+newBooking.getFlight().getSource()+" to "+newBooking.getFlight().getDestination()+" is confirmed."
//						+ "Sign in to our official website to download the ticket!";
//		
//		emailService.sendEmail(mailTo, subject, body);
		bookingConfirmationMail(newBooking);

		return bookingRepository.save(newBooking);
		
	}
	
	public Booking getBookingById(Long bookingId) {
		return bookingRepository.findById(bookingId).get();
	}
	
	
	private String ticketNunberGenerator(Booking booking) {
		
		Random random = new Random();
		
		int part1 = 100000 + random.nextInt(900000);
		int part2 = 100000 + random.nextInt(900000);
	    
	    String ticket = ""+part1+part2;
	    return ticket;
	}
	

	public List<Booking> getAllBookingsByUserId(Long userId) {
		return bookingRepository.getAllBookingsByUserId(userId);
	}
	
	@Transactional
	public void deleteBooking(Long bookingId) {
		bookingRepository.deleteBooking(bookingId);
	}

	@Async
	public void bookingConfirmationMail(Booking booking) throws MessagingException {
		
		String mailTo = booking.getUser().getUserEmail();
		String subject = "Ticket Booking Confirmation";
		
		StringBuilder bodyBuilder = new StringBuilder();
		
		bodyBuilder.append("Your ticket for passenger ")
					.append(booking.getFirstName())
					.append(" ")
					.append(booking.getLastName())
					.append(" for flight ")
					.append(booking.getFlight().getAirLines())
					.append(" (")
					.append(booking.getFlight().getFlightNumber())
					.append(") from ")
					.append(booking.getFlight().getSource())
					.append(" to ")
					.append(booking.getFlight().getDestination())
					.append(" is confirmed. Sign in to our official website to download the ticket!");
		
		String body = bodyBuilder.toString();
		
//		String body = "Your ticket for passenger "+booking.getFirstName()+" "+booking.getLastName()+" for flight "
//				+booking.getFlight().getAirLines()+" ("+booking.getFlight().getFlightNumber()
//				+") from "+booking.getFlight().getSource()+" to "+booking.getFlight().getDestination()+" is confirmed."
//						+ "Sign in to our official website to download the ticket!";
		
		emailService.sendEmail(mailTo, subject, body);
	}


	public List<Booking> getBookingsByFlightId(Long flightId) {
		List<Booking> bookings = bookingRepository.findByFlightId(flightId);
		return bookings;
	}


}
