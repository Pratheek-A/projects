package com.pocproject.FlightBookingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="cancellations")
public class Cancellation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name="booking_id")
	private Booking booking;
	
	private boolean isCancellationRequested;

	public Cancellation() {
		super();
	}

	public Cancellation(Booking booking, boolean isCancellationRequested) {
		super();
		this.booking = booking;
		this.isCancellationRequested = isCancellationRequested;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public boolean isCancellationRequested() {
		return isCancellationRequested;
	}

	public void setCancellationRequested(boolean isCancellationRequested) {
		this.isCancellationRequested = isCancellationRequested;
	}

	
}
