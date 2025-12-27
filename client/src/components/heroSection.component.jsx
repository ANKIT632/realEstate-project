/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataContext from '../context/userContext';


function HeroSection() {

  const { userData } = useContext(UserDataContext);


  const navigate = useNavigate();
  const images = [
    'https://images.unsplash.com/photo-1566908829550-e6551b00979b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState("");

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


  useEffect(() => {

    setUser(userData.role);

  }, [userData])



  // sell handller
  const handleSellProperty = () => {
    navigate('/sellProperty');
  }

  return (
    <section className="w-full min-h-[calc(100vh-2rem)] flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">

  <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

    {/* LEFT CONTENT */}
    <div className="space-y-6 text-center md:text-left">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
        Find Your
        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dream Property
        </span>
      </h1>

      <p className="text-gray-600 max-w-xl mx-auto md:mx-0">
        Buy, sell, or explore premium properties with confidence.
        Trusted by thousands of buyers and sellers across the country.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">

        <button
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition"
        >
          Explore Properties
        </button>

        {user === "Seller" && (
          <button
            onClick={handleSellProperty}
            className="px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 active:scale-95 transition"
          >
            Sell Your Property
          </button>
        )}
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative flex justify-center">

      {/* Glow */}
      <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>

      <img
        src={images[currentImageIndex]}
        alt="Property"
        className="relative w-full max-w-lg h-[320px] sm:h-[380px] object-cover rounded-3xl shadow-2xl transition-opacity duration-700"
      />
    </div>

  </div>
</section>

  )
}

export default HeroSection;