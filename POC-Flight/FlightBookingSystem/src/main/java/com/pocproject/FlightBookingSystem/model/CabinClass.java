package com.pocproject.FlightBookingSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="CabinClass")
public class CabinClass {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cabinId;
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "flight_id")
	private Flight flight;

	private String classType;
	private int totalSeats;
	private int seatsAvailable;
	private int ticketPrice;
	
	public CabinClass() {
		super();
	}

	public CabinClass(Long cabinId, Flight flight, String classType, int totalSeats, int seatsAvailable, int ticketPrice) {
		super();
		this.cabinId = cabinId;
		this.flight = flight;
		this.classType = classType;
		this.totalSeats = totalSeats;
		this.seatsAvailable = seatsAvailable;
		this.ticketPrice = ticketPrice;
	}

	public Long getCabinId() {
		return cabinId;
	}

	public void setCabinId(Long cabinId) {
		this.cabinId = cabinId;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}
	
	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}

	public int getSeatsAvailable() {
		return seatsAvailable;
	}

	public void setSeatsAvailable(int seatsAvailable) {
		this.seatsAvailable = seatsAvailable;
	}

	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	
	public String getClassType() {
		return classType;
	}

	public void setClassType(String classType) {
		this.classType = classType;
	}

	@Override
	public String toString() {
		return "CabinClass [cabinId=" + cabinId + ", classType= " + classType + ", totalSeats= "+ totalSeats +", seatsAvailable=" + seatsAvailable
				 + ", ticketPrice=" + ticketPrice + "]";
	}
	
	
}
