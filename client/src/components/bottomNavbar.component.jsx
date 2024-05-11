import { useNavigate } from 'react-router-dom'
import gear from '../assets/gear.png'

function BottomNavbar() {
 
    const navigate= useNavigate();
    const handleNavigate = () => {
      navigate('/');
    }

  return (
    <div className="sticky bottom-0 w-full h-10 bg-white border-t-2 border-x-1 border-black md:hidden z-50">
      <div className="w-full h-full flex justify-around items-center ">
      <i className="fi fi-br-home text-xl cursor-pointer" onClick={handleNavigate}></i>
      <i className="fi fi-br-search text-xl cursor-pointer"></i>
      <div className="h-12 w-12 rounded-full bg-blue-500 flex  justify-center items-center border-t-2 relative bottom-1.5 border-black ">
      <i className="fi fi-bs-plus text-white text-2xl cursor-pointer   "></i></div>
      <i className="fi fi-bs-heart text-xl cursor-pointer "></i>
      <img src={gear} alt="Gear icon" className="h-5 w-5 cursor-pointer"/>

      </div> 
    </div>
  )
}

export default BottomNavbar