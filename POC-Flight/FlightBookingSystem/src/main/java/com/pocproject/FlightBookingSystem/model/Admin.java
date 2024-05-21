package com.pocproject.FlightBookingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Admin{
	
	@Id
	private Long id;
	private String email;
	private String password;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "adminCredentials [id=" + id + ", email=" + email + ", password=" + password + "]";
	}
	public Admin(Long id, String email, String password) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
	}
	public Admin() {
		super();
	}

}
