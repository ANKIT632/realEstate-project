import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home.page';
import TopNavBar from './components/topNavBar.component';

import SellPropertyForm from './pages/sellPropertyForm.page';
import Auth from './pages/userAuth.page';
import Foter from './components/foter.component'

import BottomNavbar from './components/bottomNavbar.component'
import AllDeals from './pages/allDeals.page';

const LocalDataContext = React.createContext({});

export default function App() {

  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('user_data'));
    let token = JSON.parse(localStorage.getItem('access_token'));
    setAccessToken(token);
    setUserData(data);
  },[])

  return (
    <div className='bg-gray-100'>
    <LocalDataContext.Provider value={{userData,accessToken}}>
      <TopNavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellProperty" element={<SellPropertyForm />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/allDeals' element={<AllDeals/>}/>
      </Routes>

      <Foter />
      <BottomNavbar />
      </LocalDataContext.Provider>
    </div>
  )
}