import { createContext, useContext, useState } from "react";
import { deleteRefreshToken, emailVerificationApi, userLoginApi} from "../api/UserApi";
import { userRegisterApi } from "../api/UserApi";
import { flightBookingApi, retrieveBookingsApi } from "../api/BookingApi";
import { adminJwtAuthenticationService, jwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export function AppContextProvider({children}){

    const [searchedFlights, setSearchedFlights] = useState([])
    const [selectedFlight, setSelectedFlight] = useState(null)
    const [selectedCabin, setSelectedCabin] = useState(null)

    const [user, setUser] = useState({
        userId: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        password:"",
        usermobileNumber: ""
    });
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        bookingId: "",
        userId: "",
        flightId: "",
        cabinId: "",
        passengerType: "",
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        mobileNumber: "",
        gender: "",
        totalPrice: 0,
        transactionId: ""
    })
    const [bookingsList, setBookingsList] = useState([])
    const [message, setMessage] = useState("")

    const calculateDepartureDateTime = (departureDateTime) =>{
        const depDateTime = new Date(departureDateTime)
        return depDateTime.toLocaleString()
    }

    const calculateArrivalDateTime = (departureDateTime, duration) => {
        const arrDateTime = new Date(departureDateTime)
        arrDateTime.setHours(arrDateTime.getHours()+duration)
        const date = arrDateTime.toLocaleString()
        return date
    }

    const sendEmailVerification = (userEmail) => {
        console.log(`User Email : ${userEmail}`)
        emailVerificationApi(userEmail)
    }

    const register = async(user, otp) => {
        try{
            const response = await userRegisterApi(user, otp);
            return response.status
        }catch(error){
            console.log(error)
            return error.response.status
        }
    }

    const setLoggedInUserData = async (userCredentials) =>{
        try{
            const response = await userLoginApi(userCredentials)
            console.log(response.data)
            sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
            setLoggedInUser(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const getAccessTokenStatus = () => {
        return !!localStorage.getItem("accessToken")
    }

    const login = async (userCredentials) => {
        try{
            const response = await jwtAuthenticationService(userCredentials.userEmail, userCredentials.password)
            //const response = await userLoginApi(userCredentials)
            if(response.status==200){
                const accessToken = "Bearer "+response.data.accessToken
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = accessToken
                        return config
                    }
                )
                localStorage.setItem("accessToken", accessToken)
                setLoggedInUserData(userCredentials)

                console.log(response)
                return response
            }
        }catch(error){
            return error.response
        }
    }

    const adminLogin = async (adminCredentials) => {
        try{
            const response = await adminJwtAuthenticationService(adminCredentials.email, adminCredentials.password)
            //console.log(response)
            if(response.status==200){
                const accessToken = "Bearer "+response.data.accessToken
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = accessToken
                        return config
                    }
                )
                setIsAdmin(true)
                return response
            }
        }catch(error){
            return error.response
        }
    }

    const bookFlight = async(bookingsList) => {
        try{
            const response = await flightBookingApi(bookingsList)
            setBookingsList([])
            return response
        }catch(error){
            return error.response
        }
        
    }

    const retrieveAllBookings = async(userId) => {
        try{
            const response = await retrieveBookingsApi(userId)
            return response
        }catch(error){
            return error.response
        }
    }

    const logout = () => {
        setUser({
            userId: "",
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            password:"",
            usermobileNumber: ""
        })

        setLoggedInUser(null)
        setSearchedFlights([])
        setBookingDetails({
            bookingId: "",
            userId: "",
            flightId: "",
            cabinId: "",
            passengerType: "",
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            mobileNumber: "",
            gender: "",
            totalPrice: 0,
            transactionId: ""
        })
        setBookingsList([])
    }

    const adminLogout = () => {
        setIsAdmin(false)
    }

    return (
        <AppContext.Provider value={{
                                    searchedFlights,
                                    setSearchedFlights,
                                    selectedCabin,
                                    setSelectedCabin,
                                    selectedFlight,
                                    setSelectedFlight,
                                    user,
                                    setUser,
                                    isAdmin,
                                    setIsAdmin,
                                    message, 
                                    setMessage,
                                    calculateArrivalDateTime,
                                    calculateDepartureDateTime,
                                    sendEmailVerification,
                                    register,
                                    login,
                                    adminLogin,
                                    logout,
                                    adminLogout,
                                    loggedInUser,
                                    setLoggedInUser,
                                    getAccessTokenStatus,
                                    bookingDetails,
                                    setBookingDetails,
                                    bookingsList, 
                                    setBookingsList,
                                    bookFlight,
                                    retrieveAllBookings
                                    }}>
            {children}
        </AppContext.Provider>
    )
}