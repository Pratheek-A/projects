package com.pocproject.FlightBookingSystem.dto;

public class DelayRequest {

	private int delayHours;
	private String reason;
	
	public DelayRequest() {
		super();
	}

	public DelayRequest(int delayHours, String reason) {
		super();
		this.delayHours = delayHours;
		this.reason = reason;
	}

	public int getDelayHours() {
		return delayHours;
	}

	public void setDelayHours(int delayHours) {
		this.delayHours = delayHours;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Override
	public String toString() {
		return "DelayRequest [delayHours=" + delayHours + ", reason=" + reason + "]";
	}
	
	
}
