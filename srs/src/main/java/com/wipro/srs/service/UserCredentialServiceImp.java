package com.wipro.srs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;


import com.wipro.srs.entity.ShipDetails;
import com.wipro.srs.entity.UserLoginCredential;
import com.wipro.srs.entity.UserPasswordChange;
import com.wipro.srs.repository.ShipDetailsDAO;
import com.wipro.srs.repository.UserLoginCredentialDAO;

import jakarta.servlet.http.HttpSession;

@Service
public class UserCredentialServiceImp implements UserCredentialService {
	@Autowired
	UserLoginCredentialDAO repo;
	@Autowired
	ShipDetailsDAO dao;
	@Autowired
	HttpSession httpSession;

	UserLoginCredential credential;

	@Override
	public UserLoginCredential save(UserLoginCredential userLoginCredential) {
		return repo.save(userLoginCredential);
	}

	@Override
	public Optional<UserLoginCredential> findByUserName(String userName) {
		Optional<UserLoginCredential> user = repo.findByUserName(userName);
		return user;
	}

	public ModelAndView loginCheck(Optional<UserLoginCredential> user, UserLoginCredential c) {
		ModelAndView mv = new ModelAndView();
		if (user.isPresent()) {
			credential = user.get();
			if (credential.getUserPassword().equals(c.getUserPassword())) {
				httpSession.setAttribute("user", c);
				mv=loadList();
				mv.addObject("msg", "Login successful");
				mv.setViewName("menu");
				return mv;
			} else {
				mv.addObject("msg", "Password wrong");
				mv.setViewName("home");
				return mv;
			}
		} else {
			mv.addObject("msg", "User not found");
			mv.setViewName("home");
			return mv;
		}
	}

	public ModelAndView registerCheck(Optional<UserLoginCredential> user, UserLoginCredential c) {
		ModelAndView mv = new ModelAndView();
		if (!user.isPresent()) {
			repo.save(c);
			mv.addObject("msg", "User successfully registered");
			mv.setViewName("home");
			return mv;
		} else {			
			mv.addObject("msg", "User is present");
			mv.setViewName("register");
			return mv;
		}
	}
	
	public ModelAndView passwordChangeCheck(Optional<UserLoginCredential> user, UserPasswordChange c) {
		 ModelAndView mv = new ModelAndView();
	    if (user.isPresent()) {
	        if (c.getOldPassword().equals(user.get().getUserPassword())) {
	            if (!c.getOldPassword().equals(c.getNewPassword())) { 
	                UserLoginCredential uc = new UserLoginCredential(user.get().getUserId(), user.get().getUserName(), c.getNewPassword());
	                repo.save(uc);
	                mv.addObject("msg", "User changed password successfully");
	                mv.setViewName("home");
	                return mv;
	            } else {
	                mv.addObject("msg", "Old and new passwords cannot be the same");
	                mv.setViewName("changePassword");
	                return mv;
	            }
	        } else {
	            mv.addObject("msg", "User old password is wrong");
	            mv.setViewName("changePassword");
	            return mv;
	        }
	    } else {
	        mv.addObject("msg", "User not found");
	        mv.setViewName("changePassword");
	        return mv;
	    }
	}

	
	public ModelAndView loadList() {
		List<ShipDetails> l=(List<ShipDetails>)dao.findAll();
		ModelAndView mv=new ModelAndView();
		mv.addObject("list", l);
		return mv;
	}
}
