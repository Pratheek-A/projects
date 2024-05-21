package com.wipro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Store {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int storeId;
	private String storeName;
	private String storePlace;
	private String storeLocality;
	private String storeState;
	private long storeNumber;
	public int getStoreId() {
		return storeId;
	}
	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public String getStorePlace() {
		return storePlace;
	}
	public void setStorePlace(String storePlace) {
		this.storePlace = storePlace;
	}
	public String getStoreLocality() {
		return storeLocality;
	}
	public void setStoreLocality(String storeLocality) {
		this.storeLocality = storeLocality;
	}
	public String getStoreState() {
		return storeState;
	}
	public void setStoreState(String storeState) {
		this.storeState = storeState;
	}
	public long getStoreNumber() {
		return storeNumber;
	}
	public void setStoreNumber(long storeNumber) {
		this.storeNumber = storeNumber;
	}
	@Override
	public String toString() {
		return "Store [storeId=" + storeId + ", storeName=" + storeName + ", storePlace=" + storePlace
				+ ", storeLocality=" + storeLocality + ", storeState=" + storeState + ", storeNumber=" + storeNumber
				+ "]";
	}
	
	
	
	
	

}
