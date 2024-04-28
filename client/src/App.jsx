import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.page';
import TopNavBar from './components/topNavBar.component';
import BottomNavBar from './components/bottomNavBar.component';
import SellPropertyForm from './pages/sellProperty.page';
import Auth from './pages/userAuth.page'


export default function App() {
  return (
    <>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellProperty" element={<SellPropertyForm />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <BottomNavBar />
    </>
  )
}