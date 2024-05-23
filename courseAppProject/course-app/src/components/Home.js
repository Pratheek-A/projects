import React, { useEffect } from "react";
import { Container,Button } from "reactstrap";

const Home=()=>{
    useEffect(()=>{
        document.title="Home"
    },[]);
    
    return(
        <div>
            <div className="text-center"> 
                <h1>Hello Learners!!!</h1>
                <p>This is your course app</p>
                <Container>
                    <Button color="primary" outline>Start Using</Button>
                </Container>
            </div>
        </div>
    );
};

export default Home;