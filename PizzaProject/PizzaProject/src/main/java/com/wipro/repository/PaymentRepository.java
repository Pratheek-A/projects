package com.wipro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

}
