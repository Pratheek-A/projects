import {useState } from 'react'
import { useAppContext } from './contextApi/AppContext'
import { searchedFlightsApi } from './api/FlightServiceApi'
import FlightsList from './FlightsList'
import { useNavigate } from 'react-router'

export default function SearchFlight(){

    const navigate = useNavigate()

    const [source, setSource] = useState("")
    const [destination, setDestination] = useState("")
    const [error, setError] = useState("")
    const [departureDate, setDepartureDate] = useState(new Date())

    const appContext = useAppContext()
    const {setSearchedFlights} = appContext
    
    function handleSourceChange(event){
        setSource(event.target.value)
    }

    function handleDestinationChange(event){
        if(source === event.target.value){
            setError("Source and Destination cannot be same!")
        }else{
            setError("")
        }
        setDestination(event.target.value)
    }

    function handleDateChange(departureDate){
        setDepartureDate(departureDate.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        searchedFlightsApi(source,destination,departureDate)
        .then((response) => {
            setSearchedFlights(response.data)
        })
        .catch((error)=>console.log(error))

        // navigate("/flights")
    }

    return( 
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <div className="search-container m-5">
                <select type="text"
                        name="source" 
                        id="source" 
                        value={source}
                        style={{borderRadius:"3px 0px 0px 3px", width: "15rem"}} 
                        onChange={handleSourceChange}
                        placeholder="From">
                        
                        <option  value="">From</option>
                        <option  value="Chennai">Chennai</option>
                        <option  value="Mumbai">Mumbai</option>
                        <option  value="Bengaluru">Bengaluru</option>
                        <option  value="Hyderabad">Hyderabad</option>
                </select>
                        
                <select type="text" 
                        name="destination" 
                        id="destination" 
                        value={destination}
                        style={{width: "15rem"}} 
                        onChange={handleDestinationChange} 
                        placeholder="To"> 
                        
                        <option  value="">To</option>
                        <option  value="Chennai">Chennai</option>
                        <option  value="Mumbai">Mumbai</option>
                        <option  value="Bengaluru">Bengaluru</option>
                        <option  value="Hyderabad">Hyderabad</option>
                </select>

                <input type="date" 
                        name="departureDate" 
                        style={{borderRadius:"0px 3px 3px 0px"}} 
                        onChange={handleDateChange} 
                        id="departureDate"/>

                <button type="submit" 
                        id="search-btn" 
                        className="btn btn-secondary btn-sm">
                            Search
                </button>
            </div>
            </form>

            {error && 
                <center>
                    <div className='alert alert-danger' style={{width:"60%"}}>
                        <h5>{error}</h5>
                    </div>
                </center>
                
            }
            
            <FlightsList/>
        </div>

        
    )
}