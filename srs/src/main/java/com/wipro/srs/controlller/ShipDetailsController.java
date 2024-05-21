package com.wipro.srs.controlller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.wipro.srs.entity.BookingDetails;
import com.wipro.srs.entity.ShipDetails;
import com.wipro.srs.service.BookingDetailsServiceImp;
import com.wipro.srs.service.ShipDetailsServiceImp;
import com.wipro.srs.service.UserCredentialServiceImp;

import jakarta.servlet.http.HttpSession;

@Controller
public class ShipDetailsController {
	@Autowired
	ShipDetailsServiceImp detailsServiceImp;
	@Autowired
	HttpSession httpSession;
	@Autowired
	UserCredentialServiceImp credentialServiceImp;
	@Autowired
	BookingDetailsServiceImp bookingServiceImp;

	@GetMapping("/login/addShip")
	public ModelAndView addShipPage() {
		if (httpSession.getAttribute("user") != null) {
			ModelAndView mv = new ModelAndView();
			mv.setViewName("addShip");
			return mv;
		} else {
			ModelAndView mv = new ModelAndView().addObject("msg", "please login");
			mv.setViewName("home");
			return mv;
		}
	}

	@PostMapping("/addShip/add")
	public ModelAndView addShip(ShipDetails details) {
		ModelAndView mv = new ModelAndView();
		System.out.println(details.getShipName());
		mv = detailsServiceImp.addShipCheck(details);
		return mv;
	}

	@GetMapping("/login/viewBookingPage")
	public ModelAndView viewBookingPage() {
		ModelAndView mv = new ModelAndView();
		List<BookingDetails> l = bookingServiceImp.findAll();
		mv.addObject("list", l);
		mv.setViewName("viewBookingDetails");
		return mv;
	}

	@GetMapping("/login/viewShip")
	public ModelAndView viewShip(String id) {
		ModelAndView mv = new ModelAndView();
		ShipDetails sd = detailsServiceImp.getById(id);
		List<ShipDetails> shipList = Arrays.asList(sd);
		mv.addObject("detail", shipList);
		mv.setViewName("viewShip");
		return mv;
	}

	@GetMapping("/delete")
	public ModelAndView deleteShip(String id) {
		ModelAndView mv = new ModelAndView();
		detailsServiceImp.deleteById(id);
		mv = credentialServiceImp.loadList();
		mv.addObject("msg", id + " ship deleted");
		mv.setViewName("menu");
		return mv;
	}

	@RequestMapping("/login/updatePage")
	public ModelAndView updateShipPage(@RequestParam("id") String id, @RequestParam("name") String shipName,
			@RequestParam("model") String shipModel, @RequestParam("capacity") long shipCapacity,
			@RequestParam("reserve") long shipReservation, @RequestParam("km") int perKM) {
		ModelAndView mv = new ModelAndView();
		ShipDetails details = new ShipDetails(id, shipName, shipModel, shipCapacity, shipReservation, perKM);
		mv.addObject("d", details);
		mv.setViewName("updateShip");
		return mv;
	}

	@PostMapping("/login/updateShip")
	public ModelAndView updateShip(ShipDetails details) {
		ModelAndView mv = new ModelAndView();
		detailsServiceImp.update(details);
		mv.addObject("msg", details.getShipId() + " Updated Successfully");
		mv.setViewName("updateShip");
		return mv;
	}

	@RequestMapping("/backMenu")
	public ModelAndView menuPage() {
		ModelAndView mv = new ModelAndView();
		mv = detailsServiceImp.backMenu();
		return mv;
	}
}
