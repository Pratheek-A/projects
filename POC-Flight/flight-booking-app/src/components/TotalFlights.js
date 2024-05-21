import { useEffect, useState } from "react"
import { getAllFlightsApi } from "./api/FlightServiceApi"
import { useAppContext } from "./contextApi/AppContext"
import { Button, Form } from "react-bootstrap"
import { sendDelayRequest } from "./api/AdminServiceApi"

export default function TotalFlights(){

    const [flights, setFlights] = useState([])
    //const [isChecked, setIsChecked] = useState(false)
    const [delayRequest, setDelayRequest] = useState({
        delayHours: "",
        reason: ""
    })
    const appContext = useAppContext()
    const {calculateArrivalDateTime} = appContext

    useEffect(() => {
        getAllFlights()
        updateFlights()
    }, [])

    const getAllFlights = async () => {
        try{   
            const response = await getAllFlightsApi()
            setFlights(response.data)
        }catch(error){
            console.log(error)
        }   
    }

    const updateFlights = async () => {
        setFlights(flights.map(flight => ({...flight, isChecked:false})))
    }

    const handleCheckboxChange = (checkedFlight) => {
        setFlights(flights.map(flight => 
            flight.flightId == checkedFlight.flightId ? {...flight,
            isChecked: !flight.isChecked} : flight))

        setDelayRequest({
            delayHours:"",
            reason:""
        })
    }

    const handleDelayChange = (event) => {
        setDelayRequest({...delayRequest, [event.target.name]:event.target.value})
    }

    const handleDelaySubmit = async (event, flight) => {
        event.preventDefault()
        console.log(`Flight Id : ${flight.flightId}`)
        console.log(delayRequest)
        try{
            const response = await sendDelayRequest(flight.flightId,delayRequest)
            if(response.status==200){
                alert(response.data)
            }
        }catch(error){
            console.log(error)
        }
        setDelayRequest({
            delay: "",
            reason: ""
        })
        getAllFlights()
        updateFlights()
    }

    console.log(flights)

    return (
        <div>
            <center className="mt-5">
                <h1>Total Flights</h1>
            </center>

            <div className="flights-container">
                <center>
                    {flights.length>0 ?
                        (<table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>AirLines</th>
                                    <th>Flight Number</th>
                                    <th>Take off</th>
                                    <th>Landing</th>
                                    <th>Departure Date</th>
                                    <th>Arrival Date</th>
                                    <th>Duration</th>
                                    <th>Delay</th>
                                </tr>
                            </thead>

                            <tbody>
                                {flights.map(
                                    flight => (
                                        <tr key={flight.flightId}>
                                            <td>{flight.airLines}</td>
                                            <td>{flight.flightNumber}</td>
                                            <td>{flight.source}</td>
                                            <td>{flight.destination}</td>
                                            <td>{flight.departureDate}</td>
                                            <td>{calculateArrivalDateTime(flight.departureDate, flight.duration)}</td>
                                            <td>{flight.duration} hrs</td>
                                            <td>
                                                <label>
                                                    <input type="checkbox"
                                                        onChange=
                                                        {() => handleCheckboxChange(flight)}
                                                        checked={flight.isChecked}/>
                                                        Delay
                                                </label>
                                                {flight.isChecked && (
                                                    <Form onSubmit={(event) => handleDelaySubmit(event,flight)}>
                                                        <Form.Group className="m-2">
                                                            <Form.Control
                                                                type="number"
                                                                name="delayHours"
                                                                value={delayRequest.delayHours}
                                                                onChange={handleDelayChange}
                                                                placeholder="Delay in hrs"/>
                                                        </Form.Group>

                                                        <Form.Group className="m-2">
                                                            <Form.Control
                                                                type="text"
                                                                name="reason"
                                                                value={delayRequest.reason}
                                                                onChange={handleDelayChange}
                                                                placeholder="Reason"/>
                                                        </Form.Group>

                                                        <Button variant='primary' type='submit'>
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                )}
                                                
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>) :
                        (
                            <h4>No flights!</h4>
                        )
                    }
                </center>
            </div>
        </div>
    )
}