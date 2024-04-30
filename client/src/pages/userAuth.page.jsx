import { useState } from "react";
import { authStyle } from '../style';

function Auth() {

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // login or sign up
  const [authType, setAuthType] = useState(true);

  // handdler for password visibility
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }


  return (
    <form className=" w-full mt-3 overflow-hidden">


      <p className="text-center font-mono font-bold text-[20px]  mb-2 text-blue-500">{authType ? "SignUp" : "Login"}</p>

      <div className="flex w-full justify-center">
        <hr className="border-t-2 border-black-700 w-[95%] sm:w-[65%] md:w-[45%]" />
      </div>
        
        <div className="w-full flex justify-center mt-1">
      <div className=" bg-blue-50 w-[90%] sm:w-[60%] md:w-[40%] flex flex-col  mb-6  items-center pt-4 pb-3 rounded-lg ">


        {authType && <div className={authStyle.divStyle}>
          <label className={authStyle.lable} htmlFor="username">
            Full Name
          </label>
          <input className={authStyle.input} id="username" type="text" placeholder="Full Name" name="username" />
        </div>}



        <div className={authStyle.divStyle}>
          <label className={authStyle.lable} htmlFor="username">
            Email
          </label>
          <input className={authStyle.input} id="username" type="text" placeholder="Enter Email" name="username" />
        </div>


        <div className={authStyle.divStyle + " relative"}>
          <label className={authStyle.lable} htmlFor="password">
            Enter Password
          </label>
          <input className={authStyle.input + ' pr-7 '} id="password" type={passwordVisibility ? "text" : "password"} placeholder="Enter Password" name="password" />
          {passwordVisibility ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility}></i> : <i className="fi fi-ss-eye-crossed  cursor-pointer absolute top-8 right-2" onClick={handlePasswordVisibility}></i>}
        </div>

        {authType && <div className={authStyle.divStyle}>
          <label className={authStyle.lable} htmlFor="userType">
            User Type
          </label>
          <select id="userType" className={authStyle.select}>
            <option value="none">Select user type</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="agent">Agent</option>
          </select>
        </div>}


        <div className="flex justify-center w-full mt-3">
          <button type="submit" className={authStyle.authBtn}>{authType ? "Sign Up" : "Sign In"}</button>

        </div>

        <p className="text-center mt-3">{authType ? "Already have an account ? " : "Don't have an account ? "} <strong className="text-red-400 cursor-pointer top active:text-red-500" onClick={() => setAuthType((pre) => !pre)}>{authType ? "Sign In" : 'Sign Up'}</strong></p>
      </div>
      </div>
    </form>
  )
}

export default Auth;