import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams,Link } from "react-router-dom";

function UserViewFood() {
    const { storeId } = useParams();
    const [foods, setFoods] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [userId,setId] = useState('');
    const navigate=useNavigate();

    const addToCart = (foodId) => {
        axios.post(`http://localhost:8080/addToCart/${foodId}`, null, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                quantity: quantity
            }
        })
            .then((response) => {
                
            })
            .catch((error) => {
                console.error('Error fetching food details:', error);
            });

            if(addToCart){
                alert("Added to Cart");
            }
    };
    

    useEffect(() => {
        axios.post("http://localhost:8080/viewAvailableFoods", null, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                storeId: storeId
            }
        }).then((response) => {
            setFoods(response.data);
             
            
        });
    }, [storeId]);

    return (
        <div>
           <nav className="navbar3">
                   <Link to="/">Home</Link>   
                  <Link to="/userViewCart">View Cart</Link>
                  <Link to="/">LogOut</Link> 
               </nav>
            
            <h1 className='text-center'>Available Foods</h1>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <td>Food Name</td>
                        <td>Price Per Pizza</td>
                        <td>Quantity</td>
                        <td>Add to Cart</td>
                        <td>Payment</td>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food.foodId}>
                            <td>{food.foodName}</td>
                            <td>{food.foodPrice}</td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    min={1}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <button onClick={() => addToCart(food.foodId)}>Add</button>
                            </td>
                            
                            <td><button onClick={(e) => navigate("/payment/" + (food.foodPrice*quantity))}>Buy</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserViewFood;
