import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commonStyle } from '../style'
import searchIcon from '../assets/searchIcon.png'

function TopNavBar() {

  const [isKey, setIsKey] = useState(false);
  const [isDark, setDark] = useState(true);
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const [showUserMenue, setShowUserMenue] = useState(false);

  const navigate = useNavigate();

  // handller menue
  const handleSetUserMenue = () => {
    setShowUserMenue(!showUserMenue);
  }

  console.log(searchBoxVisibility);
  // handle add user property

  const handleAddProperty = () => {
    navigate('/sellProperty');
  }



  // auth Handller
  const authHandller = () => {
    navigate('/auth');
  }

  return (

    <nav className="w-full  sticky top-0 h-14 bg-white z-50  border-b  overflow-hidden ">
      <h1 className="text-blue-600  relative top-2.5 left-2 font-poppins font-extrabold text-[22px]  cursor-pointer active:text-blue-800" onClick={() => navigate('./')}>EcoEstate</h1>

      <img src={searchIcon} className="w-6 fixed top-[16px] right-24 md:hidden cursor-pointer" alt="icon" onClick={() => setSearchBoxVisibility((pre) => !pre)} />

      <input type="text" placeholder="find here" className={`overflow:hidden h-8 pl-7 rounded-lg  md:mt-[8px] bg-sky-50 border border-gray-500 md:absolute top-1 md:right-[100px] md:w-[30%] max-md:w-[98%] max-md:relative max-md:left-[0.6%] outline-none md:block ${searchBoxVisibility ? '' : 'hidden'} max-md:top-6 focus:border-blue-500`} />


      {isKey && <button className="text-white fixed top-2 -my-3 font-bold  sm:right-14  text-[40px] " onClick={handleAddProperty}>+</button>

      }

      <span className="absolute top-[6px]">
        {
          isKey ?
            <img alt="img" className="h-7 w-7 bg-gray-400 rounded-[50%] cursor-pointer fixed right-3 top-2" onClick={handleSetUserMenue} />

            : <button className={commonStyle.btn + "fixed top-4  px-2"} onClick={authHandller}>Sign In</button>}
      </span>

      {
        showUserMenue && (
          <div className="absolute right-1 mt-2 w-48 rounded-md shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5 ">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >Sign out</Link>
            </div>
          </div>
        )
      }

    </nav>

  )
}

export default TopNavBar;