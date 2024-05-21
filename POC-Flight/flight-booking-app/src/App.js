import './App.css';
import AdminLogin from './components/AdminLogin';
import BookFlight from './components/BookFlight';
import FlightsList from './components/FlightsList';
import Header from './components/Header';
import Home from './components/Home';
import UserHome from './components/UserHome';
import './components/SearchFlight'
import SearchFlight from './components/SearchFlight';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import { AppContextProvider, useAppContext } from './components/contextApi/AppContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Bookings from './components/Bookings';
import Payment from './components/Payment';
import OtpPage from './components/OtpPage';
import { refreshTokenApi } from './components/api/UserApi';
import { useEffect } from 'react';
import { Ticket } from './components/Ticket';
import AdminHome from './components/AdminHome.js';
import AddFlight from './components/AddFlight.js';
import TotalBookings from './components/TotalBookings.js';
import CancellationRequests from './components/CancellationRequests.js';
import Messages from './components/Messages.js';
import TotalFlights from './components/TotalFlights.js';
import Footer from './components/Footer.js';
import SendMessage from './components/SendMessage.js';



function AuthenticatedRoute({children}){
  const appContext = useAppContext()
  const {loggedInUser} = appContext

  if(loggedInUser!=null){
    return children
  }

  return <Navigate to="/userLogin" />
}

function AdminAuthenticatedRoute({children}){
  const appContext = useAppContext()
  const {isAdmin} = appContext

  if(isAdmin){
    return  children
  }

  return <Navigate to="/userLogin" />
}



function App() {


  return (
    <BrowserRouter>
        <AppContextProvider>
            <Header />
            
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/userLogin" element={<UserLogin/>} />
              <Route path="/userRegister" element={<UserRegister/>} />
              <Route path="/adminLogin" element={<AdminLogin/>}/>
              <Route path="/sendOtp" element={<OtpPage/>}/>
              <Route path="/flights" element={<FlightsList/>} />

              <Route path="/flights/book" element={
                <AuthenticatedRoute>
                  <BookFlight/>
                </AuthenticatedRoute>
                } />
                
              <Route path="/flights/bookings" element={
                <AuthenticatedRoute>
                  <Bookings/>
                </AuthenticatedRoute>
              } />

              <Route path="/flights/payment" element={
                <AuthenticatedRoute>
                  <Payment/>
                </AuthenticatedRoute>
              } />

              <Route path="/flights/ticket/:bookingId" element={
                <AuthenticatedRoute>
                  <Ticket/>
                </AuthenticatedRoute>
              } />

              <Route path="/sendMessage" element={
                <AuthenticatedRoute>
                  <SendMessage/>
                </AuthenticatedRoute>
              } />

              <Route path="/admin/home" element={
                <AdminAuthenticatedRoute>
                  <AdminHome/>
                </AdminAuthenticatedRoute>
              }/> 
              <Route path="/admin/totalFlights" element={
                <AdminAuthenticatedRoute>
                  <TotalFlights/>
                </AdminAuthenticatedRoute>
              }/>
              <Route path="/admin/totalBookings" element={
                <AdminAuthenticatedRoute>
                  <TotalBookings/>
                </AdminAuthenticatedRoute>
              }/>
              <Route path="/admin/addFlight" element={
                <AdminAuthenticatedRoute>
                  <AddFlight/>
                </AdminAuthenticatedRoute>
              }/>
              <Route path="/admin/cancellations" element={
                <AdminAuthenticatedRoute>
                  <CancellationRequests/>
                </AdminAuthenticatedRoute>
              }/>
              <Route path="/admin/messages" element={
                <AdminAuthenticatedRoute>
                  <Messages/>
                </AdminAuthenticatedRoute>
              }/>
              
            </Routes>
        </AppContextProvider>
        
      </BrowserRouter>
     
  );
}

export default App;
