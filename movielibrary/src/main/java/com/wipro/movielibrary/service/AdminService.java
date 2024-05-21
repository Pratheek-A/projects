package com.wipro.movielibrary.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.movielibrary.entity.Admin;
import com.wipro.movielibrary.entity.Movie;
import com.wipro.movielibrary.repo.AdminRepository;
import com.wipro.movielibrary.repo.MovieRepository;

@Service
public class AdminService {

	@Autowired
	private MovieRepository movieRepository;

    @Autowired
    private AdminRepository adminRepository;

    public boolean validateAdminCredentials(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public Movie addMovie(Long id, String name, double collection) {
        Optional<Movie> existingMovie = movieRepository.findById(id);

        if (existingMovie.isEmpty()) {
            Movie newMovie = new Movie(id, name, collection);
            return movieRepository.save(newMovie);
        } else {
            return null;
        }
    }
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

}

