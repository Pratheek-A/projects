import { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useAppContext } from "./contextApi/AppContext"
import { useNavigate } from "react-router"

export default function OtpPage(){

    const [otp, setOtp] = useState("")
    const [otpMessage, setOtpMessage] = useState("")

    const appContext = useAppContext()
    const {register, user, sendEmailVerification} = appContext

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setOtp(event.target.value)
    }

    const handleRegister = async (event) => {
        event.preventDefault()

        const responseStatus = await register(user, otp)
        if(responseStatus==200){
            alert("Registration successful")
            navigate("/userLogin")
        }else{
            setOtpMessage("Invalid Otp")
        }
    }

    const handleOtpGeneration = async(event) => {
        event.preventDefault()
        alert("Otp will be sent to your registered email")
        sendEmailVerification(user.userEmail)

        setOtpMessage("")
        setOtp("")
        navigate("/sendOtp")
    }

    return (
        <div>
            <center>
                {otpMessage && (
                    <div class="alert alert-danger" style={{width: "100%"}}>
                        {otpMessage}
                        <button onClick={handleOtpGeneration}>Send Otp again</button>
                    </div>
                )}
                <Form onSubmit={handleRegister} className="mt-4" style={{width:"50%"}}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label><strong><em>Enter your otp here</em></strong></Form.Label>
                    <Form.Control
                        type="text"
                        name="otp"
                        value={otp}
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <div className='d-grid'>
                    <Button variant='primary' type='submit'>
                        Register
                    </Button>
                </div>
            </Form>
            </center>

            
        </div>
    )
}