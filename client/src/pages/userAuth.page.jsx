/* eslint-disable no-undef */
import { useContext, useState } from "react";
import { formStyle, commonStyle } from '../style';
import { useNavigate } from 'react-router-dom';
import { setSession, getSession } from '../localSession/authSession'
import UserDataContext from "../context/userContext";



function Auth() {

  // navigate
  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { setUserData, setAccessToken, setIsAuthenticated } = useContext(UserDataContext);

  // login or sign up
  const [authType, setAuthType] = useState('login');


  // handler for password visibility
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);

  }


  // auth handdler
  const authTypeHandller = () => {
    if (authType === 'login')
      setAuthType('signup');

    else
      setAuthType('login');
  }

  // handle post on server.

  const userAuthWithServer = (formData) => {
    let serverRoute = authType === 'login' ? 'signin' : 'signup';
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/${serverRoute}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          if (authType === 'signup')
            setAuthType('login');

          else {
            setSession('user_data', data.user);
            setSession('access_token', data.access_token);
            setSession('userId', data.user._id);

            const userData = getSession('user_data');

            const accessToken = getSession('access_token');

            setUserData(userData);
            setAccessToken(accessToken);
            setIsAuthenticated(true);
            navigate('/');
          }


        }

      })
      .catch(error => alert('Error:', error));
  };


  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formElement = document.getElementById('formElement');


    let form = new FormData(formElement);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    if (authType === 'signup') {
      const selectElement = document.getElementById('userType');
      const userType = selectElement.value;
      formData.role = userType;
    }

    userAuthWithServer(formData);

  }


  return (
    <section className="min-h-[calc(100vh-3.3rem)] w-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-lg md:rounded-3xl md:shadow-2xl overflow-hidden">

        {/* LEFT INFO PANEL */}
        <div className="hidden md:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

          <h2 className="text-4xl font-extrabold leading-tight">
            Smart Property<br />Management
          </h2>

          <p className="mt-5 text-gray-300 text-sm leading-relaxed">
            Manage properties, track buyers & sellers, and access real-time insights securely from one dashboard.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
              Secure & encrypted login
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
              Buyer & seller roles
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
              Crack best deals
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="flex flex-col justify-center px-6 sm:px-10 py-12">

          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            {authType === "login" ? "Welcome Back" : "Create Account"}
          </h3>

          <p className="text-center text-gray-500 text-sm mt-2">
            {authType === "login"
              ? "Login to continue"
              : "Sign up to get started"}
          </p>

          <form id="formElement" className="mt-8 space-y-5">

            {/* FULL NAME */}
            {authType === "signup" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                  required
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1 relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={passwordVisibility ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                required
              />
              <i
                className={`fi ${passwordVisibility ? "fi-ss-eye" : "fi-ss-eye-crossed"} absolute right-4 top-10 text-gray-500 cursor-pointer`}
                onClick={handlePasswordVisibility}
              ></i>
            </div>

            {/* USER TYPE */}
            {authType === "signup" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  id="userType"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition bg-white"
                >
                  <option value="none">Select role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              onClick={formSubmitHandler}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-900 active:scale-[0.98] transition"
            >
              {authType === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* SWITCH */}
          <p className="text-center text-sm mt-6 text-gray-600">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="text-black font-semibold cursor-pointer ml-1 hover:underline"
              onClick={authTypeHandller}
            >
              {authType === "login" ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Auth;