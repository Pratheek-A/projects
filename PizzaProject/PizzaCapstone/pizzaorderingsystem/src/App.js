import logo from './logo.svg';
import './App.css';
import User from './Components/User';
import UserLogin from './Components/UserLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import StoreDetails from './Components/StoreDetails';
import ViewStore from './Components/ViewStore';
import ModifyStore from './Components/ModifyStore';
import Home from './Components/Home';
import SearchStore from './Components/SearchStore';
import UserViewStore from './Components/UserViewStore';
import FoodDetails from './Components/FoodDetails';
import ModifyFood from './Components/ModifyFood';
import ViewFood from './Components/ViewFood';
import UserViewFood from './Components/UserViewFood';
import UserViewCart from './Components/UserViewCart';
import ModifyCart from './Components/ModifyCart';
import DeleteCart from './Components/DeleteCart';
import Payment from './Components/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/login' element={<UserLogin />}></Route>
          <Route path='/view' element={<User />}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
          <Route path='/addStore' element={<StoreDetails />}></Route>
          <Route path='/viewStore' element={<ViewStore />}></Route>
          <Route path='/modifyStore/:storeId' element={<ModifyStore />}></Route>

          <Route path="/searchStore" element={<SearchStore />} />
          <Route path="/userViewStore/:storeData" element={<UserViewStore />} />

          <Route path='/addFood' element={<FoodDetails />}></Route>
          <Route path='/modifyFood/:foodId' element={<ModifyFood />}></Route>
          <Route path='/viewFood' element={<ViewFood />}></Route>
          <Route path='/userViewFood/:storeId' element={<UserViewFood />}></Route>
          <Route path='/userViewCart' element={<UserViewCart />}></Route>
          <Route path='/modifyCart/:cartId' element={<ModifyCart />}></Route>
          <Route path='/deleteCart/:cartId' element={<DeleteCart />}></Route>
          <Route path='/payment/:totalCost' element={<Payment />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
