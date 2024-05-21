package com.pocproject.FlightBookingSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pocproject.FlightBookingSystem.model.Booking;

@Repository
public interface BookingRepository  extends JpaRepository<Booking, Long>{

	@Query(value="SELECT * FROM bookings WHERE user_id=?1", nativeQuery = true)
	List<Booking> getAllBookingsByUserId(@Param ("userId") Long userId);

	@Modifying
	@Query(value="DELETE from bookings where booking_id=?1", nativeQuery = true)
	void deleteBooking(@Param ("bookingId") Long bookingId);

	@Query(value="SELECT * FROM bookings WHERE flight_id=?1", nativeQuery=true)
	List<Booking> findByFlightId(@Param("flightId") Long flightId);
	
}
