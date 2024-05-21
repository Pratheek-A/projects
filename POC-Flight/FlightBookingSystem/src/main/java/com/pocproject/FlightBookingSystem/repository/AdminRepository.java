package com.pocproject.FlightBookingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pocproject.FlightBookingSystem.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

}
