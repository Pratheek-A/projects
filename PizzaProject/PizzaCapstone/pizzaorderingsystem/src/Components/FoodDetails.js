import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./AddFoodStyle.css";

function FoodDetails() {

    const [food, setFood] = useState({ foodName: '', foodPrice: '' });
    const [storeId, setStoreId] = useState('');

    const changeHandler = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    }

    const changeHandler1 = (e) => {
        setStoreId(e.target.value);
    }

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/addFood', food, {
                headers: {
                    'Content-type': 'application/json',
                },
                params: {
                    storeId: storeId
                }
            });

            if (response.data === 'Successfull') {
                navigate("/viewFood");
            } else {
                console.log(response);
                alert('Store Id does not exist');
            }
        } catch (error) {
            alert('Error occurred');
        }
    }

    return (
        <div className="food-details-container">
            <h2>Add Food Details</h2>
            <form onSubmit={submitHandler}>
                <label>Food Name:</label>
                <input type="text" name="foodName" onChange={changeHandler} /><br />

                <label>Food Price:</label>
                <input type="text" name="foodPrice" onChange={changeHandler} /><br />

                <label>Store Id:</label>
                <input type="text" name="storeId" onChange={changeHandler1} /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FoodDetails;
