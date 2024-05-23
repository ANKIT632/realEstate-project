import { useState, useContext,useEffect} from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { commonStyle } from '../style';
import searchIcon from '../assets/searchIcon.png';
import { BiAlignRight } from "react-icons/bi";
import { deleteSession } from '../localSession/authSession';
import UserDataContext from '../context/userContext';




function TopNavBar() {


  const location = useLocation();
  const navigate = useNavigate();


  
  const { userData,setUserData,setSearchQuery} = useContext(UserDataContext);
  
  const [localSearch,setLocalSearch]=useState('');
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [showUserMenue, setShowUserMenue] = useState(false);

  console.log('topNavBar');

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
    deleteSession('user_data');
    deleteSession('access_token');
    setUserData({});
  }

// search handler
const searchChangeHandler = (e) => {
  console.log(e.key,e.target.value);

    setLocalSearch(e.target.value);
  
}

const searchHandler=(e)=>{

  if(e.key==='Enter' && location.pathname!=='/allDeals'){
    
  navigate('/allDeals');
  }

  if (e.key === 'Enter') {
    setSearchQuery(localSearch);
  }
}

   

  useEffect(() => {
    if (location.pathname === '/setting') {
      setSearchBoxVisibility(false);
    } 
  }, [location.pathname]);


  return (
    <div className="w-full sticky top-0 z-50">
      <nav className={`w-full   h-14 bg-white   border-b  overflow-hidden ${searchBoxVisibility ? 'max-md:hidden ' : ''}}`}>
        <h1 className="text-blue-600  relative top-2.5 left-2 font-poppins font-extrabold text-[22px]  cursor-pointer active:text-blue-800" onClick={() => navigate('./')}>EcoEstate</h1>

        <img src={searchIcon} className={`w-6 fixed top-[16px] right-24 md:hidden cursor-pointer ${location.pathname==='/setting' ?' hidden ' : ' '}`} alt="icon" onClick={() => setSearchBoxVisibility((pre) => !pre)} />




        {userData?.role === 'Seller' && <button className=" absolute top-1 -my-3 font-bold  right-20  text-[40px] max-md:hidden " onClick={handleAddProperty}>+</button>

        }

        <span className="absolute top-[6px] ">
          {
            (userData?.username) ?
              <div className="h-8   fixed right-3 top-3 flex space-x-0.5 items-center bg-gray-300 p-1 rounded-2xl shadow-sm cursor-pointer " onClick={handleSetUserMenue}>
                <img src={userData.profile_url} alt="img" className={`h-6 w-6  rounded-[50%]  ${showUserMenue ? " bg-blue-500" : "bg-white"}`} />

                <BiAlignRight className={`h-5 w-5 ${showUserMenue ? " text-blue-500" : "text-white"}`} />
              </div>

              : <button className={commonStyle.btn + "fixed top-4  px-2"} onClick={authHandller}>Sign In</button>}
        </span>

        {
          showUserMenue && (
            <div className="fixed right-1 mt-6 w-48 rounded-md shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5  ">

              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>

                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>

                {userData?.role === 'Seller' && <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >sell track</Link>}

                {userData?.role === 'Buyer' && <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" >visit schedule</Link>}

                <Link to="/favourite" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setShowUserMenue((pre) => !pre)}>favourite</Link>

                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={logoutHandler}>Logout</Link>
              </div>
            </div>
          )
        }

      </nav>
      <input type="text" placeholder="Find by name,location,city" className={`text-xs   h-8 w-full  pl-7  bg-sky-50 border border-gray-500   md:right-[120px] md:w-[30%] rounded-md  outline-none md:block   ${searchBoxVisibility ? '' : ' hidden '} focus:border-blue-500 md:absolute md:top-3 ` } value={localSearch} onChange={searchChangeHandler} onKeyDownCapture={searchHandler}/>
    </div>
  )
}

export default TopNavBar;