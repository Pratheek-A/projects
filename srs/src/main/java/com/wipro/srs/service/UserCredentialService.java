package com.wipro.srs.service;

import java.util.Optional;

import com.wipro.srs.entity.UserLoginCredential;

public interface UserCredentialService {
	public UserLoginCredential save(UserLoginCredential userLoginCredential);
	public Optional<UserLoginCredential> findByUserName(String userName);
}
