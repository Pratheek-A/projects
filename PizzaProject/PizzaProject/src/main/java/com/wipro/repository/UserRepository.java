package com.wipro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.model.User;

public interface UserRepository extends JpaRepository<User,Integer>{

	Optional<User> findByEmailId(String userId);
	User getByEmailId(String emailId);
}
