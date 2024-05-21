import { useEffect, useState } from "react"
import { getAllBookingsApi } from "./api/BookingApi"

export default function TotalBookings(){

    const [totalBookings, setTotalBookings] = useState([])
    
    useEffect(() => {
        async function getAllBookings(){
            try{
                const response = await getAllBookingsApi()
                setTotalBookings(response.data)
            }catch(error){
                console.log(error)
            }
        }

        getAllBookings()
    }, [])

    return (
        <div>
            <center className="mt-5">
                <h1>Total Flight Bookings</h1>
            </center>

            <div className="bookings-container">
                <center>
                    {totalBookings!=null ?
                        (<table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Passenger Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Airlines</th>
                                    <th>Cabin class</th>
                                    <th>Transaction Id</th>
                                </tr>
                            </thead>

                            <tbody>
                                {totalBookings.map(
                                    booking =>(
                                        <tr key={booking.bookingId}>
                                            <td>{booking.firstName} {booking.lastName} ({booking.passengerType})</td>
                                            <td>{booking.gender}</td>
                                            <td>{booking.email}</td>
                                            <td>{booking.mobileNumber}</td>
                                            <td>{booking.flight.airLines}</td>
                                            <td>{booking.cabin.classType}</td>
                                            <td>{booking.transactionId}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>) :
                        (
                            <h4>No Bookings!</h4>
                        )
                    }
                </center>
            </div>
        </div>
    )
}