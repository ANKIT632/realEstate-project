import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.page';
import TopNavBar from './components/topNavBar.component';

import SellPropertyForm from './pages/sellPropertyForm.page';
import Auth from './pages/userAuth.page';
import Foter from './components/foter.component'

import BottomNavbar from './components/bottomNavbar.component'


export default function App() {
  return (
    <div className='bg-gray-100'>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellProperty" element={<SellPropertyForm />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Foter />
      <BottomNavbar />
    </div>
  )
}