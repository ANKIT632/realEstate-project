import { useLocation, useNavigate } from 'react-router-dom'
import { FaUserGear } from "react-icons/fa6";
import { useContext } from 'react';
import UserDataContext from '../context/userContext';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";



function BottomNavbar() {

  const { userId, userData, setSearchBoxVisibility,isAuthenticated } = useContext(UserDataContext);

  const navigate = useNavigate();
  const location=useLocation();

  const handleNavigate = (path) => {
  
    if (!isAuthenticated && (path === '/setting' || path === 'sellTrack' || path === 'buyTrack')) {
      path = '/auth';
    }

    if (path === '/setting') {
      path = `/setting/${userId}`
    }

    navigate(path);
  }


  return (
    <div className="sticky bottom-0 w-full h-8 bg-white border-t-2 border-x-1 border-gray-100 md:hidden z-50 ">
      <div className="w-full h-full flex justify-around items-center ">


        <AiFillHome className={`text-md cursor-pointer  active:border-t active:border-gray-500  ${location.pathname==='/'?' text-blue-500 ':''}`} onClick={() => handleNavigate('/')} />

        <IoSearch className={`text-md cursor-pointer active:border-t active:border-gray-500 `} onClick={() => setSearchBoxVisibility((pre) => !pre)} />


        {userData.role === 'Seller' && <div className="h-10 w-10 rounded-full bg-blue-500 flex  justify-center items-center border-t-4 relative bottom-1.5 border-black active:border-t active:border-gray-500 hover:bg-blue-500" onClick={() => handleNavigate('/sellProperty')}>
          <FaPlus className={`text-xl cursor-pointer  ${location.pathname==='/sellProperty'?' text-white ':''}`} />

        </div>}


        <RiCalendarScheduleFill className={`text-md cursor-pointer active:border-t active:border-gray-500 ${location.pathname==='/sellTrack' || location.pathname==='/buyTrack'?' text-blue-500 ':''}`} onClick={() => handleNavigate(userData.role === 'Seller' ? 'sellTrack' : 'buyTrack')} />


        <FaUserGear className={` text-md cursor-pointer active:border-t active:border-gray-500 ${location.pathname===`/setting/${userId}`?' text-blue-500 ':''}`} onClick={() => handleNavigate('/setting')} />


      </div>
    </div>
  )
}

export default BottomNavbar;