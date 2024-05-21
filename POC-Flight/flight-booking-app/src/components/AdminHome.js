import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminHome(){
    return(
        <div>
            <center className="mt-5">
                <h1>Welcome Admin!</h1>
            </center>

            <div>
                <center>
                    <div>
                        <div className="mt-5">
                            <button className="btn btn-primary" style={{width:"15rem", padding:"1rem"}}>
                                <Nav.Link as={Link} to="/admin/totalFlights">Total Flights</Nav.Link>
                            </button>
                        </div>
                        
                        <div className="mt-5">
                            <button className="btn btn-primary" style={{width:"15rem", padding:"1rem"}}>
                                <Nav.Link as={Link} to="/admin/totalBookings">Total Bookings</Nav.Link>
                            </button>
                        </div>

                        <div className="mt-5">
                            <button className="btn btn-primary" style={{width:"15rem", padding:"1rem"}}>
                                <Nav.Link as={Link} to="/admin/addFlight">Add New Flight Details</Nav.Link>
                            </button>
                        </div>
                        
                        <div className="mt-5">
                            <button className="btn btn-primary" style={{width:"15rem", padding:"1rem"}}>
                                <Nav.Link as={Link} to="/admin/cancellations">Cancellation Requests</Nav.Link>
                            </button>
                        </div>
                        
                        <div className="mt-5">
                            <button className="btn btn-primary" style={{width:"15rem", padding:"1rem"}}>
                                <Nav.Link as={Link} to="/admin/messages">Messages / Comaplains</Nav.Link>
                            </button>
                        </div>
                        
                    </div>
                </center>
            </div>
        </div>
    )
}