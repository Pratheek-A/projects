import { useEffect, useState } from "react"
import { useAppContext } from "./contextApi/AppContext"
import { deleteBookingApi,downloadTicketApi, getUserCancellations } from "./api/BookingApi"
import { useNavigate } from "react-router"
import { getCancellations } from "./api/AdminServiceApi"

export default function Bookings(){

    const appContext = useAppContext()

    const {retrieveAllBookings, loggedInUser} = appContext
    const [retrievedBookings, setRetrievedBookings] = useState([])
    const [cancellations, setCancellations] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        retrieveBookings()
        getCancellations(loggedInUser.userId)
    }, [])

    const retrieveBookings = async () => {
        const response = await retrieveAllBookings(loggedInUser.userId)
        if(response.status == 200){
            console.log(response.data)
            setRetrievedBookings(response.data)
        }else{
            console.log(response)
        }
    }

    const getCancellations = async (userId) => {
        const response = await getUserCancellations(userId)
        if(response.status == 200){
            console.log(response.data)
            setCancellations(response.data)
        }else{
            console.log(response.data)
        }
    }

    const handleView = (booking) => {
        //downloadTicketApi(booking.bookingId)
        navigate(`/flights/ticket/${booking.bookingId}`)
    }

    const handleCancellation = async (booking) => {
        const response = await deleteBookingApi(booking.user.userId, booking.bookingId)
        alert(response.data)
        retrieveBookings()
        getCancellations(booking.user.userId)
    }

    const isCancelled = (bookingId) => {
        return cancellations.some(cancellation => 
            cancellation.booking.bookingId == bookingId)
    }

    console.log(retrievedBookings)


    return (
        <div>
            <center>
                <h1>My Bookings</h1>
                {
                    retrievedBookings.length!=0 ?
                    (
                    <div>
                        <table className="table table-striped">
                            <thead style={{color:"#fff"}}>
                                <th>Passenger Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Airlines</th>
                                <th>Cabin class</th>
                                <th>Transaction Id</th>
                                <th>Download Ticket</th>
                                <th>Cancellation</th>
                            </thead>

                            <tbody>
                                {
                                retrievedBookings.map(
                                    booking => (
                                        !isCancelled(booking.bookingId)?(
                                            <tr>
                                            <td>{booking.firstName} {booking.lastName} ({booking.passengerType})</td>
                                            <td>{booking.gender}</td>
                                            <td>{booking.email}</td>
                                            <td>{booking.mobileNumber}</td>
                                            <td>{booking.flight.airLines}</td>
                                            <td>{booking.cabin.classType}</td>
                                            <td>{booking.transactionId}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => handleView(booking)}>View Ticket</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => handleCancellation(booking)}>Cancel</button>
                                            </td>
                                        </tr>
                                        ):(
                                            null
                                        )
                                    )
                                )
                                }
                            </tbody>
                        </table>

                        {cancellations.length!=0 ? (
                            <div className="mt-5">
                                <h3>Cancellations</h3>
                                <table className="table table-striped">
                                    <thead style={{color:"#fff"}}>
                                        <th>Passenger Name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Mobile Number</th>
                                        <th>Airlines</th>
                                        <th>Cabin class</th>
                                        <th>Transaction Id</th>
                                        <th>Cancellation</th>
                                    </thead>

                                    <tbody>
                                        {
                                        cancellations.map(
                                            cancellation => (
                                                <tr>
                                                    <td>{cancellation.booking.firstName} {cancellation.booking.lastName} ({cancellation.booking.passengerType})</td>
                                                    <td>{cancellation.booking.gender}</td>
                                                    <td>{cancellation.booking.email}</td>
                                                    <td>{cancellation.booking.mobileNumber}</td>
                                                    <td>{cancellation.booking.flight.airLines}</td>
                                                    <td>{cancellation.booking.cabin.classType}</td>
                                                    <td>{cancellation.booking.transactionId}</td>
                                                    <td>
                                                        <button className="btn btn-warning" disabled="true">Cancelled</button>
                                                    </td>
                                                </tr>
                                                
                                            )
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ): (
                            <div></div>
                        )
                        }
                    </div>
                    ):
                    <div className="alert alert-info mt-5" style={{width:"60%"}}>
                        <h5>No bookings</h5>
                    </div>
                    
                }
                
            </center>
        </div>
    )
}