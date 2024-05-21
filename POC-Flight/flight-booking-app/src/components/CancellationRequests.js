import { useEffect, useState } from "react"
import { cancelTicket, getCancellations } from "./api/AdminServiceApi"

export default function CancellationRequests(){

    const [cancellations, setCancellations] = useState([])

    useEffect(() => {
        getAllCancellations()
    }, [])

    async function getAllCancellations(){
        try{
            const response = await getCancellations();
            setCancellations(response.data)
        }catch(error){
            console.log(error)
        }
    }

    console.log(cancellations)

    const handleCancellation = async (event,cancellationId, bookingId) => {
        event.preventDefault()
        try{
            const response = await cancelTicket(cancellationId, bookingId)
            alert(response.data)
            getAllCancellations()
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <center>
                <h1 className="mt-5">Cancellation Requests</h1>
            </center>

            <div className="cancellation-requests-container mt-5">
                <center>
                    {
                        cancellations.length!=0 ? 
                        (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Passenger</th>
                                        <th>AirLines</th>
                                        <th>Flight Number</th>
                                        <th>Cabin</th>
                                        <th>Ticket Number</th>
                                        <th>Transaction Id</th>
                                        <th>Refundable amount</th>
                                        <th>Cancellation</th>
                                    </tr>
                                </thead>
                                
                                <tbody>{
                                    cancellations.map(
                                        cancellation => (
                                            <tr key={cancellation.id}>
                                                <td>{cancellation.booking.user.userFirstName} {cancellation.booking.user.userLastName}</td>
                                                <td>{cancellation.booking.firstName} {cancellation.booking.lastName}</td>
                                                <td>{cancellation.booking.flight.airLines}</td>
                                                <td>{cancellation.booking.flight.flightNumber}</td>
                                                <td>{cancellation.booking.cabin.classType}</td>
                                                <td>{cancellation.booking.ticket}</td>
                                                <td>{cancellation.booking.transactionId}</td>
                                                <td>₹ {cancellation.booking.totalPrice}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={(event) => handleCancellation(event, cancellation.id, cancellation.booking.bookingId)}>
                                                        Cancel & Initiate Refund
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        ):(
                            <div className="alert alert-info mt-5" style={{width: "60%"}}>
                                <h5>No Cancellations</h5>
                            </div>
                            
                        )

                    }
                    
                </center>
            </div>
        </div>
    )
}