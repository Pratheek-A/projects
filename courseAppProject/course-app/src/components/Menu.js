import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

const Menu=()=>{
    return (
        <div>
            <ListGroup>
                <Link className="list-group-item list-group-item-action" action tag="a" to="/">Home</Link>
                <Link className="list-group-item list-group-item-action" action tag="a" to="/add-course">Add Course</Link>
                <Link className="list-group-item list-group-item-action" action tag="a" to="/view-courses">View Courses</Link>
                <Link className="list-group-item list-group-item-action" action tag="a" to="#">About</Link>
                <Link className="list-group-item list-group-item-action" action tag="a" to="#">Contact</Link>
                  
            </ListGroup>
        </div>
    );
};

export default Menu;