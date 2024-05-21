import React, { useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function ModifyFood() {
  const { foodId }=useParams();
  
  
  const [food, setFood] = useState({
    
    foodName: '',
    foodPrice: '',
    
  });
  const {foodName,foodPrice}=food
  const changeHandler = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  

  const navigate = useNavigate();


  useEffect(() => {
    
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getFoodDetails/${foodId}` 
        );

        const foodDetails = response.data; 

        if (foodDetails) {
          setFood({ ...food, ...foodDetails });
        } else {
          console.log(response);
          alert("Food Id does not exist");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert("Error occurred. Please try again later.");
      }
    };

    fetchStoreDetails();
  }, [foodId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    
      axios.post("http://localhost:8080/modifyFood", food, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          
          foodId: foodId
        }
      }).then((response) => {
        if (response.data === "Successfull") {
          navigate("/viewFood");
        }
      });
    };

  return (
    <div>
        <h1>Update Food Details</h1>
      <form onSubmit={submitHandler}>
        Food Id: <input type="number" name="foodId" value={foodId} onChange={changeHandler} readOnly/><br />
        Food Name: <input type="text" name="foodName" value={foodName} onChange={changeHandler} /><br />
        Food Price: <input type="text" name="foodPrice" value={foodPrice} onChange={changeHandler} /><br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ModifyFood;