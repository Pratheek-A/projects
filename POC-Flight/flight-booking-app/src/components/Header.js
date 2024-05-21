import React from 'react'
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useAppContext } from './contextApi/AppContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export default function Header(){

    const appContext = useAppContext()
    const {getAccessTokenStatus, logout, setMessage, loggedInUser, isAdmin, adminLogout} = appContext

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        alert("You are successfully logged out!")
        setMessage("")
        navigate("/")
    }

    const handleAdminLogout = () => {
        adminLogout()
    }

    return (
        // bg="dark" data-bs-theme="dark"
        <Navbar style={{backgroundColor:"#074790"}} >
            <Container>
                <Navbar.Brand style={{color:"whitesmoke", fontSize:"30px"}} className="navbar-title fw-bold">
                    <Nav.Link as={Link} to= {isAdmin ? "/admin/home": "/"}>
                        FlightBooking
                    </Nav.Link>
                </Navbar.Brand>
                <Nav className="d-flex">
                    {!isAdmin ?(
                        loggedInUser!=null? (
                            <>
                                <Nav.Link as={Link} to="/" style={{color:"whitesmoke"}}>Home</Nav.Link>
                                <Nav.Link as={Link} to="/flights/bookings" style={{color:"whitesmoke"}}>My Bookings</Nav.Link>
                                <Nav.Link as={Link} to="/sendMessage" style={{color:"whitesmoke"}}>Feedback</Nav.Link>
                                <Nav.Link as={Link} to="/" style={{color:"whitesmoke"}} onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ):
                        (
                            <>
                                <Nav.Link as={Link} to="/userLogin" style={{color:"whitesmoke"}} className="navbar-list">UserLogin</Nav.Link>
                                <Nav.Link as={Link} to="/userRegister" style={{color:"whitesmoke"}} className="navbar-list">RegisterUser</Nav.Link>
                                <Nav.Link as={Link} to="/adminLogin" style={{color:"whitesmoke"}} className="navbar-list">AdminLogin</Nav.Link>
                            </>
                        )
                    ):(
                        <Nav.Link as={Link} to="/adminLogin" style={{color:"whitesmoke"}} onClick={handleAdminLogout}>Admin Logout</Nav.Link>
                    )
                        
                    }
                    {/* <Nav.Link href="userLogin" style={{color:"whitesmoke"}}>UserLogin</Nav.Link>
                    <Nav.Link href="userRegister" style={{color:"whitesmoke"}}>RegisterUser</Nav.Link>
                    <Nav.Link href="adminLogin" style={{color:"whitesmoke"}}>AdminLogin</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
      );
}