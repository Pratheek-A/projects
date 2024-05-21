import { Card } from "react-bootstrap"
import { useAppContext } from "./contextApi/AppContext"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getBookingApi } from "./api/BookingApi"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export function Ticket(){

    const [booking, setBooking] = useState(null)
    const appContext = useAppContext()
    const {calculateDepartureDateTime, calculateArrivalDateTime} = appContext
    const params = useParams()
    const bookingId = params.bookingId

    console.log(bookingId)
    
    useEffect(()=>{
        async function fetchbookingData(){
            try{
                const response = await getBookingApi(bookingId)
                setBooking(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchbookingData()
    }, [bookingId])

    const pdfRef = useRef()

    const handleDownload = () => {
        const input = pdfRef.current
        if (!input) {
            console.error("PDF reference is null or undefined.");
            return;
        }
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF('p','mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth-imgWidth*ratio)/2
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio)
            pdf.save('ticket.pdf')
        })
    }

    return(
        <div>
        {booking &&
        (<div ref={pdfRef}>
        <center>
            <h1 className="m-5">Flight Ticket</h1>
            <Card style={{width:"70%", backgroundColor:"#003b7b", border:"0px"}} className="mb-3">
                <div className="payment-header">
                    <div className="payment-source-heading">
                        <h5>TakeOff</h5>
                        <hr></hr>
                        <div className="payment-source">
                            <h4><strong>{booking.flight.source}</strong></h4>
                        </div>
                        <div>
                            <h6>{calculateDepartureDateTime(booking.flight.departureDateTime)}</h6>
                        </div>
                        <div className="mt-4">
                            <h6><strong>{booking.cabin.classType}</strong></h6>
                        </div>
                    </div>

                    <div className="payment-destination-heading">
                        <h5>Landing</h5>
                        <hr></hr>
                        <div className="payment-destination">
                            <h4><strong>{booking.flight.destination}</strong></h4>
                        </div>
                        <div>
                            <h6>{calculateArrivalDateTime(booking.flight.departureDateTime, booking.flight.duration)}</h6>
                        </div>
                    </div>

                    <div className="payment-airlines-heading">
                        <h5>Airlines</h5>
                        <hr></hr>
                        <div className="payment-airlines">
                            <h4><strong>{booking.flight.airLines}</strong></h4>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="passenger-info">
                <Card style={{width:"70%", height:"30rem", borderRadius:"0px", border:"0px"}}>
                    <div className="booking-info" style={{position:"relative"}}>
                        {/* <div style={{display:"flex", flexDirection:"column"}}>
                            <div className="passenger-info-row">
                                <div className="field">
                                    <h5><em>Passenger </em></h5>
                                </div>
                                <div><strong>:</strong></div>
                                <div className="value">
                                    <h5><em>{booking.firstName} {booking.lastName} ({booking.passengerType}) ({booking.gender})</em></h5>
                                </div>
                            </div>

                            <div>
                                <h5><em>Age : {booking.age}</em></h5>
                            </div>

                            <div>
                                <h5><em>Ticket Number : {booking.ticket}</em></h5>
                            </div>

                            <div>
                                <h5><em>Transaction Id : {booking.transactionId}</em></h5>
                            </div>

                            <div>
                                <h5><em>Mobile Number : {booking.mobileNumber}</em></h5>
                            </div>

                            <div>
                                <h5><em>Email : {booking.email}</em></h5>
                            </div>

                            <div>
                                <h5><em>Total Price: ₹{booking.totalPrice}</em></h5>
                            </div>
                        </div> */}

                        <div className="mt-5" style={{display:"inline-flex"}}>
                            <div style={{position:"relative", right: "16rem"}}>
                                <div>
                                    <h6><em>Passenger</em></h6>
                                </div>
                                <div>
                                    <h5><em>{booking.firstName} {booking.lastName} ({booking.passengerType}) ({booking.gender})</em></h5>
                                </div>
                            </div>

                            <div style={{position:"relative", left: "9rem"}}>
                                <div>
                                    <h6><em>Age</em></h6>
                                </div>
                                <div>
                                    <h5><em>{booking.age}</em></h5>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className="mt-5" style={{display:"inline-flex"}}>
                            <div style={{position:"relative", right: "12rem"}}>
                                <div>
                                    <h6><em>Mobile Number</em></h6>
                                </div>
                                <div>
                                    <h5><em>{booking.mobileNumber}</em></h5>
                                </div>
                            </div>

                            <div style={{position:"relative", left: "13rem"}}>
                                <div>
                                    <h6><em>Email</em></h6>
                                </div>
                                <div><h5><em>{booking.email}</em></h5></div>
                            </div>
                        </div>
                        
                        <br></br>
                        
                        <div className="mt-5" style={{display:"inline-flex"}}>
                            <div style={{position:"relative", right: "10rem"}}>
                                <div>
                                    <h6><em>Transaction Id</em></h6>
                                </div>
                                <div>
                                    <h5><em>{booking.transactionId}</em></h5>
                                </div>
                            </div>

                            <div style={{position:"relative", right: "2rem"}}>
                                <div>
                                    <h6><em>Ticket Number</em></h6>
                                </div>
                                <div><h5><em>{booking.ticket}</em></h5></div>
                            </div>

                            <div  style={{position:"relative", left: "6rem"}}>
                                <div>
                                    <h6><em>Ticket Price</em></h6>
                                </div>
                                <div><h5><em>₹{booking.totalPrice}</em></h5></div>
                            </div>
                        </div>
                    </div>

                </Card>
            </div>
        </center>
        </div>
        )}
        <center className="m-4">
            <button className="btn btn-primary" onClick={handleDownload}>Download</button>
        </center>
            
        </div>
    )
}