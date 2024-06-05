import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDataContext from './context/userContext';
import Home from './pages/home.page';
import TopNavBar from './components/topNavBar.component';
import SellPropertyForm from './pages/sellPropertyForm.page';
import Auth from './pages/userAuth.page';
import BottomNavbar from './components/bottomNavbar.component';
import AllDeals from './pages/allDeals.page';
import { getSession } from './localSession/authSession';
import Favourite from './pages/favourite.page';
import Setting from './pages/setting.page';
import SellTrack from './pages/sellTrack';
import BuyTrack from './pages/buyTrack.page';
import Profile from './pages/profile.page';

export default function App() {

  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState('');
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const id = getSession('user_data');
    if (id.length > 0) {
      setIsAuthenticated(true);
      setUserData(getSession('user_data'));
      setAccessToken(getSession('access_token'));
      setUserId(getSession('userId'));
    }


  }, []);

  return (
    <div className='bg-gray-100 '>
      <UserDataContext.Provider value={{ userData, setUserData, accessToken, setAccessToken, searchQuery, setSearchQuery, userId, setUserId, searchBoxVisibility, setSearchBoxVisibility, setIsAuthenticated, isAuthenticated }}>
        <TopNavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sellProperty" element={<SellPropertyForm />} />

          <Route path="*" element={<h1 className='h-[95vh] text-center font-mono'>404 Not Found</h1>} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/allDeals' element={<AllDeals />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/setting/:userId' element={<Setting />} />

          <Route path='/sellTrack' element={<SellTrack />} />
          <Route path='/buyTrack' element={<BuyTrack />} />
          <Route path='/userProfile/:userId' element={<Profile />} />
        </Routes>


        <BottomNavbar />
      </UserDataContext.Provider>
    </div>
  )
}