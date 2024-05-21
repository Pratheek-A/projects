import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { addFlightApi } from "./api/FlightServiceApi";

export default function AddFlight(){

    const [flight, setFlight] = useState({
        flightId: "",
        flightNumber: "",
        airLines: "",
        source: "",
        destination: "",
        departureDateTime: "", 
        duration : "", 
        bookingsOpen: true,
        cabins:[
            {cabinId:"", classType:"Economy", totalSeats: "", seatsAvailable:"", ticketPrice:""},
            {cabinId:"", classType:"PremiumEconomy", totalSeats: "", seatsAvailable:"", ticketPrice:""},
            {cabinId:"", classType:"Business", totalSeats: "", seatsAvailable:"", ticketPrice:""},
            {cabinId:"", classType:"First", totalSeats: "", seatsAvailable:"", ticketPrice:""}
        ]
    })

    const convertDateTime = (dateTime) => {
        const [datePart, timePart] = dateTime.split('T')
        const formattedDate = datePart
        const formattedTime = timePart.substring(0,5) + ':00'
        return `${formattedDate} ${formattedTime}`
    }

    const handleFlightInputChange = (event) => {
        setFlight({...flight, [event.target.name]: event.target.value})
    }

    const handleFlightCabinChange = (event, cabinClassType) => {
        setFlight(prevFlight => ({
            ...prevFlight, 
            cabins:
            prevFlight.cabins.map((cabin) => 
                                    cabin.classType == cabinClassType ? 
                                    {...cabin, [event.target.name]: event.target.value} :cabin)
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        flight.departureDateTime = convertDateTime(flight.departureDateTime)
        console.log(flight)
        try{
            const response = await addFlightApi(flight)
            if(response.status==200){
                alert("New flight added!")

                setFlight({
                    flightId: "",
                    flightNumber: "",
                    airLines: "",
                    source: "",
                    destination: "",
                    departureDateTime: "", 
                    duration : "", 
                    bookingsOpen: true,
                    cabins:[
                        {cabinId:"", classType:"Economy", totalSeats: "", seatsAvailable:"", ticketPrice:""},
                        {cabinId:"", classType:"PremiumEconomy", totalSeats: "", seatsAvailable:"", ticketPrice:""},
                        {cabinId:"", classType:"Business", totalSeats: "", seatsAvailable:"", ticketPrice:""},
                        {cabinId:"", classType:"First", totalSeats: "", seatsAvailable:"", ticketPrice:""}
                    ]
                })
            }
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div>
            <center className="mt-5">
                <h1>Add New Flight</h1>
            </center>

            <center className="mt-5">
                <div className="flightDetails-container">

                    <Row className='justify-content-center'>
                        <Col md={4}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>Flight Number</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="flightNumber"
                                        value={flight.flightNumber}
                                        placeholder="Enter Flight Number"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>AirLines</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="airLines"
                                        value={flight.airLines}
                                        placeholder="Enter AirLines"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>Source</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="source"
                                        value={flight.source}
                                        placeholder="Enter Source"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>Destination</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="destination"
                                        value={flight.destination}
                                        placeholder="Enter Destination"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>Departure Date Time</strong></Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="departureDateTime"
                                        value={flight.departureDateTime}
                                        placeholder="Enter Departure Date and Time"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label><strong>Duration (In Hrs)</strong></Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="duration"
                                        value={flight.duration}
                                        placeholder="Enter Duration (in hrs)"
                                        required
                                        onChange={handleFlightInputChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    {flight.cabins.map(
                                        (cabin, index) => (
                                            <div key={index}>
                                                <Form.Label><strong>{cabin.classType}</strong></Form.Label>
                                                <div style={{display:"flex"}}>
                                                    <div>
                                                        <Form.Label><strong>Total seats</strong></Form.Label>
                                                        <Form.Control
                                                        className="m-2"
                                                        type="number"
                                                        name="totalSeats"
                                                        value={cabin.totalSeats}
                                                        placeholder={`Enter total seats in ${cabin.classType}`}
                                                        required
                                                        onChange={(event) => handleFlightCabinChange(event, cabin.classType)}
                                                    />
                                                    </div>
                                                    
                                                    
                                                    <div>
                                                    <Form.Label><strong>Seats Available</strong></Form.Label>
                                                    <Form.Control
                                                        className="m-2"
                                                        type="number"
                                                        name="seatsAvailable"
                                                        value={cabin.seatsAvailable}
                                                        placeholder={`Enter available seats in ${cabin.classType}`}
                                                        required
                                                        onChange={(event) => handleFlightCabinChange(event, cabin.classType)}
                                                    />
                                                    </div>
                                                    
                                                    <div>
                                                    <Form.Label><strong>Ticket Price</strong></Form.Label>
                                                    <Form.Control
                                                        className="m-2"
                                                        type="number"
                                                        name="ticketPrice"
                                                        value={cabin.ticketPrice}
                                                        placeholder={`Enter ticket price of ${cabin.classType}`}
                                                        required
                                                        onChange={(event) => handleFlightCabinChange(event, cabin.classType)}
                                                    />
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        )
                                    )}
                                </Form.Group>

                                <div className='d-grid m-5'>
                                    <Button variant='primary' type='submit'>
                                        Add Flight
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </center>
        </div>
    )
}