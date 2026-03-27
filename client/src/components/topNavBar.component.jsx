import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiAlignRight } from "react-icons/bi";
import UserDataContext from '../context/userContext';
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { logoutUser } from "../utils/auth";

function TopNavBar() {


  const location = useLocation();
  const navigate = useNavigate();



  const { userData, setUserData, setSearchQuery, searchBoxVisibility, setSearchBoxVisibility, setUserId, setIsAuthenticated } = useContext(UserDataContext);

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
    if (location.pathname === `/setting/${userData._id}`) {
      setSearchBoxVisibility(false);
    }
  }, [location.pathname, userData._id, setSearchBoxVisibility]);


  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">

      {/* NAV BAR */}
      <nav className="h-14 max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* LEFT – LOGO */}
        <div
          onClick={() => navigate('/')}
          className="text-xl font-extrabold tracking-wide cursor-pointer"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Eco
          </span>
          <span className="text-gray-800">Estate</span>
        </div>

        {/* CENTER SEARCH (Desktop) */}
        <div className="hidden md:flex relative w-[340px]">
          <input
            type="text"
            placeholder="Search by city, location, name"
            className="w-full h-9 pl-4 pr-10 text-sm rounded-full bg-gray-100 border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={localSearch}
            onChange={searchChangeHandler}
            onKeyDown={searchHandler}
          />
          <FaSearch
            className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600 cursor-pointer transition"
            onClick={handlerIconSearchQuery}
          />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {userData?.role === 'Seller' && (
            <button
              onClick={handleAddProperty}
              className="hidden md:flex items-center gap-1 px-3 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition"
            >
              + Add
            </button>
          )}

          {/* AUTH / USER */}
          {userData?.username ? (
            <div
              onClick={handleSetUserMenue}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full cursor-pointer transition"
            >
              <img
                src={userData.profile_url}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
              />
              <BiAlignRight className="text-gray-600" />
            </div>
          ) : (
            <button
              onClick={authHandller}
              className="px-4 h-9 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 active:scale-95 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      {searchBoxVisibility && (
        <div className="md:hidden h-14 flex items-center px-3 gap-2 bg-white shadow-sm">
          <FaArrowLeft
            className="text-lg cursor-pointer hover:text-blue-600"
            onClick={() => setSearchBoxVisibility(false)}
          />

          <input
            type="text"
            placeholder="Search properties"
            className="flex-1 h-9 pl-4 pr-9 text-sm bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-200"
            value={localSearch}
            onChange={searchChangeHandler}
            onKeyDown={searchHandler}
          />

          <FaSearch
            className="text-lg cursor-pointer hover:text-blue-600"
            onClick={handlerIconSearchQuery}
          />
        </div>
      )}

      {/* USER DROPDOWN */}
      {showUserMenue && (
        <div className="absolute right-4 top-14 w-52 rounded-2xl bg-white shadow-2xl border overflow-hidden animate-fadeIn">

          <Link
            to={`/userProfile/${userData._id}`}
            className="block px-4 py-2.5 text-sm hover:bg-gray-100"
            onClick={HandleToggleMenueOnLink}
          >
            👤 Your Profile
          </Link>

          <Link
            to={`/setting/${userData._id}`}
            className="block px-4 py-2.5 text-sm hover:bg-gray-100"
            onClick={HandleToggleMenueOnLink}
          >
            ⚙ Settings
          </Link>

          {userData?.role === 'Seller' && (
            <Link
              to="/sellTrack"
              className="block px-4 py-2.5 text-sm hover:bg-gray-100"
              onClick={HandleToggleMenueOnLink}
            >
              📈 Sell Track
            </Link>
          )}

          {userData?.role === 'Buyer' && (
            <Link
              to="/buyTrack"
              className="block px-4 py-2.5 text-sm hover:bg-gray-100"
              onClick={HandleToggleMenueOnLink}
            >
              📅 Visit Schedule
            </Link>
          )}

          <Link
            to="/favourite"
            className="block px-4 py-2.5 text-sm hover:bg-gray-100"
            onClick={HandleToggleMenueOnLink}
          >
            ❤️ Favourite
          </Link>

          <button
            onClick={logoutHandler}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>


  )
}

export default TopNavBar;