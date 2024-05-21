import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { checkAdmin } from './api/AdminServiceApi';
import { adminJwtAuthenticationService, jwtAuthenticationService } from './api/AuthenticationApiService';
import { useNavigate } from 'react-router';
import { useAppContext } from './contextApi/AppContext';

export default function AdminLogin(){

    const navigate = useNavigate()
    const appContext = useAppContext()
    const {adminLogin} = appContext

    const [adminCredentials, setAdminCredentials] = useState({
        email: "",
        //email:"",
        password: "",
      });

    function handleChange(event){
        setAdminCredentials({...adminCredentials, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        const response = await adminLogin(adminCredentials)
        if(response.status==200){
            alert("Welcome Admin!")
            navigate("/admin/home")
        }else{
            console.log(response)
        }
    }

    return(
        <div>
            <Container>
                <center className="m-5">
                    <h1>Admin Login</h1>
                </center>

                <Row className="justify-content-center">
                    <Col md={4}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Admin Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Admin Email"
                                    name="email"
                                    value={adminCredentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>


                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                value={admin.email}
                                onChange={handleChange}
                            />
                            </Form.Group> */}


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={adminCredentials.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}