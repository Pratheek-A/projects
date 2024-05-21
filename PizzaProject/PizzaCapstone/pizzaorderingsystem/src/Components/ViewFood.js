import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import FoodDetails from "./FoodDetails";
import './ViewFoodStyle.css';


function ViewFood() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/viewFood")
      .then((response) => {
        setFoods(response.data);
      });
  }, []);

  const handleDelete = (foodId) => {

    axios.post(`http://localhost:8080/deleteFood/${foodId}`)
      .then((res) => {
        if (res.data === "Successfull") {
            alert("Do you want to really delete");

          setFoods((prevStoreDetails) =>
            prevStoreDetails.filter((food) => food.foodId !== foodId)
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
         <nav className="navbar">
                   <Link to="/">Home</Link>   
                   <Link to="/addFood">AddFood</Link>   
                    
               </nav>
     
               <h2 className='text-center'>Food List</h2>
               <table className="table table-striped">
        <thead>
          <tr>
            <td>Food Id</td>
            <td>Food Name</td>
            <td>Food Price</td>
            <td>Store name</td>
            <td>Store Id</td> 
            <td>Modify Food</td>  
            <td>Delete Food</td> 
          </tr>
        </thead>
        <tbody>
          {
            foods.map((food) => (
              <tr key={food.foodId}>
                <td>{food.foodId}</td>
                <td>{food.foodName}</td>
                <td>{food.foodPrice}</td>
                <td>{food.storeName}</td>  
                <td>{food.store.storeId}</td>
                <td>
                  <button onClick={() => navigate("/modifyFood/" + food.foodId)}>Modify</button>
                </td>
                
                <td><button onClick={() => handleDelete(food.foodId)}>Delete</button></td>
                
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ViewFood;
