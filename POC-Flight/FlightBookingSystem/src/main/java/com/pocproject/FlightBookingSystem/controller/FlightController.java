package com.pocproject.FlightBookingSystem.controller;

import java.text.ParseException;

import java.util.Collections;
import java.util.Comparator;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pocproject.FlightBookingSystem.model.CabinClass;
import com.pocproject.FlightBookingSystem.model.Flight;
import com.pocproject.FlightBookingSystem.service.FlightService;

@RestController
@CrossOrigin("*")
public class FlightController {

	@Autowired
	private FlightService flightService;
	
	@PostMapping("/flights/add")
	public String addFlight(@RequestBody Flight flight) {
		System.out.println(flight);
		 flightService.addFlightDetails(flight);
		 return "Success";
	}
	
	@GetMapping("/flights/all")
	public List<Flight> allFlights(){
		return flightService.getAllFlights();
	}
	
	@GetMapping("/flights/search")
	public List<Flight> searchFlights(@RequestParam String source, 
									@RequestParam  String destination, 
									@RequestParam  String departureDate) {
		System.out.println(source +","+destination+","+departureDate);
		List<Flight> flights = flightService.searchFlights(source, destination, departureDate);
		return flights;
	}
	

	@PostMapping("/getCabins/{id}")
	public String getCabins(@PathVariable Long id, @RequestParam String cabinType, Model model) {
		List<CabinClass> cabins = flightService.getCabinsById(id);
		CabinClass reqCabin =cabins.stream()
								.filter(cabin -> cabin.getClassType().equalsIgnoreCase(cabinType))
								.findFirst()
								.get();
		model.addAttribute("cabin", reqCabin);
		return "search-flight";
	}
	
	@GetMapping("/flights/sort/cost")
	public List<Flight> sortFlightsByCost(@RequestParam String sortOrder,
										@RequestParam String cabinType, 
										@RequestParam String source,
										@RequestParam String destination, 
										@RequestParam String departureDate) throws ParseException{
		
		String newDate = flightService.convertDate(departureDate);
		
		List<Flight> flights = searchFlights(source, destination, newDate);
		
		Collections.sort(flights, new Comparator<Flight>() {
							@Override
							public int compare(Flight f1, Flight f2) {
								int price1 = flightService.getCabinTicketPrice(f1, cabinType);
								int price2 = flightService.getCabinTicketPrice(f2, cabinType);
								return  Integer.compare(price1, price2);
							}
						});
		
		System.out.println(sortOrder);
		if(sortOrder.equalsIgnoreCase("cabinSort")) {
			return flights;
		}
		
		Collections.reverse(flights);
		return flights;
		
	}
	
	
	@GetMapping("/flights/sort/duration")
	public List<Flight> sortFlightsByDuration(@RequestParam String source, 
											@RequestParam  String destination, 
											@RequestParam  String departureDate) throws ParseException{
		
		String newDate = flightService.convertDate(departureDate);
		
		List<Flight> flights = searchFlights(source, destination, newDate);
		
		Collections.sort(flights, Comparator.comparingInt(Flight :: getDuration));
		
		return flights;
	}
}


