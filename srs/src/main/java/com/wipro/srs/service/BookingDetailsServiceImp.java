package com.wipro.srs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.srs.entity.BookingDetails;
import com.wipro.srs.repository.BookingDetailsDAO;

@Service
public class BookingDetailsServiceImp implements BookingDetailsService {

	@Autowired
	BookingDetailsDAO bookingDetailsDAO;

	@Override
	public List<BookingDetails> findAll() {

		return (List<BookingDetails>) bookingDetailsDAO.findAll();
	}

}
