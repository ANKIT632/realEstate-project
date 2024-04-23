import { useState } from "react";

function TopNavBar() {

  const [isKey,setIsKey]=useState(true);
  const [isDark,setDark]=useState(true);
  return (

    <div className="w-full sticky h-10 bg-sky-900 ">
      <h1 className="text-white p-[3px] font-serif font-extrabold text-[22px] ml-2">Estate-Ease</h1>


      <input type="text" placeholder="find here" className=" h-7 pl-3 rounded-lg ml-2.5 mt-[2px] bg-sky-50 border border-gray-500  md:absolute top-1 md:right-20 md:w-[25%] xs:w-[85%] xs:right-0"/>
 
 <span className="absolute right-3 top-[6px]">
     {
      !isKey?<button>log</button>:
      <div>

       <img alt="img" className="h-7 w-7 bg-gray-400 rounded-[50%]"/>

       <div>
               
       </div>

      </div>
     }
     </span>  
     </div>
 
  )
}

export default TopNavBar;