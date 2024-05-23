import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";


const Addcourse=()=>{

    useEffect(()=>{
        document.title="Add Course";
    },[]);

    const[course, setCourse]=useState({});

    const handleForm=(e)=>{
        e.preventDefault();
        postDataToServer(course); 
    };

    const postDataToServer=(data)=>{
        axios.post(`${base_url}/courses`,data).then(
            (response)=>{
                console.log(response.data);
                toast.success("Course added successfully");
                
            },
            (error)=>{
                console.log(error.data); 
                toast.error("Error in adding course");
            } 
        );
    };

    return (<div>
        <h1>Fill course details</h1>
        <Form onSubmit={handleForm}>
            <FormGroup>
                <Label for="userId">Course Id</Label>
                <Input id="userId" name="userId" placeholder="Enter id here" type="number" 
                onChange={(e)=>{setCourse({...course,id:e.target.value});}} required/>
            </FormGroup>

            <FormGroup>
                <Label for="title">Course Title</Label>
                <Input id="title" placeholder="Enter title here" type="text" 
                onChange={(e)=>{setCourse({...course,title:e.target.value});}} required/>
            </FormGroup>

            <FormGroup>
                <Label for="description">Course Description</Label>
                <Input id="description" placeholder="Enter description here" type="textarea" style={{height:100}} 
                onChange={(e)=>{setCourse({...course,description:e.target.value});}} required/>   
            </FormGroup>

            <Container className="text-center">
                <Button type="submit" color="success">Add Course</Button>
                <Button type="reset" color="warning">Clear</Button>
            </Container>
        </Form>
    </div>
    )
}

export default Addcourse;