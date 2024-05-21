import { useState } from "react"
import { useAppContext } from "./contextApi/AppContext"
import { sendFeedback } from "./api/UserApi"

export default function SendMessage(){

    const [feedbackRequest, setFeedbackRequest] = useState({
        feedback : ""
    })

    const appContext = useAppContext()
    const {loggedInUser} = appContext

    const handleFeedbackChange = (event) => {
        event.preventDefault()
        setFeedbackRequest({...feedbackRequest, [event.target.name]: event.target.value})
    }

    const handleSubmit = async () => {
        try{
            const response = await sendFeedback(feedbackRequest, loggedInUser.userId)
            alert(response.data)
            setFeedbackRequest({
                feedback:""
            })
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div>
            <center>
                <h2 className="m-5">Share Feedback / Raise concern</h2>

                <textarea 
                    name="feedback"
                    value={feedbackRequest.feedback}
                    placeholder="Enter your message here"
                    rows={10}
                    cols={130}
                    style={{resize: "none"}}
                    onChange={handleFeedbackChange}
                />
                <br/>
                <button className="btn btn-primary mt-4" onClick={handleSubmit}>Submit</button>
            </center>
        </div>
    )
}