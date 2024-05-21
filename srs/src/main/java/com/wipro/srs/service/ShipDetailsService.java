package com.wipro.srs.service;

import java.util.List;


import com.wipro.srs.entity.ShipDetails;

public interface ShipDetailsService {
	public ShipDetails save(ShipDetails details);
	public List<ShipDetails> findAll();
	public void deleteById(String id);
	public ShipDetails update(ShipDetails details);
	public boolean findById(ShipDetails details);
	
	public ShipDetails getById(String id);
}
