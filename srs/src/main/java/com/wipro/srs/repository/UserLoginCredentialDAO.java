package com.wipro.srs.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.wipro.srs.entity.UserLoginCredential;

public interface UserLoginCredentialDAO extends CrudRepository<UserLoginCredential, Integer> {

	Optional<UserLoginCredential> findByUserName(String userName);
}
