import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import { userRegisterApi } from "./api/UserApi";
import { useAppContext } from "./contextApi/AppContext";
import { useNavigate } from "react-router";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserRegister(){

    const appContext = useAppContext()

    const {user, setUser, register, loggedInUser, sendEmailVerification} = appContext

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleOtpGeneration = (event) => {
        event.preventDefault()
        alert("Otp will be sent to your registered email")

        sendEmailVerification(user.userEmail)

        navigate("/sendOtp")
    }

    return (
        <div>
            <center className="m-4">
                <h1>Register Here!</h1>
                <Form>
                    <Form.Text className="text-muted">
                        Your details are secure with us.
                    </Form.Text>
                </Form>
                
            </center>

            <Row className='justify-content-center'>
                <Col md={4}>
                    <Form onSubmit={handleOtpGeneration}>
                        
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="userFirstName"
                                value={user.userFirstName}
                                required
                                onChange={handleInputChange}
                                placeholder="Enter Firstname"
                            />
                        </Form.Group>
    
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="userLastName"
                                value={user.userLastName}
                                required
                                onChange={handleInputChange}
                                placeholder="Enter Lastname"
                            />
                        </Form.Group>
    
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="userEmail"
                                value={user.userEmail}
                                required
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                            />
                        </Form.Group>
    
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={user.password}
                                required
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                            />
                        </Form.Group>
    
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="usermobileNumber"
                                value={user.usermobileNumber}
                                required
                                onChange={handleInputChange}
                                placeholder="Enter Mobile number"
                            />
                        </Form.Group>
    
                        <div className='d-grid'>
                            <Button variant='primary' type='submit'>
                                Send Otp
                            </Button>
                        </div>
                    </Form>

                    <center>
                        <p style={{marginTop:"4rem"}}>Already had an account? <Nav.Link as={Link} to="/userLogin" style={{color:"#0056b3"}}>Login Here</Nav.Link></p>
                    </center>
                </Col>
            </Row>
        </div>
        
      );
}