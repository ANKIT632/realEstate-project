/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getSession} from '../localSession/authSession'

function HeroSection() {

  const navigate = useNavigate();
  const images = [
    'https://images.unsplash.com/photo-1566908829550-e6551b00979b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user,setUser]=useState("");

  useEffect(() => {
    // Preload images
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(timer); 
  }, [currentImageIndex]);


  useEffect(()=>{
    const user=getSession('user_data');

    setUser(user.role);

  },[])



  // sell handller
  const handleSellProperty = () => {
    navigate('/sellProperty');
  }

  return (
    <section className="w-full min-h-[23rem] bg-slate-200 flex flex-wrap justify-center items-center">
      <div className="w-[38%] max-sm:w-[96%] p-2 " >
        <h3 className="font-mono font-bold text-blue-700 text-[20px]">
          <strong className="text-[25px]">Welcome</strong> to Our Real Estate Website</h3>
        <p className="text-blue-950 text-[13px] mb-4">Find your perfect home or sell your property quickly with us. We provide the best real estate services in the market.</p>

        <div className="space-y-2 md:flex-col space-x-2 max-sm:space-x-2 max-sm:text-[10px]">

         <button className="px-2 py-1 text-white ring-red bg-black rounded-lg  active:bg-gray-700  font-serif">Show property</button>
       
       {
          (user==='Seller')&&<button className="px-2 py-1 ring-1 ring-blue-400 rounded-lg active:bg-blue-100 font-serif text-blue-500" onClick={handleSellProperty}>Sell property</button>}
        </div>
      </div>

      {/* second div */}

      <div className="w-[55%] h-[19rem]  flex justify-center max-sm:w-[76%] max-sm:h-[9rem] max-sm:mt-2 mb-2">
        <img className="w-[90%] h-full object-cover rounded-full" src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      </div>

    </section>
  )
}

export default HeroSection;