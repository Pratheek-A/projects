package com.wipro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.model.Cart;
import com.wipro.model.Food;
import com.wipro.model.Store;
import com.wipro.repository.FoodRepository;

@Service
public class FoodService {
	
	@Autowired
	FoodRepository fr;

	public void addingFoodDetails(Food f) {
		fr.save(f);	
	}

	public List<Food> getAllFoods() {	
		return fr.findAll();
	}

	public List<Food> getAvailableFoods(int storeId) {	
		return fr.getAllFoodsByStoreId(storeId);
	}

	public Food getFood(int foodId) {	
		return fr.findById(foodId).orElse(null);
	}

	

	

}
