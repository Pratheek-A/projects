package com.pocproject.FlightBookingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pocproject.FlightBookingSystem.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query("from User u where u.userEmail=:email")
	public User findByUserEmail(@Param("email") String email);
}
