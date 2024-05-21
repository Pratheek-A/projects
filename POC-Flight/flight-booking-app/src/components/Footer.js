import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Footer(){
    return (
        <footer className="footer-container">
                <div>
                    <p style={marginStyle}><strong>Contact Us</strong></p>
                    <p style={marginStyle}>Email : flightbooking78@gmail.com</p>
                    <p style={marginStyle}>Phone : +91 22 0423 5678</p>
                </div>
                <div>
                    <p style={marginStyle}><strong>Feedback</strong></p>
                    <p style={marginStyle}>
                        <Nav.Link as={Link} to="/sendMessage" style={{textDecoration:"underline"}}>
                            Share your feedback/ Raise concern
                        </Nav.Link>
                    </p>

                    <p style={{position: "fixed", bottom:"0", margin:"0"}}>Copyright © 2024</p>
                </div>
                <div>
                    <p style={marginStyle}>Follow</p>
                    <p style={marginStyle}>Facebook</p>
                    <p style={marginStyle}>Instagram</p>
                    <p style={marginStyle}>Twitter</p>
                </div>
        </footer>
    )
}

const marginStyle = {
    margin: "0"
}
