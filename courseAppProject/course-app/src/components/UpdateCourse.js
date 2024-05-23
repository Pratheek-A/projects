import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

const Updatecourse = () => {
    const { id } = useParams();

    useEffect(() => {
        document.title = "Update Course";
        fetchCourseDetails();
    }, []);

    const [course, setCourse] = useState({});

    const fetchCourseDetails = () => {
        axios.get(`${base_url}/courses/${id}`).then(
            (response) => {
                console.log(response.data);
                setCourse(response.data);
            },
            (error) => {
                console.log(error);
                toast.error("Failed to fetch course details");
            }
        );
    };

    const handleForm = (e) => {
        e.preventDefault();
        updateDataToServer(course);
    };

    const updateDataToServer = (data) => {
        axios.put(`${base_url}/courses/${id}`, data).then(
            (response) => {
                console.log(response.data);
                toast.success("Course updated successfully");
            },
            (error) => {
                console.log(error);
                toast.error("Failed to update course");
            }
        );
    };

    return (
        <div>
            <h1>Update Course Details</h1>
            <Form onSubmit={handleForm}>
                <FormGroup>
                    <Label for="title">Course Title</Label>
                    <Input
                        id="title"
                        type="text"
                        value={course.title}
                        onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input
                        id="description"
                        type="textarea"
                        style={{ height: 100 }}
                        value={course.description}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                </FormGroup>
                <Container className="text-center">
                    <Button type="submit" color="success">Update</Button>
                    <Button type="reset" color="warning">Clear</Button>
                </Container>
            </Form>
        </div>
    );
};

export default Updatecourse;
