package com.wipro.srs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="passengerDetails")
public class PassengerDetails {
	@Id
	private int passId;
	private String passName;
	private String phoneNumber;
	
	public int getPassId() {
		return passId;
	}
	public void setPassId(int passId) {
		this.passId = passId;
	}
	public String getPassName() {
		return passName;
	}
	public void setPassName(String passName) {
		this.passName = passName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public PassengerDetails(int passId, String passName, String phoneNumber) {
		super();
		this.passId = passId;
		this.passName = passName;
		this.phoneNumber = phoneNumber;
	}
	public PassengerDetails() {
		super();
	}
	
	
}
