import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import Header from './components/Header';
import Home from './components/Home';
import Allcourses from './components/Allcourses';
import Addcourse from './components/Addcourse';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UpdateCourse from './components/UpdateCourse';

function App() {

  return (
    <div>
        <Router>
        <ToastContainer/>
        <Container>
          <Header/>
          <Row>
            <Col md={4}><Menu/></Col>
            <Col md={8}>
              <Routes>
                <Route path='/' Component={Home}></Route>
                <Route path='/add-course' Component={Addcourse}></Route>
                <Route path='/view-courses' Component={Allcourses}></Route>
                <Route path='/updateCourse/:id' element={<UpdateCourse/>}></Route>
              </Routes>    
            </Col>
          </Row> 
        </Container>
        </Router>
    </div>
  );
};

export default App;
