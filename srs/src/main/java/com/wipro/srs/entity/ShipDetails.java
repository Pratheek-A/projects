package com.wipro.srs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="shipDetails") 
public class ShipDetails {
	@Id
	private String shipId;
	private String shipName;
	private String shipModel;
	private long shipCapacity;
	private long reservationCapacity;
	private int perKm;

	public String getShipId() {
		return shipId;
	}

	public void setShipId(String shipId) {
		this.shipId = shipId;
	}

	public String getShipName() {
		return shipName;
	}

	public void setShipName(String shipName) {
		this.shipName = shipName;
	}

	public String getShipModel() {
		return shipModel;
	}

	public void setShipModel(String shipModel) {
		this.shipModel = shipModel;
	}

	public long getShipCapacity() {
		return shipCapacity;
	}

	public void setShipCapacity(long shipCapacity) {
		this.shipCapacity = shipCapacity;
	}

	public long getReservationCapacity() {
		return reservationCapacity;
	}

	public void setReservationCapacity(long reservationCapacity) {
		this.reservationCapacity = reservationCapacity;
	}

	public int getPerKm() {
		return perKm;
	}

	public void setPerKm(int perKm) {
		this.perKm = perKm;
	}
	
	public ShipDetails() {
		super();
	}

	public ShipDetails(String shipId, String shipName, String shipModel, long shipCapacity, long reservationCapacity,int perKm) {
		super();
		this.shipId = shipId;
		this.shipName = shipName;
		this.shipModel = shipModel;
		this.shipCapacity = shipCapacity;
		this.reservationCapacity = reservationCapacity;
		this.perKm = perKm;
	}

	@Override
	public String toString() {
		return "ShipDetails [shipId=" + shipId + ", shipName=" + shipName + ", shipModel=" + shipModel
				+ ", shipCapacity=" + shipCapacity + ", reservationCapacity=" + reservationCapacity + ", perKm=" + perKm
				+ "]";
	}
}
