import axios from "axios";
import { Card,CardBody,CardSubtitle,CardText,Button, Container } from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Course=({course,update})=>{

    const deleteCourse=(id)=>{
        axios.delete(`${base_url}/courses/${id}`).then(
            (response)=>{
                console.log(response.data);
                toast.success("Course deleted");
                update(id);
            },
            (error)=>{
                toast.error("Course not deleted");
            }
        );
    };

    const navigate = useNavigate();
    
    const updateCourse=(id)=>{
        navigate(`/updateCourse/${id}`);       
    }
    
    return(
        <div>
            <Card>
                <CardBody className="text-center">
                    <CardSubtitle className="font-weight-bold">{course.title}</CardSubtitle>
                    <CardText>{course.description}</CardText>
                    <Container>
                        <Button color="danger" onClick={()=>{deleteCourse(course.id);}}>Delete</Button>{'   '}
                        <Button color="success ml-3" onClick={()=>{updateCourse(course.id);}}>Update</Button>
                    </Container>
                </CardBody>
            </Card>
        </div>
    )
};

export default Course;

