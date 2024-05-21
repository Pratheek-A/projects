package com.wipro.movielibrary.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.movielibrary.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Override
	Optional<Movie> findById(Long id);


    List<Movie> findByNameContainingIgnoreCase(String name);


    List<Movie> findByCollectionBetween(double minCollection, double maxCollection);
}

