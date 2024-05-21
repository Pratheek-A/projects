package com.wipro.srs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="routeDetails")
public class RouteDetails {
	@Id
	private String routeId;
	private String source;
	private String destination;
	private int km;
	
	public String getRouteId() {
		return routeId;
	}
	public void setRouteId(String routeId) {
		this.routeId = routeId;
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
	public int getKm() {
		return km;
	}
	public void setKm(int km) {
		this.km = km;
	}
	public RouteDetails(String routeId, String source, String destination, int km) {
		super();
		this.routeId = routeId;
		this.source = source;
		this.destination = destination;
		this.km = km;
	}
	public RouteDetails() {
		super();
	}
	
}
