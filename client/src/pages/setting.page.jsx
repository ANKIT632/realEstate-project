import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcDeleteDatabase } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { FaUserGear } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";

function Setting() {

    const [settingMenue, setSettingMenue] = useState(false);
    const [updateMenuType, setUpdateMenuType] = useState('profile');


    // handller update menu

    const updateMenueContentHandler = (type) => {
        setUpdateMenuType(type);
    }

    console.log('settingpage');
    return (
        <section className="min-h-[100%] relative">

            <div className="flex items-center fixed top-14 z-20 bg-gray-200 w-full md:w-[80%] ">
                <FaUserGear className="mx-2" />
                <h4 className=" font-mono font-bold">Setting</h4>
                {!settingMenue && <FiChevronLeft className="text-black text-2xl  fixed right-0 cursor-pointer  hover:text-blue-500 md:hidden" onClick={() => setSettingMenue((pre) => !pre)} />
                }
            </div>

            {/* left update div page */}
            <div className={`bg-gray-400 min-h-[100vh] w-full ${settingMenue ? 'max-md:filter max-md:blur-lg max-md:pointer-events-none' : ''}  md:w-[80%]`}>
           
           {
       
           }

            </div>


            {/* right menue */}

            {<div className={`h-[100%] bg-gray-800 fixed max-md:w-[60%] top-14 right-0  md:w-[20%] z-30 max-md:${settingMenue ? '' : "hidden"}`}>

                <AiOutlineArrowRight className="text-white cursor-pointer my-2 ml-1 hover:text-blue-500 text-lg md:hidden" onClick={() => setSettingMenue((pre) => !pre)} />


                <div className=" text-white pt-2">
                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white ${updateMenuType === 'profile' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('profile')}
                    >
                        <AiOutlineIdcard />
                        <Link className="pl-1 font-mono text-sm">Profile Update</Link>
                    </div>

                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white ${updateMenuType === 'password' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('password')}>
                        <RiLockPasswordFill />
                        <Link className="pl-1 font-mono text-sm">Password Update</Link>
                    </div>


                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white  ${updateMenuType === 'deleteAccount' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('deleteAccount')}>
                        <FcDeleteDatabase />
                        <Link className="pl-1 font-mono text-sm">Delete Account</Link>
                    </div>

                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white`}>
                        <IoIosLogOut />
                        <Link className="pl-1 font-mono text-sm hover:text-blue-500">Logout</Link>
                    </div>

                </div>

            </div>}
        </section>
    )
}

export default Setting;