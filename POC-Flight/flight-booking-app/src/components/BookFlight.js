import React, { useEffect, useState } from "react";
import { Card, CardBody, CardGroup, CardText, CardTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./contextApi/AppContext";

export default function BookFlight(){

    const appContext = useAppContext()

    const navigate = useNavigate()

    const {bookingDetails, setBookingDetails ,bookFlight, bookingsList, 
        setBookingsList, loggedInUser, selectedFlight, selectedCabin} = appContext

    
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        mobileNumber: "",
        gender: ""
    });

    const handleInputChange = (event) => {
        setBookingDetails({...bookingDetails, [event.target.name]: event.target.value});
    }

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!bookingDetails.firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }else if(/\d/.test(bookingDetails.firstName)){
            errorsCopy.firstName = 'First Name is Invalid';
            valid=false;
        }
        else {
        errorsCopy.firstName = '';
        }

        if (!bookingDetails.lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }else if(/\d/.test(bookingDetails.lastName)){
            errorsCopy.lastName = 'Last Name is Invalid';
            valid=false;
        } else {
            errorsCopy.lastName = '';
        }

        if (!bookingDetails.email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
            } else if (!/\S+@\S+\.\S+/.test(bookingDetails.email)) {
            errorsCopy.email = 'Email is invalid';
            valid = false;
            } else {
            errorsCopy.email = '';
        }

        if(bookingDetails.age==0){
            errorsCopy.age = 'Age is required';
            valid = false;
        }else if(!(/\d/.test(bookingDetails.age)) || (bookingDetails.age<=0) ){
            errorsCopy.age = 'Age is invalid';
            valid = false;
        }
        else {
            errorsCopy.age = '';
        }

        if(!(/\d/.test(bookingDetails.mobileNumber)) || (bookingDetails.mobileNumber.length != 10)){
            errorsCopy.mobileNumber = 'Phone number is Invalid';
            valid=false;
        }else{
            errorsCopy.mobileNumber='';
        }

        setErrors(errorsCopy);
        return valid;
    }

    const handleSave = (event) => {
        if(validateForm()){
            console.log(event)
            const updatedBookingDetails = { ...bookingDetails }

            updatedBookingDetails.userId = loggedInUser.userId
            updatedBookingDetails.flightId = selectedFlight.flightId
            updatedBookingDetails.cabinId = selectedCabin.cabinId
            if(updatedBookingDetails.passengerType == "Adult"){
                updatedBookingDetails.totalPrice = selectedCabin.ticketPrice
            }else if(updatedBookingDetails.passengerType == "Child"){
                updatedBookingDetails.totalPrice = (selectedCabin.ticketPrice * 0.7)
            }else if(updatedBookingDetails.passengerType == "Infant"){
                updatedBookingDetails.totalPrice = (selectedCabin.ticketPrice * 0.2)
            }

            setBookingsList(prevList => [...prevList, updatedBookingDetails])

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
         }
    }

    const handleRemove = (event) => {
        event.preventDefault()
        setBookingsList(prevList => prevList.filter(booking => booking.firstName+booking.lastName !== event.target.value))
    }

    const handleEdit = (event) => {
        event.preventDefault()

        const currentBookingDetails = bookingsList.filter(booking => booking.firstName+booking.lastName === event.target.value)
        setBookingDetails(currentBookingDetails[0])

        handleRemove(event)
    }

    const handleBooking = () => {
        navigate("/flights/payment")
    }

    return(
            <div className="mt-5" style={{marginBottom:"10rem"}}>
                <center>
                    <h1>Flight Booking</h1>
                </center>

                <center >
                    {bookingsList.length!=0 && (
                        <div>
                            {bookingsList.map(
                                booking => (
                                    <div key={booking.lastName}>
                                        <Card className="m-4" style={{width: '45rem'}}>
                                            <CardTitle>
                                                <strong>{booking.firstName} {booking.lastName} 	&#40; {booking.passengerType}	&#41;</strong>
                                            </CardTitle>
                                            <CardBody>
                                                <CardText style={{float: "left"}}>
                                                    <div className="fw-bolder">
                                                        Gender : <strong>{booking.gender}</strong>
                                                    </div>
                                                    <div className="fw-bolder">
                                                        Email : <strong>{booking.email}</strong>
                                                    </div>
                                                    <div className="fw-bolder">
                                                        Flight : <strong>{selectedFlight.airLines}</strong>
                                                    </div>
                                                </CardText>
                                                    
                                                <CardText style={{float: "right"}}>
                                                        <div className="fw-bolder">
                                                            Age : <strong>{booking.age}</strong>
                                                        </div>
                                                        <div className="fw-bolder">
                                                            Mobile Number : <strong>{booking.mobileNumber}</strong>
                                                        </div>
                                                        <div className="fw-bolder">
                                                            Class : <strong>{selectedCabin.classType}</strong>
                                                        </div>
                                                        
                                                </CardText>
                                            </CardBody>

                                            <div style={{display:"inline-block", marginBottom:"2rem"}}>  
                                                <button className="btn btn-success" style={{width:"10rem"}} onClick={handleEdit} value={booking.firstName+booking.lastName}>Edit details</button>
                                                <button className="btn btn-danger" style={{width:"11rem", marginLeft:"2rem"}} onClick={handleRemove} value={booking.firstName+booking.lastName}>Remove Passenger</button>
                                            </div>
                                            
                                        </Card>
                                    </div>
                                )
                            )}
                            <button className="btn btn-warning bt mb-3" onClick={handleBooking}>Book Tickets</button>
                        </div>
                        
                    )}

                    <div className="container bookingpage">
                    <Card style={{ width: '45rem', height:'40rem', padding:'20px'}} className="card">
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title className="cardtitle">Add Passengers</Card.Title>
                            <Card.Text>
                                <p>***Name should be same as in Government ID proof***</p>
                                <div>
                                <label>Passenger type :</label>
                                <select name="passengerType" 
                                        type="text" 
                                        value={bookingDetails.passengerType} 
                                        required="required"
                                        style={{width:"10rem", height:"2rem"}}
                                        onChange={handleInputChange}>
                                            <option value="">Select Passenger type</option>
                                            <option value="Adult">Adult</option>
                                            <option value="Child">Child</option>
                                            <option value="Infant">Infant</option>
                                </select>
                                </div>
                                


                                <label>First Name: </label>
                                <input type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        value = {bookingDetails.firstName}
                                        onChange={handleInputChange}/>
                                        { errors.firstName && <div className="invalid-feedback">{errors.firstName}</div> }
                                <label>Last Name:</label>
                                <input type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        value = {bookingDetails.lastName}
                                        onChange={handleInputChange}/>
                                        { errors.lastName && <div className="invalid-feedback">{errors.lastName}</div> }
                            </Card.Text>
                            <Card.Text>
                                <label>Gender :</label>
                                <select name="gender" 
                                        type="text" 
                                        value={bookingDetails.gender} 
                                        required="required"
                                        style={{width:"10rem", height:"2rem"}}
                                        onChange={handleInputChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Others">Others</option>
                                </select>
                                
                        
                                <label>Age:</label>
                                <input  
                                    name="age"
                                    type="number"
                                    placeholder="Age"
                                    className={` ${errors.age ? 'is-invalid' : ''}`}
                                    value = {bookingDetails.age} required='required'   onChange={handleInputChange}/>
                                    {errors.age && <div className="invalid-feedback ms-1">{errors.age}</div>}
                            </Card.Text>

                            <Card.Text>
                                <label>Email :</label>
                                <input type = "email"
                                        placeholder = "Enter email Id"
                                        name = "email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        // className={`form-control `}
                                        value = {bookingDetails.email}
                                        onChange={handleInputChange}/>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                                <label className="ph">Mobile number : </label>
                                    <input type = "text"
                                    name = "mobileNumber"
                                    required='required'
                                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                                    value = {bookingDetails.mobileNumber} placeholder="Enter phone number"
                                    onChange={handleInputChange}/>
                                    { errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div> }
                                                    
                                <button className="btn btn-primary bt savenext m-3" onClick={handleSave}>Add Passenger</button>
                                
                            </Card.Text>
                            {/* <Button variant="primary">Save and Add</Button> */}
                        </Card.Body>
                    </Card>
                    </div>
                </center>
            </div> 
    )
}