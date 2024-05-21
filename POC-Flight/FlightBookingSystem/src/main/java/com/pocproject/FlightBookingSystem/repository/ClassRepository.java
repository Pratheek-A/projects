package com.pocproject.FlightBookingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pocproject.FlightBookingSystem.model.CabinClass;

@Repository
public interface ClassRepository extends JpaRepository<CabinClass, Long>{

	
}
