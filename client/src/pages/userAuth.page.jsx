import { useState } from "react";
import { commonStyle } from '../style'

function Auth() {

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // handdler for password visibility
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }


  return (
    <form className=" w-full mt-6 ">

      <div className="flex flex-col  mb-6 w-full  items-center">

        <div className="xs:w-[90%] md:w-[40%]">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Full Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Full Name" name="username" />
        </div>



        <div className=" xs:w-[90%] md:w-[40%]">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Enter Email" name="username" />
        </div>


        <div className=" xs:w-[90%] md:w-[40%] relative">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Enter Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pr-7" id="username" type={passwordVisibility ? "text" : "password"} placeholder="Enter Password" name="password" />
          {passwordVisibility ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility}></i> : <i className="fi fi-ss-eye-crossed absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility}></i>}
        </div>

        <div className=" xs:w-[90%] md:w-[40%]">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="userType">
            User Type
          </label>
          <select id="userType" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="none">Select user type</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="agent">Agent</option>
          </select>
        </div>
    
      </div>
      <div className="flex justify-center">
  <button type="submit" className={commonStyle.authBtn}>Sign Up</button>
</div>
    </form>
  )
}

export default Auth;