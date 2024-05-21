import { useState } from "react"
import { sortFlightsByCostApi, sortFlightsByDurationApi } from "./api/FlightServiceApi"
import { useAppContext } from "./contextApi/AppContext"

export default function Sidebar(cabins){

    const [isOpen, setIsOpen] = useState(false)
    const [sort, setSort] = useState(false)
    const [reverseSort, setReverseSort] = useState(false)

    const appContext = useAppContext()
    const {searchedFlights, depDate, setSearchedFlights} = appContext

    const cabinTypes = ["Economy", "PremiumEconomy", "Business", "First"]

    function toggleCostMenu(){
        setIsOpen(!isOpen)
    }

    function toggleSortMenu(){
        setSort(!sort)
        setReverseSort(false)
    }

    function toggleReverseSortMenu(){
        setReverseSort(!reverseSort)
        setSort(false)
    }

    const handleInputchange = (event) => {
        sortFlightsByCostApi(event.target.name, event.target.value, searchedFlights[0].source, searchedFlights[0].destination, new Date(searchedFlights[0].departureDateTime).toDateString())
        .then((response) => setSearchedFlights(response.data))
        .catch((error) => console.log(error))
    }

    const handleDuration = () => {
        sortFlightsByDurationApi(searchedFlights[0].source, searchedFlights[0].destination, new Date(searchedFlights[0].departureDateTime).toDateString())
        .then((response) => setSearchedFlights(response.data))
        .catch((error) => console.log(error))
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h4 className="fw-light">Filters</h4>
            </div>
            <div className="sidebar-menu-box" style={{width: "60%"}}>
                <ul className="sidebar-menu">
                    <li><a style={{position: "relative", right:"0.7rem"}} onClick={toggleCostMenu}>Cost</a>
                        {
                            <ul className={isOpen ? "submenu open" : "submenu"}>
                                <li><a href="#" onClick={toggleSortMenu}>Low-to-High</a>
                                    <ul className={sort ? "sort-submenu open" : "sort-submenu"}>
                                        {
                                            cabinTypes.map((cabinType, index) => (
                                                <li key={index}>
                                                    <input type="radio" id={cabinType} name="cabinSort" value={cabinType} onClick={handleInputchange}/>
                                                    <label htmlFor={cabinType}>{cabinType}</label>
                                                </li>
                                            )) 
                                        }
                                    </ul>
                                </li>
                                <li><a onClick={toggleReverseSortMenu}>High-to-Low</a>
                                    <ul className={reverseSort ? "sort-submenu open" : "sort-submenu"}>
                                        {
                                            cabinTypes.map((cabinType, index) => (
                                                <li key={index}>
                                                    <input type="radio" id={cabinType} name="cabinReverseSort" value={cabinType} onClick={handleInputchange}/>
                                                    <label htmlFor={cabinType}>{cabinType}</label>
                                                </li>
                                            )) 
                                        }
                                    </ul>
                                </li>
                            </ul>
                        }
                    </li>
                    <li>
                        <a onClick={handleDuration}>
                            Duration
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}


// {
//     (<ul className={sort ? "sort-submenu open" : "sort-submenu"}>
//         <li>
//             <input type="radio" id="economy" name="cabinType" value="Economy"/>
//             <label htmlFor="economy">Economy</label>
//         </li>
//         <li>
//             <input type="radio" id="premiumEconomy" name="cabinType" value="PremiumEconomy"/>
//             <label htmlFor="premiumEconomy">PremiumEconomy</label>
//         </li>
//         <li>
//             <input type="radio" id="business" name="cabinType" value="Business"/>
//             <label htmlFor="business">Business</label>
//         </li>
//         <li>
//             <input type="radio" id="first" name="cabinType" value="First"/>
//             <label htmlFor="first">First</label>
//         </li>
//     </ul>)
// }