package com.wipro.srs.repository;

import org.springframework.data.repository.CrudRepository;

import com.wipro.srs.entity.BookingDetails;

public interface BookingDetailsDAO extends CrudRepository<BookingDetails,Long> {
	
}
