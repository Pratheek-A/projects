import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddStoreStyle.css";

function StoreDetails() {
    const [store, setStore] = useState({
        storeName: '',
        storePlace: '',
        storeLocality: '',
        storeState: '',
        storeNumber: ''
    });

    const { storeName, storePlace, storeLocality, storeState, storeNumber } = store;


    const changeHandler = (e) => {
        setStore({
            ...store,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!storeName) {
            errors.storeName = 'Store Name is required';
        } else if (/\d/.test(storeName)) {
            errors.storeName = 'Store Name is Invalid';
        }

        if (!storePlace) {
            errors.storePlace = 'Place is required';
        }

        if (!storeLocality) {
            errors.storeLocality = 'Store Locality is required';
        }

        if (!storeNumber) {
            errors.storeNumber = 'Store Phone Number is required';
        } else if (!/^\d{10}$/.test(storeNumber)) {
            errors.storeNumber = 'Mobile Number must be 10 digits';
        }

        if (!storeState) {
            errors.storeState = 'State is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            alert("Do you want to add the store")
            try {
                const response = await axios.post('http://localhost:8080/addStore', store, {
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                if (response.data === 'Successfull') {
                    navigate("/viewStore");
                } else {
                    console.log(response);
                    alert('Adding store details was not successful');
                }
            } catch (error) {
                alert('An error occurred. Please try again later');
            }
        }
    }

    return (

        <div>
            <nav className="navbar2">
                <Link to="/">Home</Link>
            </nav>
            <h1>Add Store</h1>
            <div className="store-details-container">

                <form onSubmit={submitHandler} className="store-details-form">

                    <div className="form-group">
                        <label htmlFor="storeName">Store Name:</label>
                        <input type="text" name="storeName" id="storeName" onChange={changeHandler} value={storeName} />
                        {errors.storeName && <div className="error">{errors.storeName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="storePlace">Store Place:</label>
                        <input type="text" name="storePlace" id="storePlace" onChange={changeHandler} value={storePlace} />
                        {errors.storePlace && <div className="error">{errors.storePlace}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeLocality">Store Locality:</label>
                        <input type="text" name="storeLocality" id="storeLocality" onChange={changeHandler} value={storeLocality} />
                        {errors.storeLocality && <div className="error">{errors.storeLocality}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeState">Store State:</label>
                        <input type="text" name="storeState" id="storeState" onChange={changeHandler} value={storeState} />
                        {errors.storeState && <div className="error">{errors.storeState}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeNumber">Store Number:</label>
                        <input type="number" name="storeNumber" id="storeNumber" onChange={changeHandler} value={storeNumber} />
                        {errors.storeNumber && <div className="error">{errors.storeNumber}</div>}
                    </div>

                    <button type="submit">Add</button>
                    <br></br>
                    <button type="submit"><Link to="/viewStore">Cancel</Link></button>
                </form>

            </div>
        </div>
    )
}

export default StoreDetails;
