package com.wipro.movielibrary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.wipro.movielibrary.entity.Movie;
import com.wipro.movielibrary.service.AdminService;

@Controller
public class AdminController {

	@Autowired
	private AdminService adminService;

	@GetMapping("/adminLogin")
	public String showAdminLoginPage() {
		return "adminLogin";
	}

	@PostMapping("/adminLoginSubmit")
	public String adminLoginSubmit(@RequestParam("username") String username, @RequestParam("password") String password,
			Model model) {
		if (adminService.validateAdminCredentials(username, password)) {
			return "adminDashboard";
		} else {
			model.addAttribute("errorMsg", "Invalid credentials. Please check your username and password.");
			return "adminLoginError";
		}
	}


	@GetMapping("/adminDashboard")
	public String showAdminDashboard() {
		return "adminDashboard";
	}

	@GetMapping("/addMovie")
	public String showAddMoviePage() {
		return "addMovie";
	}

	@PostMapping("/addMovie")
	public String addMovie(@RequestParam("id") Long id, @RequestParam("name") String name,
			@RequestParam("collection") double collection, Model model) {
		Movie movie = adminService.addMovie(id, name, collection);
		System.out.println(movie);
		if (movie != null) {
			model.addAttribute("successMsg", "Movie added successfully!");
			return "addMovieSuccess";
		} else {
			model.addAttribute("errorMsg", "Movie with the given ID already exists.");
			return "errorPage";
		}
	}

	@GetMapping("/viewAllMovies")
	public String viewAllMovies(Model model) {
		List<Movie> allMovies = adminService.getAllMovies();
		model.addAttribute("movies", allMovies);
		return "viewAllMovies";
	}

	@GetMapping("/modifyMovie")
	public String showModifyMoviePage() {
		return "modifyMovie";
	}

}
