import React, { useState, useEffect } from "react";
import Course from "./Course";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from 'react-toastify';

const Allcourses=()=>{

    useEffect(()=>{
        document.title="All Courses";
    },[]);

    useEffect(()=>{
        getAllcoursesFromServer();
    },[]);

    const getAllcoursesFromServer=()=>{
        axios.get(`${base_url}/courses`).then(
            (response)=>{
                //console.log(response.data);
                //toast.success("Courses has been loaded",{position:"bottom-center"});
                setCourses(response.data);
            },
            (error)=>{
                //console.log(error.data);
                toast.error("Something went wrong",{position:"bottom-center"})
            }
        );
    };
    const[courses,setCourses]=useState([
        // {title:"Java course",description:"This is a Java course"},
        // {title:"Python course",description:"This is a Python course"},
        // {title:"ReactJs course",description:"This is a ReactJs course"}
    ])

    const updateCourses=(id)=>{
        setCourses(courses.filter((c)=>c.id!==id));
    }
    return(
        <div>
            <h1>All Courses</h1>
            <p>List of courses are as follows</p>
            {
                courses.length>0?courses.map((item)=> (<Course key={item.id} course={item} update={updateCourses}/>)):"No courses"
            }
        </div>
    );
}

export default Allcourses;