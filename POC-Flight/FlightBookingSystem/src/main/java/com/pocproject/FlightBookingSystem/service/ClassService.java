package com.pocproject.FlightBookingSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.model.CabinClass;
import com.pocproject.FlightBookingSystem.model.Flight;
import com.pocproject.FlightBookingSystem.repository.ClassRepository;

@Service
public class ClassService {

	@Autowired
	private ClassRepository classRepository;
	
	
	public CabinClass getCabinById(Long id) {
		return classRepository.findById(id).get();
	}
	
	public void addCabinClasses(List<CabinClass> cabinClasses, Flight flight) {
		for(CabinClass cabinClass : cabinClasses) {
			cabinClass.setFlight(flight);
			classRepository.save(cabinClass);
		}
		
	}

}
