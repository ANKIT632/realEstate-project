import  { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDataContext from './context/userContext';
import Home from './pages/home.page';
import TopNavBar from './components/topNavBar.component';

import SellPropertyForm from './pages/sellPropertyForm.page';
import Auth from './pages/userAuth.page';


import BottomNavbar from './components/bottomNavbar.component'
import AllDeals from './pages/allDeals.page';
import {getSession} from './localSession/authSession'
import Favourite from './pages/favourite.page';
import Setting from './pages/setting.page';


export default function App() {

  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState({});
  const [searchQuery,setSearchQuery]=useState('');

useEffect(()=>{
 
  setUserData(getSession('user_data'));
  setAccessToken(getSession('access_token'));

},[]);


  return (
    <div className='bg-gray-100'>
    <UserDataContext.Provider value={{ userData, setUserData, accessToken, setAccessToken,searchQuery,setSearchQuery }}>
      <TopNavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellProperty" element={<SellPropertyForm />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/allDeals' element={<AllDeals/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
        <Route path='/setting' element={<Setting/>}/>
      </Routes>

    
      <BottomNavbar />
      </UserDataContext.Provider>
    </div>
  )
}