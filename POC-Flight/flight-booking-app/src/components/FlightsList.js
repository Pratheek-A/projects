import { useEffect, useState } from "react"
import { useAppContext } from "./contextApi/AppContext"
// import FilterFlights from "./FliterFlights"
// import Sider from "antd/es/layout/Sider"
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router"
import Footer from "./Footer"

export default function FlightsList(){

    const appContext = useAppContext()

    const flights = appContext.searchedFlights

    const navigate = useNavigate()

    const {selectedFlight, 
        setSelectedFlight,
        selectedCabin,
        setSelectedCabin,
        message, 
        setMessage} = appContext
    
    // function seperateArrivalDateTime(departureDateTime, duration){
    //     const arrDateTime = new Date(departureDateTime)
    //     arrDateTime.setHours(arrDateTime.getHours()+duration)

    //     const date = arrDateTime.toLocaleDateString()
    //     const time = arrDateTime.toLocaleTimeString()

    //     setArrDate(date)
    //     setArrTime(time)
    // }

    function depTime(departureDateTime){
        return new Date(departureDateTime).toLocaleTimeString()
    }

    function depDate(departureDateTime){
        return new Date(departureDateTime).toLocaleDateString()
    }

    function arrivalTime(departureDateTime, duration){
        const depDateTime = new Date(departureDateTime)
        depDateTime.setHours(depDateTime.getHours()+duration)
        const time = depDateTime.toLocaleTimeString()

        return time
    }

    function arrivalDate(departureDateTime, duration){
        const depDateTime = new Date(departureDateTime)
        depDateTime.setHours(depDateTime.getHours()+duration)
        const date = depDateTime.toLocaleDateString()

        return date
    }

    // function seperateDepDateTime(departureDateTime){
    //     const depDateTime = new Date(departureDateTime)

    //     const date = depDateTime.toLocaleDateString()
    //     const time = depDateTime.toLocaleTimeString()

    //     setDepDate(date)
    //     setDepTime(time)
    // }

    function checkSeats(totalSeats, availableSeats){
        if(availableSeats>=(totalSeats/2)) return true

        return false
    }

    function handleBooking(currentFlight, currentCabin){
        if(flights){
            setSelectedFlight(currentFlight)
            setSelectedCabin(currentCabin)
            navigate("/flights/book")
        }else{
            setMessage("You are  not logged in!")
            navigate("/userLogin")
        }
        
    }

     return(
        <div className="container">
            {flights.length!=0 && <Sidebar/>}
            <div className="row" style={{marginBottom:"10rem"}}>
                {flights.map(
                    flight => (
                        <div className="row-md-4 mb-4" key={flight.flightId}>
                            <div className="card flight-details-box" >
                                <div className="card-body flight-details">
                                    <div className="flight-info">
                                        <div className="flight-name-info">
                                            <h4 className="card-title flight-name-text">({flight.flightNumber}) {flight.airLines}</h4>
                                        </div>
                                        <div className="flight-time-info">
                                            <div style={{display: "inline-flex", float: "right"}}>
                                                {/* {seperateArrivalDateTime(flight.departureDateTime, flight.duration)} */}
                                                <div className="dep-time">
                                                    {
                                                        <p className="card-text dep-time-text">{depTime(flight.departureDateTime)}</p>
                                                    }
                                                    {
                                                        <p className="card-text dep-date-text">{depDate(flight.departureDateTime)}</p>
                                                    }
                                                    
                                                    <p className="card-text source">{flight.source}</p>
                                                </div>
                                                <div className="indication">
                                                    <p>--------------&gt;</p>
                                                    <p className="card-text duration">Duration : {flight.duration} hrs</p>
                                                </div>
                                                
                                                <div className="arr-time">
                                                    {
                                                        <p className="card-text arr-time-text">{arrivalTime(flight.departureDateTime, flight.duration)}</p>
                                                    }
                                                    
                                                    {
                                                        <p className="card-text arr-date-text">{arrivalDate(flight.departureDateTime, flight.duration)}</p>
                                                    }
                                                    
                                                    <p className="card-text destination">{flight.destination}</p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="cabin-details-box">
                                        {flight.cabins.map(
                                            cabin => (
                                                <div key={cabin.cabinId} className="cabin-info card m-2">
                                                    <div className="cabin-upper-part">
                                                        <p className="class-type">{cabin.classType} | ₹{cabin.ticketPrice}</p>
                                                    </div>
                                                    <hr style={{margin: "0px"}}></hr>
                                                    <div className="cabin-lower-part">
                                                        {cabin.seatsAvailable
                                                                ?<div className="seats-info" style={{color: checkSeats(cabin.totalSeats, cabin.seatsAvailable) ? "#39BA71" : "#D02A2A"}}>{cabin.seatsAvailable} SEATS AVAILABLE</div> 
                                                                :<div className="seats-info">Not Available</div>}
                                                        <div className="booking-part">
                                                            <button className="btn">
                                                                <p className="booking-btn" style={{margin:0}}  onClick={() => handleBooking(flight, cabin)}>Book now</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                )}
            </div>
        </div>
        
     )
}

// private Long flightId;
	
// 	private String flightNumber;
// 	private String airLines;
// 	private String source;
// 	private String destination;
	
// 	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
// 	private LocalDateTime departureDateTime;
// 	private int duration;
// 	private boolean bookingsOpen;

// private Long cabinId;
// private String classType;
// 	private int totalSeats;
// 	private int seatsAvailable;
// 	private int ticketPrice;