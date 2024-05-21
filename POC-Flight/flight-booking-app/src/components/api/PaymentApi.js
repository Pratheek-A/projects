import { apiClient } from "./ApiClient";

export const PaymentApi = (amount) => {return apiClient.get(`/razorpay/payment/${amount}`)}