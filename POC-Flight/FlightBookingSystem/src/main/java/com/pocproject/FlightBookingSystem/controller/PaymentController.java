package com.pocproject.FlightBookingSystem.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@CrossOrigin("*")
public class PaymentController {

	@Value("${razorpay.api.key}")
	private String razorpayKey;
	
	@Value("${razorpay.api.secret}")
	private String razorpaySecret;
	
	@GetMapping("/razorpay/payment/{amount}")
	public String payment(@PathVariable int amount) throws RazorpayException {
		
		try {
			RazorpayClient razorpayClient = new RazorpayClient(razorpayKey, razorpaySecret);
			
			JSONObject orderRequest = new JSONObject();
			orderRequest.put("amount",amount);
			orderRequest.put("currency","INR");
			orderRequest.put("receipt", "receipt_01");
			
			Order order = razorpayClient.orders.create(orderRequest);
			System.out.println(order.toString()); 
			String orderId = order.get("id");
			return orderId;
			//return orderRequest.toString();
		}catch(RazorpayException e) {
			e.printStackTrace();
			throw e;
		}
		
	}
}

