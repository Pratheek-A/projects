package com.pocproject.FlightBookingSystem.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="flights")
public class Flight {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long flightId;
	
	private String flightNumber;
	private String airLines;
	private String source;
	private String destination;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime departureDateTime;
	private int duration;
	private boolean bookingsOpen;
	
	@OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
	private List<CabinClass> cabins;

	public Flight() {
		super();
	}

	public Flight(Long flightId, String flightNumber, String airLines, String source, String destination,
			LocalDateTime departureDateTime, int duration, boolean bookingsOpen, List<CabinClass> cabins) {
		super();
		this.flightId = flightId;
		this.flightNumber = flightNumber;
		this.airLines = airLines;
		this.source = source;
		this.destination = destination;
		this.departureDateTime = departureDateTime;
		this.duration = duration;
		this.bookingsOpen = bookingsOpen;
		this.cabins = cabins;
	}

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getAirLines() {
		return airLines;
	}

	public void setAirLines(String airLines) {
		this.airLines = airLines;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public LocalDateTime getDepartureDate() {
		return departureDateTime;
	}

	public void setDepartureDate(LocalDateTime departureDateTime) {
		this.departureDateTime = departureDateTime;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public boolean isBookingsOpen() {
		return bookingsOpen;
	}

	public void setBookingsOpen(boolean bookingsOpen) {
		this.bookingsOpen = bookingsOpen;
	}

	public List<CabinClass> getCabins() {
		return cabins;
	}

	public void setCabins(List<CabinClass> cabins) {
		this.cabins = cabins;
	}

	@Override
	public String toString() {
		return "Flight [flightId=" + flightId + ", flightNumber=" + flightNumber + ", airLines=" + airLines
				+ ", source=" + source + ", destination=" + destination + ", departureDateTime=" + departureDateTime
				+ ", duration=" + duration + ", bookingsOpen=" + bookingsOpen
				+ ", cabins=" + cabins + "]";
	}
	
	
}
