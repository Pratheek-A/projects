import { Card } from "react-bootstrap"
import { useAppContext } from "./contextApi/AppContext"
import { useState } from "react"
import useRazorpay from "react-razorpay";
import { PaymentApi } from "./api/PaymentApi";
import { useNavigate } from "react-router";
import { sendBookingConfirmationMail } from "./api/BookingApi";

export default function Payment(){

    const [Razorpay] = useRazorpay();

    const appContext = useAppContext()

    const navigate = useNavigate()

    const [isChecked, setIsChecked] = useState(false)
    //const [transactionId, setTransactionId] = useState("")

    const rzpKey = process.env.REACT_APP_RAZORPAY_KEY
    console.log(rzpKey)

    const {bookingsList, setBookingsList, 
        selectedFlight, selectedCabin, bookFlight,loggedInUser,
        calculateDepartureDateTime,calculateArrivalDateTime} = appContext

    let adults = 0
    let children = 0
    let infants = 0
    let gst = process.env.REACT_APP_GST

    const totalTicketsPrice = bookingsList.reduce((acc, booking) => {
        if(booking.passengerType === "Adult"){
            adults = adults+1
            return acc + selectedCabin.ticketPrice
        }else if(booking.passengerType === "Child"){
            children = children+1
            return acc + (selectedCabin.ticketPrice * 0.7)
        }else if(booking.passengerType === "Infant"){
            infants = infants+1
            return acc + (selectedCabin.ticketPrice * 0.2)
        }
    }, 0)

    const calculateIndividualTicketPrice = (passengerType, price) => {
        console.log(price)
        if(passengerType == "Adult"){
            return price*process.env.REACT_APP_ADULT_PRICE_PERCENTAGE
        }else if(passengerType === "Child"){
            return price*process.env.REACT_APP_CHILD_PRICE_PERCENTAGE
        }else if(passengerType === "Infant"){
            return price*process.env.REACT_APP_INFANT_PRICE_PERCENTAGE
        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    const handlePayment = async (amount) =>{
        // event.preventDefault()
        const order = createOrder(amount)

        const options = {
            key: "rzp_test_diGfzELBajDWeh",
            currency: 'INR',
            amount: amount*100,
            name: loggedInUser.userFirstName+" "+loggedInUser.userLastName,
            description: "Payment for flight ticket booking",
            order_id: order,
            handler: async function handleBooking(response){
                console.log(response)
                let transactionId = response.razorpay_payment_id
                const updatedBookingsList = bookingsList.map(booking => 
                                                            booking.transactionId = transactionId)
                await setBookingsList(updatedBookingsList)
                
                alert(`Transaction Id : ${response.razorpay_payment_id}`);
                try{
                    const bookingsResponse = await bookFlight(bookingsList)
                    console.log(bookingsResponse)
                    navigate("/flights/bookings")
                }catch(error){
                    console.log(error)
                }
            },
            prefill: {
                name: loggedInUser.userFirstName+" "+loggedInUser.userLastName,
                email: loggedInUser.userEmail,
                contact: loggedInUser.usermobileNumber
            }

        }
        const rzp = new Razorpay(options);

        rzp.on("payment.failed", function(response){
            alert("Payment Failed")
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        })

        rzp.open();
    }

    const createOrder = (amount) => {
        return PaymentApi(amount)
    }
    
    return (
        <div>
            <center>
                <h1 className="m-5" style={{marginBottom:"10rem"}}>Payment</h1>

                <div className="payment-container">
                    <Card style={{width:"70%", backgroundColor:"#003b7b", border:"0px"}} className="mb-3">
                        <div className="payment-header">
                            <div className="payment-source-heading">
                                <h5>TakeOff</h5>
                                <hr></hr>
                                <div className="payment-source">
                                    <h4><strong>{selectedFlight.source}</strong></h4>
                                </div>
                                <div>
                                    <h6>{calculateDepartureDateTime(selectedFlight.departureDateTime)}</h6>
                                </div>
                                <div className="mt-4">
                                    <h6><strong>{selectedCabin.classType}</strong></h6>
                                </div>
                            </div>

                            <div className="payment-destination-heading">
                                <h5>Landing</h5>
                                <hr></hr>
                                <div className="payment-destination">
                                    <h4><strong>{selectedFlight.destination}</strong></h4>
                                </div>
                                <div>
                                    <h6>{calculateArrivalDateTime(selectedFlight.departureDateTime, selectedFlight.duration)}</h6>
                                </div>
                            </div>

                            <div className="payment-airlines-heading">
                                <h5>Airlines</h5>
                                <hr></hr>
                                <div className="payment-airlines">
                                    <h4><strong>{selectedFlight.airLines}</strong></h4>
                                </div>
                            </div>
                            
                        </div>
                        
                    </Card>

                    <div className="passenger-details-container">
                        <Card style={{width:"70%", height:"30rem", borderRadius:"0px", border:"0px"}}>
                            <div className="passengers-types">
                                <h6>
                                    <em>{adults} Adult, {children} Child, {infants} Infant</em>
                                </h6>
                            </div>

                            <div className="booking-info" style={{position:"relative"}}>
                                {
                                    bookingsList.map(booking => (
                                        <div>
                                            <div className="booking-details">
                                                <div className="passenger-details">
                                                    <h5><em>{booking.firstName} {booking.lastName}</em></h5>
                                                    <h5><em>({booking.gender})</em></h5>
                                                    <h5><em>({booking.passengerType})</em></h5>
                                                </div>
                                                
                                                <div className="ticket-price">
                                                    <h5><em>₹{calculateIndividualTicketPrice(booking.passengerType, selectedCabin.ticketPrice)}</em></h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    
                                }

                                <div style={{position:"relative", left:"3rem"}}>
                                    <h5 style={{width:"50%", float:"right"}}><em>GST:₹{gst*totalTicketsPrice}</em></h5>
                                </div>
                                <br></br>
                                <div style={{position:"relative", left: "31rem", top: "3rem"}}>
                                    <h5 style={{width:"50%", float:"right", marginBottom:"2rem"}}><em>Total Ticket Price:₹{totalTicketsPrice + (gst*totalTicketsPrice)}</em></h5>
                                </div>
                                
                            </div>

                            {/* <div style={{position:"absolute", bottom:"2rem", left:"15%"}}>
                                <input className="form-check-input" 
                                        type="checkbox" 
                                        name="freeCancellation" 
                                        checked={isChecked}
                                        value={false} 
                                        onChange={handleCheckboxChange} />

                                <label class="form-check-label" for="flexCheckDefault" style={{fontSize: "20px"}}
                                        onClick={() => console.log(isChecked ? 'true' : 'false')}>
                                    <em>Free Cancellation (You can cancel your flight for free without paying any fee)</em>
                                </label>
                            </div> */}
                        </Card>
                    </div>
                </div>

                <div style={{marginBottom:"10rem", marginTop:"5rem"}}>
                    <button className="btn btn-primary" onClick={() => handlePayment(totalTicketsPrice + (gst*totalTicketsPrice))}>Pay Now</button>
                </div>
            </center>
            
        </div>
    )
}



{/* <center>
            <h1 className="m-5">Payment</h1>

            <div className="payment-container">
                <Card style={{width:"80%"}}>
                    {bookingsList.map(
                        booking => (
                            <div key={booking.lastName}>
                                <Card>
                                    <h3 className="fw-bold">{selectedFlight.airLines}</h3>
                                </Card>
                            </div>
                        )
                    )}
                </Card>
                <button>Make payment</button>
            </div>
        </center> */}