
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";

function UserViewStore() {
  const { storeData } = useParams(); 
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const parsedStoreData = JSON.parse(decodeURIComponent(storeData));

      if (Array.isArray(parsedStoreData) && parsedStoreData.length > 0) {
        setStores(parsedStoreData);
      } else {
        alert('Invalid or empty store data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error parsing store data');
    }
  }, [storeData]);

  return (
    <div>
      <h1 className='text-center'>Stores List</h1>
      <table className="table table-stripped">
        <thead>
          <tr>
            <td>Store Id</td>
            <td>Store Name</td>
            <td>Place</td>
            <td>Locality</td>
            <td>State</td>
            <td>Phone Number</td>
            <th>View Food Items</th>
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
              <td>
                  <button onClick={(e)=> navigate("/userViewFood/"+store.storeId)} >
                    View Food Details
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserViewStore;
