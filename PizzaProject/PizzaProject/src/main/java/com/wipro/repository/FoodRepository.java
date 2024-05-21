package com.wipro.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wipro.model.Food;
import com.wipro.model.Store;

public interface FoodRepository extends JpaRepository<Food, Integer>{
   
	@Query("from Food where store.storeId=:storeId")
	List<Food> getAllFoodsByStoreId(int storeId);
}
