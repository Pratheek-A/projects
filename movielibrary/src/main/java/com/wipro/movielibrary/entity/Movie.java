package com.wipro.movielibrary.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Movie {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double collection;

    public Movie() {
    }

    public Movie(String name, double collection) {
        this.name = name;
        this.collection = collection;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCollection() {
        return collection;
    }

    public void setCollection(double collection) {
        this.collection = collection;
    }

	public Movie(Long id, String name, double collection) {
		super();
		this.id = id;
		this.name = name;
		this.collection = collection;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", name=" + name + ", collection=" + collection + "]";
	}

}

