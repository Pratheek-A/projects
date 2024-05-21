package com.wipro.srs.repository;

import org.springframework.data.repository.CrudRepository;

import com.wipro.srs.entity.ShipDetails;

public interface ShipDetailsDAO extends CrudRepository<ShipDetails, String>{
	
}
