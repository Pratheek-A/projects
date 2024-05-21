import { useEffect, useState } from "react"
import { getFeedbacks, replyFeedbacks } from "./api/AdminServiceApi"

export default function Messages(){

    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        getAllFeedbacks()
    }, [])

    const getAllFeedbacks = async () => {
        try{
            const response = await getFeedbacks()
            setFeedbacks(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const feedbacksByUser = {}
    feedbacks.forEach(feedback => {
        const userId = feedback.user.userId
        if(!feedbacksByUser[userId]){
            feedbacksByUser[userId] = []
        }

        feedbacksByUser[userId].push(feedback)
    })



    const handleReply = async (event, userId) => {
        event.preventDefault()
        try{
            const response = await replyFeedbacks(userId)
            if(response.status == 200){
                alert(response.data)
            }
        }catch(error){  
            console.log(error)
        }
    }

    return (
        <div>
            <center className="mt-5">
                <h1 className="mt-5">Messages</h1>
            </center>

            <div className="mt-5">
                <center>
                    {
                        feedbacks.length>0 ? (
                            <div>
                            <table className="table table-striped">
                                <thead>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Feedbacks</th>
                                    {/* <th>Reply</th> */}
                                </thead>
                                
                                <tbody>
                                    {feedbacks.map(
                                        currentFeedback => (
                                            <tr key={currentFeedback.feedbackId}>
                                                <td>{currentFeedback.user.userFirstName} {currentFeedback.user.userLastName}</td>
                                                <td>{currentFeedback.user.userEmail}</td>
                                                <td>{currentFeedback.user.usermobileNumber}</td>
                                                <td>{currentFeedback.feedback}</td>
                                                {/* <td>
                                                    <button className="btn btn-success" onClick={(event) => handleReply(event,currentFeedback.user.userId)}>
                                                        Reply
                                                    </button>
                                                </td> */}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>

                            {/* <table className="table table-striped"> 
                                <thead>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Feedbacks</th>
                                </thead>
                                
                                <tbody>
                                    {Object.keys(feedbacksByUser).map(
                                        userId => (
                                            <tr key={userId}>
                                                {feedbacksByUser[userId].map(
                                                    currentFeedback => (
                                                        <tr>
                                                            <td>{currentFeedback.user.userFirstName}</td>
                                                        </tr>
                                                    )
                                                    
                                                    
                                                )}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table> */}

                            {/* {Object.keys(feedbacksByUser).map(
                                userId => (
                                    <div key={userId}>
                                        <table className="table table-striped">
                                            <thead>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Mobile Number</th>
                                                <th>Feedbacks</th>
                                            </thead>

                                            <tbody>
                                                {feedbacksByUser[userId].map(
                                                    currentFeedback => (
                                                        <tr key={currentFeedback.feedbackId}>
                                                            <td>{currentFeedback.user.userFirstName}</td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            )} */}
                            </div>
                        ):(
                            <div className="alert alert-warn">
                                <h3>No feedbacks</h3>
                            </div>
                        )
                        }
                </center>       
            </div>
            
        </div>
    )
}