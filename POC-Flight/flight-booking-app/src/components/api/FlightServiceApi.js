import { apiClient } from "./ApiClient";

export const getAllFlightsApi = () => {return apiClient.get("/flights/all")}

export const searchedFlightsApi = (source, destination, departureDate) => 
                                        apiClient.get(`/flights/search`,{
                                            params:{
                                                source : source, 
                                                destination : destination, 
                                                departureDate : departureDate                                                          
                                            }
                                        })

export const sortFlightsByCostApi = (sortOrder, cabinType, source, destination, departureDate) => 
                                        apiClient.get(`/flights/sort/cost`, {
                                            params: {
                                                sortOrder: sortOrder,
                                                cabinType: cabinType,
                                                source: source,
                                                destination: destination,
                                                departureDate: departureDate
                                            }
                                        })

export const sortFlightsByDurationApi = (source, destination, departureDate) => 
                                        apiClient.get(`/flights/sort/duration`, {
                                            params: {
                                                source: source,
                                                destination: destination,
                                                departureDate: departureDate
                                            }  
                                            })

export const addFlightApi = (flight) => {return apiClient.post("/flights/add", flight)}