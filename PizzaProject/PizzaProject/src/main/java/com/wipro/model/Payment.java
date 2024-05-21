package com.wipro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Payment {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int paymentId;
	private String cardHolderName;
	private String CreditCardNumber;
	private int cvvNumber;
	private String validFrom;
	private String validTo;
	private String password;
	private double Balance;
	private double totalCharges;
	private double remainingBalance;
	public int getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}
	public String getCardHolderName() {
		return cardHolderName;
	}
	public void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}
	public String getCreditCardNumber() {
		return CreditCardNumber;
	}
	public void setCreditCardNumber(String creditCardNumber) {
		CreditCardNumber = creditCardNumber;
	}
	public int getCvvNumber() {
		return cvvNumber;
	}
	public void setCvvNumber(int cvvNumber) {
		this.cvvNumber = cvvNumber;
	}
	
	public String getValidFrom() {
		return validFrom;
	}
	public void setValidFrom(String validFrom) {
		this.validFrom = validFrom;
	}
	public String getValidTo() {
		return validTo;
	}
	public void setValidTo(String validTo) {
		this.validTo = validTo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public double getBalance() {
		return Balance;
	}
	public void setBalance(double balance) {
		Balance = balance;
	}
	public double getTotalCharges() {
		return totalCharges;
	}
	public void setTotalCharges(double totalCharges) {
		this.totalCharges = totalCharges;
	}
	public double getRemainingBalance() {
		return remainingBalance;
	}
	public void setRemainingBalance(double remainingBalance) {
		this.remainingBalance = remainingBalance;
	}
	@Override
	public String toString() {
		return "Payment [paymentId=" + paymentId + ", cardHolderName=" + cardHolderName + ", CreditCardNumber="
				+ CreditCardNumber + ", cvvNumber=" + cvvNumber + ", validFrom=" + validFrom + ", validTo=" + validTo
				+ ", password=" + password + ", Balance=" + Balance + ", totalCharges=" + totalCharges
				+ ", remainingBalance=" + remainingBalance + "]";
	}
	
	
}
