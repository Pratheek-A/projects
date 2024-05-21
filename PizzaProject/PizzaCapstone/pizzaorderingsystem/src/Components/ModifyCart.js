import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import './ModifyCartStyle.css';

function ModifyCart() {
  const [quantity, setQuantity] = useState('');
  const { cartId } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getQuantity/${cartId}` 
        );

        const quant = response.data.quantity; 
           
        if (quant!==undefined) {
          setQuantity(quant);
        } else {
          console.log(response);
          alert("Food Id does not exist");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert("Error occurred. Please try again later.");
      }
    };

    fetchCartDetails();
  }, [cartId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/modifyCart", null, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        quantity: quantity,
        cartId: cartId
      }
    }).then((response) => {
      if (response.data === "Successfull") {
        navigate("/userViewCart");
      }
    });
  };

 

  return (
    <div>
       <nav className="navbar3">
                   <Link to="/">Home</Link>   
                    
               </nav>
    <div className="modify">
      <h1>Update Cart Details</h1>
      <form onSubmit={handleSubmit}>
        Edit Quantity: <input type="number" name="quantity" value={quantity} onChange={changeHandler} min={1}required /><br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/userViewCart">Cancel</Link>
    </div>
    </div>
  );
}

export default ModifyCart;
