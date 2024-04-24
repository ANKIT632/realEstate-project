import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {commonStyle} from '../style'

function TopNavBar() {

  const [isKey, setIsKey] = useState(false);
  const [isDark, setDark] = useState(true);

  const [showUserMenue, setShowUserMenue] = useState(false);

  const navigate=useNavigate();

  // handle 

  const handleSetUserMenue = () => {
    setShowUserMenue(!showUserMenue);
  }


  return (

    <div className="w-full sticky h-10 bg-sky-900 ">
      <h1 className="text-white p-[3px] font-serif font-extrabold text-[22px] ml-2">Estate-Ease</h1>


      <input type="text" placeholder="find here" className=" h-7 pl-3 rounded-lg ml-2.5 mt-[2px] bg-sky-50 border border-gray-500  md:absolute top-1 md:right-20 md:w-[25%] xs:w-[85%] xs:right-0 outline-none" />

      <span className="absolute top-[6px]">
        {
          isKey ?
            <img alt="img" className="h-7 w-7 bg-gray-400 rounded-[50%] cursor-pointer fixed right-3" onClick={handleSetUserMenue} />

         : <button className={commonStyle.btn}>Sign In</button>}
      </span>

      {
        showUserMenue && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
              <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</Link>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default TopNavBar;