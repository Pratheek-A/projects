import { apiClient } from "./ApiClient";

export const flightBookingApi = (bookingsList) => {return apiClient.post("/flights/book-flight", bookingsList)}

export const retrieveBookingsApi = (userId) => {return apiClient.get(`/flights/bookings/${userId}`)}

export const deleteBookingApi = (userId, bookingId) => {return apiClient.get(`/cancel-booking/${userId}/${bookingId}`)}

export const downloadTicketApi = (bookingId) => apiClient.get(`/download/${bookingId}`)

export const getBookingApi = (bookingId) => {return apiClient.get(`/flights/bookings/booking/${bookingId}`)}

export const getAllBookingsApi = () => {return apiClient.get("/flights/bookings/all")}

export const getUserCancellations = (userId) => {return apiClient.get(`/flights/booking/cancellations/${userId}`)}