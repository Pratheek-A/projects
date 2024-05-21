package com.pocproject.FlightBookingSystem.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.model.CabinClass;
import com.pocproject.FlightBookingSystem.model.Flight;
import com.pocproject.FlightBookingSystem.repository.FlightRepository;

@Service
public class FlightService {
	
	@Autowired
	private FlightRepository flightRepository;
	
	@Autowired
	private ClassService classService;
	
	
	public Flight getFlightById(Long id) {
		return flightRepository.findById(id).get();
	}

	
	public List<Flight> getAllFlights(){
		return flightRepository.findAll();
	}
	
	public Flight addFlightDetails(Flight flight) {
		flightRepository.save(flight);
		classService.addCabinClasses(flight.getCabins(), flight);
		return flight;
		
	}
	
	public List<Flight> searchFlights(String source, String destination, String date) {
		return flightRepository.getFlights(source, destination, date);
	}
	
	public List<CabinClass> getCabinsById(Long flightId){
		Flight flight =  flightRepository.findById(flightId).get();
		return flight.getCabins();
	}
	
	public String convertDate(String originalDateString) throws ParseException {
		SimpleDateFormat originalDateFormat = new SimpleDateFormat("EEE MMM dd yyyy");
		Date originalDate = originalDateFormat.parse(originalDateString);
		
		SimpleDateFormat newDateFormat = new SimpleDateFormat("yyyy/MM/dd");
		String newDate = newDateFormat.format(originalDate);
		
		return newDate;
	}
	
	public int getCabinTicketPrice(Flight flight, String cabinType) {
		for(CabinClass cabin: flight.getCabins()) {
			if(cabin.getClassType().equals(cabinType)) {
				return cabin.getTicketPrice();
			}
		}
		return Integer.MAX_VALUE;
	}
}
