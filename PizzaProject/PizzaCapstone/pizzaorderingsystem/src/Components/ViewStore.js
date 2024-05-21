import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './ViewStoreStyle.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function ViewStore() {
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/viewStore")
            .then((response) => {
                setStores(response.data);
            });
    }, []);

    const handleDelete = (storeId) => {
        axios.post(`http://localhost:8080/deleteStore/${storeId}`)
            .then((res) => {
                if (res.data === "Successfull") {
                    alert("Do you want to really delete");

                    setStores((prevStoreDetails) =>
                        prevStoreDetails.filter((store) => store.storeId !== storeId)
                    );

                } else {
                    alert("Delete failed");
                }
            })
            .catch((error) => {
                console.error("Error deleting store:", error);

            });

    };



    return (
        <div>
            <div className="image">
                <nav className="navbar">
                    <Link to="/">Home</Link>

                    <Link to="/addStore">Add Store</Link>
                    <Link to="/viewFood">Food Details</Link>
                </nav>

                <h2 className='text-center'>Stores List</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Store Id</th>
                            <th>Store Name</th>
                            <th>Place</th>
                            <th>Locality</th>
                            <th>State</th>
                            <th>Phone Number</th>
                            <th>Modify Store</th>
                            <th>Delete Store</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store, index) => (
                            <tr key={index}>
                                <td>{store.storeId}</td>
                                <td>{store.storeName}</td>
                                <td>{store.storePlace}</td>
                                <td>{store.storeLocality}</td>
                                <td>{store.storeState}</td>
                                <td>{store.storeNumber}</td>

                                <td><button className="btn btn-primary" onClick={(e) => navigate("/modifyStore/" + store.storeId)}>Modify</button></td>


                                <td><button onClick={() => handleDelete(store.storeId)}>Delete</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewStore;