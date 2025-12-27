/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { commonStyle } from '../style';
import { BiAlignRight } from "react-icons/bi";
import UserDataContext from '../context/userContext';
import { FaArrowLeft,FaSearch } from "react-icons/fa";
import  {logoutUser}  from "../utils/auth";

function TopNavBar() {


  const location = useLocation();
  const navigate = useNavigate();



  const { userData, setUserData, setSearchQuery, searchBoxVisibility, setSearchBoxVisibility ,setUserId,setIsAuthenticated} = useContext(UserDataContext);

  const [localSearch, setLocalSearch] = useState('');
  const [showUserMenue, setShowUserMenue] = useState(false);



  // handller menue
  const handleSetUserMenue = () => {
    setShowUserMenue(!showUserMenue);
  }


  // handle add user property
  const handleAddProperty = () => {
    navigate('/sellProperty');
  }



  // auth Handller
  const authHandller = () => {
    navigate('/auth');
  }

  // logout handller
  const logoutHandler = () => {
    logoutUser();
    setUserData({});
    setShowUserMenue(false);
    setUserId(null);
    setIsAuthenticated(false);
    navigate('/');
  
  }

  // search handler
  const searchChangeHandler = (e) => {
    setLocalSearch(e.target.value);
  }

  const searchHandler = (e) => {

    if (e.key === 'Enter' && location.pathname !== '/allDeals') {

      navigate('/allDeals');
    }

    if (e.key === 'Enter') {
      setSearchQuery(localSearch);
    }
  }

  const handlerIconSearchQuery = () => {
    navigate('/allDeals');
    setSearchQuery(localSearch);
  }

  const HandleToggleMenueOnLink = () => {
    setShowUserMenue((pre) => !pre);
  }


  useEffect(() => {

  }, [])


  useEffect(() => {
    if (location.pathname === `/setting/${userData._id}`) {
      setSearchBoxVisibility(false);
    }
  }, [location.pathname]);


  return (
    <div className="w-full sticky top-0 z-50">
      <nav className={`w-full   h-14 bg-white   border-b  overflow-hidden ${searchBoxVisibility ? 'max-md:hidden ' : ''}}`}>
        
        <h4 className="text-blue-800 w-fit relative top-2.5 left-2 font-poppins font-extrabold text-[22px]  cursor-pointer active:text-blue-800" onClick={() => navigate('/')}>EcoEstate</h4>


        {userData?.role === 'Seller' && <button className=" absolute top-1 -my-3 font-bold  right-20  text-[40px] max-md:hidden active:text-blue-500" onClick={handleAddProperty}>+</button>

        }

        <span className="absolute top-[6px] ">
          {
            (userData?.username) ?
              <div className="h-8   fixed right-3 top-3 flex space-x-0.5 items-center bg-gray-300 p-1 rounded-2xl shadow-sm cursor-pointer " onClick={handleSetUserMenue}>
                <img src={userData.profile_url} alt="img" className={`h-6 w-6  rounded-[50%]  ${showUserMenue ? " bg-blue-500" : "bg-white"}`} />

                <BiAlignRight className={`h-5 w-5 ${showUserMenue ? " text-blue-500" : "text-white"}`} />
              </div>

              : <button className={commonStyle.btn + "fixed top-[13px] px-2"} onClick={authHandller}>Sign In</button>}
        </span>

        {
          showUserMenue && (
            <div className="fixed right-1 mt-6 w-48 rounded-md shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5  ">

              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                <Link to={`/userProfile/${userData._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={HandleToggleMenueOnLink}>Your Profile</Link>

                <Link to={`/setting/${userData._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={HandleToggleMenueOnLink}>Settings</Link>

                {userData?.role === 'Seller' && <Link to="/sellTrack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={HandleToggleMenueOnLink} >sell track</Link>}

                {userData?.role === 'Buyer' && <Link to="/buyTrack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={HandleToggleMenueOnLink}>visit schedule</Link>}

                <Link to="/favourite" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={HandleToggleMenueOnLink} >favourite</Link>

                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={logoutHandler} >Logout</Link>
              </div>
            </div>
          )
        }

      </nav>

      {/* search div */}

      <div className={`flex items-center max-md:bg-white  max-md:shadow-sm max-md:h-14 ${searchBoxVisibility ? '' : 'max-md:hidden '} md:right-[80px]  md:top-3 md:absolute text-2xl `}>
        <FaArrowLeft className="md:hidden w-[6%] active:text-blue-500 cursor-pointer " onClick={() => setSearchBoxVisibility((pre) => !pre)} />

        <input type="text" placeholder="Find by name,location,city" className={`text-xs h-10 md:h-8 max-md:w-[95%]  pl-4  bg-sky-50 border border-gray-200  rounded-md  outline-none  focus:border-blue-200  pr-8 md:w-[300px]  max-md:rounded-2xl`} value={localSearch} onChange={searchChangeHandler} onKeyDownCapture={searchHandler} />

        <FaSearch className="active:text-blue-600 max-md:fixed right-1 rounded border p-1  md:absolute  cursor-pointer text-[25px] bg-white" onClick={handlerIconSearchQuery} />
      </div>
    </div>
  )
}

export default TopNavBar;