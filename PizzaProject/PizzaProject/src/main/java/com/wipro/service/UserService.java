package com.wipro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.wipro.model.User;
import com.wipro.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository ur;

	public User addingUser(User u) {
		return ur.save(u);
	}

	public String validateLogin(Integer userId, String password) {    
		User user=ur.findById(userId).orElse(null);		
		if(user==null) {		
			return "Invalid";
		}else if(user.getPassword().equals(password)) {
			return "success";
		}			
		return "Invalid";				
	}

	public User findByEmail(String emailId) {	
		return ur.getByEmailId(emailId);
	}

	public void getRegister(User u) {
		ur.save(u);
		
	}	
}
