package com.wipro.srs.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="userLoginCredential")
public class UserLoginCredential {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private int userId;
	@Column(unique=true)
	private String userName;
	private String userPassword;
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	
	public UserLoginCredential() {
		super();
	}
	
	public UserLoginCredential(int userId, String userName, String userPassword) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
	}
	
	@Override
	public String toString() {
		return "UserCredential [userId=" + userId + ", userName=" + userName + ", userPassword=" + userPassword + "]";
	}
	
	
}
