// SearchStore.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './SearchStoreStyle.css';

function SearchStore() {
  const [storePlace, setStorePlace] = useState('');
  const [storeState, setStoreState] = useState('');
  const changeHandler1 = (e) => {
    setStorePlace(e.target.value);
  }

  const changeHandler2 = (e) => {
    setStoreState(e.target.value);
  }

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8080/search';

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl, null, {
        params: {
          storePlace: storePlace,
          storeState: storeState,
        },
      });
      console.log(response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
       
        const storeDataString = encodeURIComponent(JSON.stringify(response.data));
        navigate(`/userViewStore/${storeDataString}`);
      } else {
        console.log(response);
        alert('No Stores available');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Search failed');
    }
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="storePlace">Place:</label>
            <input type="text" id="storePlace" name="storePlace" onChange={changeHandler1} />
          </div>
          <div>
            <label htmlFor="storeState">State:</label>
            <input type="text" id="storeState" name="storeState" onChange={changeHandler2} />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchStore;
