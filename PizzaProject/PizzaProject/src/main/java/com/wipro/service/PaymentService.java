package com.wipro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.model.Payment;
import com.wipro.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired 
	PaymentRepository pr;

	public void savingPaymentDetails(Payment p) {
		pr.save(p);	
	}
}
