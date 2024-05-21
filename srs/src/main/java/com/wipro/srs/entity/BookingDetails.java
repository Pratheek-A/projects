package com.wipro.srs.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="bookingDetails")
public class BookingDetails {
	@Id
	private String bId;
	
	@ManyToOne(cascade=CascadeType.REFRESH)
	@JoinColumn(name="passId")
	private PassengerDetails passId;
	
	@ManyToOne(cascade=CascadeType.REFRESH)
	@JoinColumn(name="sId")
	private ScheduleDetails sId;
	
	private String payment;

	public String getbId() {
		return bId;
	}

	public void setbId(String bId) {
		this.bId = bId;
	}

	public PassengerDetails getPassId() {
		return passId;
	}

	public void setPassId(PassengerDetails passId) {
		this.passId = passId;
	}

	public ScheduleDetails getsId() {
		return sId;
	}

	public void setsId(ScheduleDetails sId) {
		this.sId = sId;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public BookingDetails(String bId, PassengerDetails passId, ScheduleDetails sId, String payment) {
		super();
		this.bId = bId;
		this.passId = passId;
		this.sId = sId;
		this.payment = payment;
	}

	public BookingDetails() {
		super();
	}
	
	
	
}
