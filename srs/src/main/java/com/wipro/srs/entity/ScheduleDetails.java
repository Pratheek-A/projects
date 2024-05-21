package com.wipro.srs.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="scheduleDetails")
public class ScheduleDetails {
	@Id
	private String sId;
	
	@OneToOne(cascade=CascadeType.REFRESH)
	@JoinColumn(name="shipId")
	private ShipDetails shipId;
	
	@OneToOne(cascade=CascadeType.REFRESH)
	@JoinColumn(name="routeId")
	private RouteDetails routeId;
	
	public ShipDetails getShipId() {
		return shipId;
	}
	public void setShipId(ShipDetails shipId) {
		this.shipId = shipId;
	}
	public RouteDetails getRouteId() {
		return routeId;
	}
	public void setRouteId(RouteDetails routeId) {
		this.routeId = routeId;
	}
	
	
	private String journeyDate;
	private String time;
	private int seatAvailability;
	private int price;
	
	public String getsId() {
		return sId;
	}
	public void setsId(String sId) {
		this.sId = sId;
	}
	public String getJourneyDate() {
		return journeyDate;
	}
	public void setJourneyDate(String journeyDate) {
		this.journeyDate = journeyDate;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public int getSeatAvailability() {
		return seatAvailability;
	}
	public void setSeatAvailability(int seatAvailability) {
		this.seatAvailability = seatAvailability;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}

	public ScheduleDetails(String sId, ShipDetails shipId, RouteDetails routeId, String journeyDate, String time,
			int seatAvailability, int price) {
		super();
		this.sId = sId;
		this.shipId = shipId;
		this.routeId = routeId;
		this.journeyDate = journeyDate;
		this.time = time;
		this.seatAvailability = seatAvailability;
		this.price = price;
	}
	public ScheduleDetails() {
		super();
	}	
}
