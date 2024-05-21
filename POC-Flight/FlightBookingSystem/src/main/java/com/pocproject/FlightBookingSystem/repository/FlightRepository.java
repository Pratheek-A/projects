package com.pocproject.FlightBookingSystem.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.pocproject.FlightBookingSystem.model.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long>{

	@Query(value = "SELECT * FROM flights WHERE source=?1 and destination=?2 AND STR_TO_DATE(departure_date_time, '%Y-%m-%d')=?3", nativeQuery = true)
	public List<Flight> getFlights(@Param("source") String source, @Param("destination") String destination,
						@Param("date") String date);

}
