import { apiClient } from "./ApiClient"

export const checkAdmin = () => {return apiClient.get("/admin/home")}

export const getCancellations = () => {return apiClient.get("/admin/cancellations")}

export const cancelTicket = (cancellationId, bookingId) => {return apiClient.get(`/admin/cancelTicket/${cancellationId}/${bookingId}`)}

export const sendDelayRequest = (flightId, delayRequest) => {return apiClient.put(`/flights/delay/${flightId}`, delayRequest)}

export const getFeedbacks = () => {return apiClient.get("/feedbacks")}

export const replyFeedbacks = (userId) => {return apiClient.post(`/feedbackReply/${userId}`)}