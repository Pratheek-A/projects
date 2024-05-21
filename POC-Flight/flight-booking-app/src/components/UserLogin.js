import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useAppContext } from './contextApi/AppContext';
import { useNavigate } from 'react-router';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserLogin(){

    const appContext = useAppContext()
    const {login, loggedInUser, message, setMessage} = appContext

    const navigate = useNavigate()

    const [userCredentials, setUserCredentials] = useState({
        userEmail: "",
        password: ""
    })

    function handleChange(event){
        setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value});
    }

    async function handleSubmit(event){
        event.preventDefault()
        const response = await login(userCredentials)

        if(response.status==200){
            // console.log(loggedInUser)
            alert("Welcome to Flight booking app")
            navigate("/")
        }else{
            setMessage("Invalid Credentials")
        }
    }

    return(
        <div>
            <Container className="mt-5">
                <center className="m-5">
                    <h1>User Login</h1>
                </center>
                <Row className='justify-content-center'>
                    <Col md={4}>
                        <center>
                            {message && (
                                <div class="alert alert-danger" style={{width: "100%"}}>
                                    {message}
                                </div>
                            )}
                        </center>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email" 
                                placeholder="Enter Email" 
                                name="userEmail" 
                                value={userCredentials.userEmail}
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={userCredentials.password}
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                            <div className='d-grid'>
                                <Button variant='primary' type='submit'>
                                    Login
                                </Button>
                            </div>
                        </Form>
                        <center>
                            <p className='m-3'>New to the website? <Nav.Link as={Link} to="/userRegister" style={{color:"#0056b3"}}>Register Here</Nav.Link></p>
                        </center>
                        
                    </Col>
                    
                </Row>
                
            </Container>
        </div> 
        
    )
}