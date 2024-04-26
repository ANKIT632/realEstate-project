import {  Route,Routes } from 'react-router-dom';
import Home from './pages/home.page';
import  TopNavBar from './components/topNavBar.component';
import BottomNavBar from './components/bottomNavBar.component';

import SellPropertyForm from './pages/sellProperty.page';

export default function App() {
  return (
    <>

  <TopNavBar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sellProperty" element={<SellPropertyForm/>}/>
  </Routes>

  <BottomNavBar/>
  </>
  )
}