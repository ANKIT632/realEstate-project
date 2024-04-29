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

    <div className="w-full sticky h-10 bg-sky-900 ">
      <h1 className="text-white p-[3px] font-serif font-extrabold text-[22px] ml-2 cursor-pointer" onClick={() => navigate('./')}>Estate-Ease</h1>

      <img src={searchIcon} className="w-6 fixed top-[7px] right-24 md:hidden cursor-pointer" alt="icon"  onClick={()=>setSearchBoxVisibility((pre)=>!pre)}/>

      <input type="text" placeholder="find here" className={`h-7 pl-3 rounded-lg ml-2.5 mt-[2px] bg-sky-50 border border-gray-500 md:absolute top-1 md:right-[100px] md:w-[25%] xs:w-[90%] xs:right-0 outline-none md:block ${searchBoxVisibility ? '' : 'hidden'}`} />
      

      {isKey && <button className="text-white fixed top-[-15px] font-bold  sm:right-14  text-[40px] " onClick={handleAddProperty}>+</button>

      }

      <span className="absolute top-[6px]">
        {
          isKey ?
            <img alt="img" className="h-7 w-7 bg-gray-400 rounded-[50%] cursor-pointer fixed right-3" onClick={handleSetUserMenue} />

            : <button className={commonStyle.btn} onClick={authHandller}>Sign In</button>}
      </span>

      {
        showUserMenue && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >Sign out</Link>
            </div>
          </div>
        )
      }

    </div>

  )
}

export default TopNavBar;