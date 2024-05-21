import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ModifyStoreStyle.css';
import { Link } from "react-router-dom";

function ModifyStore() {
  const { storeId } = useParams(); 
  const [store, setStore] = useState({
    storeName: "",
    storePlace: "",
    storeLocality: "",
    storeState: "",
    storeNumber: "",
  });

  const { storeName, storePlace, storeLocality, storeState, storeNumber } = store;
  const changeHandler = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getStoreDetails/${storeId}` 
        );

        const storeDetails = response.data; 

        if (storeDetails) {
          setStore({ ...store, ...storeDetails });
        } else {
          console.log(response);
          alert("Store Id does not exist");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert("Error occurred. Please try again later.");
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:8080/modifyStore`,
          store,
          {
            headers: {
              "Content-type": "application/json",
            },
            params: {
              storeId: storeId,
            },
          }
        );

        if (response.data === "Successfull") {
          navigate("/viewStore");
        } else {
          console.log(response);
          alert("Error occurred while updating store");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert("Error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="back">
       <nav className="navbar3">
        <Link to="/">Home</Link>
      </nav>
      <h3>Modify Store Details</h3>
    <div className="store-details-container">
     

     
      <div>
        <form onSubmit={submitHandler} className="store-details-form">
          <div className="form-group">
            <label htmlFor="storeName">Store Name:</label>
            <input
              type="text"
              name="storeName"
              id="storeName"
              onChange={changeHandler}
              value={storeName}
            />
            {errors.storeName && <div className="error">{errors.storeName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="storePlace">Store Place:</label>
            <input
              type="text"
              name="storePlace"
              id="storePlace"
              onChange={changeHandler}
              value={storePlace}
            />
            {errors.storePlace && <div className="error">{errors.storePlace}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="storeLocality">Store Locality:</label>
            <input
              type="text"
              name="storeLocality"
              id="storeLocality"
              onChange={changeHandler}
              value={storeLocality}
            />
            {errors.storeLocality && (
              <div className="error">{errors.storeLocality}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="storeState">Store State:</label>
            <input
              type="text"
              name="storeState"
              id="storeState"
              onChange={changeHandler}
              value={storeState}
            />
            {errors.storeState && <div className="error">{errors.storeState}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="storeNumber">Store Number:</label>
            <input
              type="number"
              name="storeNumber"
              id="storeNumber"
              onChange={changeHandler}
              value={storeNumber}
            />
            {errors.storeNumber && <div className="error">{errors.storeNumber}</div>}
          </div>
          <button type="submit">Update</button>
        </form>
        <button>
          <Link to="/viewStore">Cancel</Link>
        </button>
      </div>
    </div>
    <nav className="navs">
       
      </nav>
    </div>
  );
}

export default ModifyStore;
