package com.wipro.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.model.Cart;
import com.wipro.repository.CartRepository;

@Service
public class CartService {
	
	@Autowired
	CartRepository cr;

	public void addingToCart(Cart c) {
		cr.save(c);	
	}

	public List<Cart> getYourFoods(int userId) {	
		return cr.getCartDetailsByUserId(userId);
	}

	public Cart getQuan(int cartId) {	
		return cr.findById(cartId).orElse(null);
	}
	
	

}
