package com.pocproject.FlightBookingSystem.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.model.Booking;
import com.pocproject.FlightBookingSystem.model.Cancellation;
import com.pocproject.FlightBookingSystem.repository.CancellationRepository;

import jakarta.transaction.Transactional;

@Service
public class CancellationService {

	@Autowired
	private CancellationRepository cancellationRepository;
	
	
	public void addCancellation(Booking booking, boolean isCancellationRequested) {
		Cancellation cancellation = new Cancellation(booking, isCancellationRequested);
		cancellationRepository.save(cancellation);
	}
	
	public List<Cancellation> getAllCancellations(){
		return cancellationRepository.findAll();
	}
	
	public Cancellation getCancellationById(Long cancellationId) {
		return cancellationRepository.findById(cancellationId).get();
	}
	
	@Transactional
	public void deleteCancellation(Long cancellationId) {
		cancellationRepository.deleteCancellation(cancellationId);
	}

	public List<Cancellation> getCancellationsById(Long userId) {
		List<Cancellation> cancellations = getAllCancellations();
		List<Cancellation> result = new ArrayList<>();
		for(Cancellation cancellation : cancellations) {
			if(cancellation.getBooking().getUser().getUserId()==userId) {
				result.add(cancellation);
			}
		}
		return result;
	}
}
