import { useEffect } from "react"
import SearchFlight from "./SearchFlight"
import { useAppContext } from "./contextApi/AppContext"
import { useHistory } from 'react-router-dom';

export default function Home(){

    const appContext = useAppContext()
    const {setSearchedFlights, isLoggedIn, setLoggedInUser, loggedInUser} = appContext

    //const loggedInUser = null;
    
    useEffect(() => {
        setSearchedFlights([])
    }, [])

    return (
        <div>
            <div>
                <center className="m-5">
                    <h1 style={{color:"olivegreen"}}>Welcome to FlightBooking</h1>
                    {loggedInUser && <h3>Welcome {loggedInUser.userFirstName} {loggedInUser.userLastName}</h3>}
                    <p>✈️Book a Ticket and just Leave!✈️</p>
                </center>
                <SearchFlight/>
            </div>
        </div>
    )
}