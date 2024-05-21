package com.wipro.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.model.Food;
import com.wipro.model.Store;
import com.wipro.repository.StoreRepository;

@Service
public class StoreService {
	
	@Autowired
	StoreRepository sr;

	public Store addingStoreDetails(Store s) {
		return sr.save(s);	
	}

	public List<Store> getAllStores() {	
		return sr.findAll();
	}

	public List<Store> getStores(String storePlace, String storeState) {	
		return sr.getStoreByPS(storePlace,storeState);
	}

	public Store getStore(int storeId) {	
		return sr.findById(storeId).orElse(null);
	}

	

	
}
