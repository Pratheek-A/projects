package com.wipro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wipro.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    
	@Query("from Cart where userId=:userId")
	List<Cart> getCartDetailsByUserId(int userId);
}
