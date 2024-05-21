import { apiClient } from "./ApiClient";

export const emailVerificationApi = (userEmail) => apiClient.post(`/sendOtp/${userEmail}`)

export const userRegisterApi = (user, otp) => {return apiClient.post(`/userRegister/${otp}`, user) }

export const userLoginApi = (userCredentials) => {return apiClient.post("/userLogin", userCredentials)}

export const refreshTokenApi = (token) => {return apiClient.post("/refreshToken", token)}

export const deleteRefreshToken = (token) => apiClient.delete("/deleteRefreshToken", token)

export const sendFeedback = (feedback, userId) => {return  apiClient.post(`/feedback/${userId}`, feedback)}