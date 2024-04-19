import {  Route,Routes } from 'react-router-dom';
import Home from './pages/home.page';
import  TopNavBar from './components/topNavBar.component';
import BottomNavBar from './components/bottomNavBar.component';

export default function App() {
  return (
    <>

  <TopNavBar/>
  <Routes>
    <Route path="/" element={<Home/>} />
  </Routes>

  <BottomNavBar/>
  </>
  )
}