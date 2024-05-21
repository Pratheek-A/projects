import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function DeleteCart() {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8080/deleteCart", null, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          cartId: cartId
        }
      })
      .then((response) => {
        if (response.data === "Successfull") {
          navigate("/userViewCart");
        }
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
        
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, [cartId, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      
    </div>
  );
}

export default DeleteCart;
