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
  const { setUserData, setAccessToken ,setIsAuthenticated} = useContext(UserDataContext);

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
    <section className=" w-full min-h-[95vh] mt-3 overflow-hidden ">

      <h5 className={commonStyle.title}>{authType === 'login' ? "Login" : "SignUp"}</h5>

      <div className="flex w-full justify-center">
        <hr className="border-t-2 border-black-700 w-[95%] sm:w-[65%] md:w-[45%] pb-1" />
      </div>

      <form id="formElement" >

        <div className="w-full flex justify-center mt-1 ">
          <div className={formStyle.mainFormDiv + " shadow-lg ring-2 ring-black ring-opacity-5 rounded-lg"}>


            {(authType === 'signup') && <div className={formStyle.divStyle}>
              <label className={formStyle.lable} htmlFor="username">
                Full Name
              </label>
              <input className={formStyle.input} id="username" type="text" placeholder="Full Name" name="username" autoComplete="on" required />
            </div>}



            <div className={formStyle.divStyle}>
              <label className={formStyle.lable} htmlFor="email">
                Email
              </label>
              <input className={formStyle.input} id="email" type="email" placeholder="Enter Email" name="email" autoComplete="on" required />
            </div>


            <div className={formStyle.divStyle + " relative"}>

              <label className={formStyle.lable} htmlFor="password">
                Password
              </label>

              <input className={formStyle.input + ' pr-7 '} id="password" type={passwordVisibility ? "text" : "password"} placeholder="Enter Password" name="password" autoComplete="on" required />

              {passwordVisibility ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility}></i> : <i className="fi fi-ss-eye-crossed  cursor-pointer absolute top-8 right-2" onClick={handlePasswordVisibility}></i>}
            </div>

            {authType === 'signup' && <div className={formStyle.divStyle}>
              <label className={formStyle.lable} htmlFor="userType">
                User Type
              </label>
              <select id="userType" className={formStyle.select}>
                <option value="none">Select user type</option>
                <option value="buyer">Buy property</option>
                <option value="seller">Sell property</option>
              </select>
            </div>}


            <div className="flex justify-center w-full mt-3">
              <button type="submit" className={formStyle.authBtn} onClick={formSubmitHandler}>{authType === 'signup' ? "Sign Up" : "Sign In"}</button>

            </div>

            <p className="text-center mt-3">{authType === 'signup' ? "Already have an account ? " : "Don't have an account ? "} <strong className="text-red-400 cursor-pointer top active:text-red-500" onClick={authTypeHandller}>{authType === 'login' ? "Sign Up" : 'Sign In'}</strong></p>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Auth;