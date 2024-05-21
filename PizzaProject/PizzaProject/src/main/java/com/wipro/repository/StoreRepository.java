package com.wipro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wipro.model.Store;

public interface StoreRepository extends JpaRepository<Store,Integer> {
    
	@Query("from com.wipro.model.Store where storePlace=:storePlace and storeState=:storeState")
	List<Store> getStoreByPS(String storePlace, String storeState);		
}
