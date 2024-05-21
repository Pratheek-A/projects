package com.wipro.srs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.wipro.srs.entity.ShipDetails;
import com.wipro.srs.repository.ShipDetailsDAO;
import jakarta.servlet.http.HttpSession;

@Service
public class ShipDetailsServiceImp implements ShipDetailsService {
	@Autowired
	UserCredentialServiceImp credentialServiceImp;
	@Autowired
	ShipDetailsDAO dao;
	@Autowired
	HttpSession httpSession;
	
	@Override
	public ShipDetails save(ShipDetails details) {
		return dao.save(details);
	}

	@Override
	public List<ShipDetails> findAll() {
		List<ShipDetails> l=(List<ShipDetails>) dao.findAll();
		return l;
	}

	@Override
	public void deleteById(String id) {
		dao.deleteById(id);
		
	}

	@Override
	public ShipDetails update(ShipDetails details) {
		return dao.save(details);
	}

	@Override
	public boolean findById(ShipDetails details) {
		Optional<ShipDetails> l=dao.findById(details.getShipId());
		if(l.isPresent()) {
		return false;
		}
		else {
			return true;
		}
	}
	
	
	public ShipDetails getById(String id) {
		Optional<ShipDetails> Sdetail =  dao.findById(id);
		return Sdetail.get();
		
	}
	
	public ModelAndView addShipCheck(ShipDetails details) {
		ModelAndView mv=new ModelAndView();
		if(findById(details)) {
			if(httpSession.getAttribute("user")!=null) {
				save(details);
				mv.addObject("msg", "Ship details added successfully");
				mv.setViewName("addShip");
				return mv;
			}else {
				mv.addObject("msg","Please login");
				mv.setViewName("home");
				return mv;
			}
		}
		else {
			mv.addObject("msg","Ship id should be diff");
			mv.setViewName("addShip");
			return mv;
		}
	}
	
	public ModelAndView backMenu() {
		if(httpSession.getAttribute("user")!=null) {
			ModelAndView mv=new ModelAndView();
			mv=credentialServiceImp.loadList();
			mv.addObject("msg","");
			mv.setViewName("menu");
			return mv;
		}
		else {
			ModelAndView mv=new ModelAndView().addObject("msg","Please login");
			mv.setViewName("home");
			return mv;
		}
	}

	
}
