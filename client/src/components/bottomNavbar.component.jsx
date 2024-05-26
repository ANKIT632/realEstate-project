import { useNavigate} from 'react-router-dom'
import { FaUserGear } from "react-icons/fa6";
import { useContext } from 'react';
import UserDataContext from '../context/userContext';

function BottomNavbar() {

 const {userId,userData,searchBoxVisibility, setSearchBoxVisibility}=useContext(UserDataContext);
   
 console.log("id",userId);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if(path==='/setting')
    {
      path=`/setting/${userId}`
    }

    navigate(path);
  }


  return (
    <div className="sticky bottom-0 w-full h-8 bg-white border-t-2 border-x-1 border-gray-100 md:hidden z-50 ">
      <div className="w-full h-full flex justify-around items-center ">

        
        <i className=" fi fi-br-home text-md cursor-pointer   active:border-t active:border-gray-500 " onClick={()=>handleNavigate('/')}/> 

        <i className="fi fi-br-search text-md cursor-pointer active:border-t active:border-gray-500 "  onClick={() => setSearchBoxVisibility((pre) => !pre)} />


        <div className="h-10 w-10 rounded-full bg-blue-600 flex  justify-center items-center border-t-4 relative bottom-1.5 border-black active:border-t active:border-gray-500 hover:bg-blue-500" onClick={()=>handleNavigate('/sellProperty')}>
          <i className="fi fi-bs-plus text-white text-2xl cursor-pointer " />

        </div>


        <i className="fi fi-bs-heart text-md cursor-pointer active:border-t active:border-gray-500 " />


        <FaUserGear className="fi fi-bs-heart text-md cursor-pointer active:border-t active:border-gray-500 "  onClick={()=>handleNavigate('/setting')} />
      
     
      </div>
    </div>
  )
}

export default BottomNavbar