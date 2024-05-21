import SearchFlight from "./SearchFlight"
import { useAppContext } from "./contextApi/AppContext"

export default function UserHome(){

    const appContext = useAppContext()

    const {user} = appContext

    return (
        <div>
            <div>
                <center className="m-5">
                    <h1 style={{color:"olivegreen"}}>Welcome to FlightBooking </h1>
                    <p>✈️Book a Ticket and just Leave!✈️</p>
                </center>
                <SearchFlight/>
            </div>
        </div>
    )
}