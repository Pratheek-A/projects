package com.wipro.srs.entity;

public class UserPasswordChange {
	private String userName;
	private String oldPassword;
	private String newPassword;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
	public UserPasswordChange(String userName, String oldPassword, String newPassword) {
		super();
		this.userName = userName;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	
//	public UserPasswordChange() {
//	super();
//}

//	@Override
//	public String toString() {
//		return "userPasswordChange [userName=" + userName + ", oldPassword=" + oldPassword + ", newPassword="
//				+ newPassword + "]";
//	}
	
}
