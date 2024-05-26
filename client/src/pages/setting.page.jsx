import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcDeleteDatabase } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { FaUserGear } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";
import UpdateProfileComp from "../components/updateProfile.component";
import UpdatePasswordComp from "../components/updatePassword.component";
import DeleteAccountComp from "../components/deleteAccount.component";
import UpdateRole from "../components/updateRole.component";
import { FaClipboardUser } from "react-icons/fa6";
import  {logoutUser}  from "../utils/auth";
import { useContext } from "react";
import UserDataContext from "../context/userContext";


function Setting() {

    const [settingMenue, setSettingMenue] = useState(false);
    const [updateMenuType, setUpdateMenuType] = useState('Update Profile');

    
    const {setUserData,setUserId} = useContext(UserDataContext);

    // handller update menu

    const updateMenueContentHandler = (type) => {
        setUpdateMenuType(type);
        setSettingMenue((pre) => !pre);
    }

   // handler Logout
   
   const logoutHanddler=(e)=>{
    e.preventDefault();
    logoutUser();
    setUserData({});
    setUserId('');
    setSettingMenue(false);
   }

    console.log('settingpage');
    return (
        <section className="relative  ">

            <div className="flex items-center  z-20 bg-gray-200 w-full md:w-[80%] sticky top-14">
                <FaUserGear className="mx-2" />
                <h4 className=" font-mono font-bold">{updateMenuType}</h4>
                {!settingMenue && <FiChevronLeft className="text-black text-2xl  absolute right-0 cursor-pointer  hover:text-blue-500 md:hidden" onClick={() => setSettingMenue((pre) => !pre)} />
                }
            </div>

            {/* left update div page */}
            <div className={`bg-gray-100 text-black   ${settingMenue ? 'max-md:filter max-md:blur-sm max-md:pointer-events-none' : ''}  md:w-[80%] min-h-[88vh] `}>

                {
                    updateMenuType === 'Update Profile' && <div className=" w-full max-md:mb-14">
                        <UpdateProfileComp />
                    </div>
                }

                {
                    updateMenuType === 'Update Password' && <div className=" w-full h-full absolute">
                        <UpdatePasswordComp />
                    </div>
                }

                {
                    updateMenuType === 'Delete Account' && <div className=" w-full h-full absolute">
                        <DeleteAccountComp />
                    </div>
                }

                {
                    updateMenuType === 'Update Role' && <div className=" w-full h-full absolute">
                        <UpdateRole/>
                    </div>
                }

            </div>


            {/* right menue */}

            {<div className={`h-[100%] bg-gray-800 fixed max-md:w-[60%] top-14 right-0  md:w-[20%] z-30 max-md:${settingMenue ? '' : "hidden"}`}>

                <AiOutlineArrowRight className="text-white cursor-pointer my-2 ml-1 hover:text-blue-500 text-lg md:hidden" onClick={() => setSettingMenue((pre) => !pre)} />


                <div className=" text-white pt-2">
                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white ${updateMenuType === 'Update Profile' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('Update Profile')}
                    >
                        <AiOutlineIdcard />
                        <Link className="pl-1 font-mono text-sm">Profile Update</Link>
                    </div>

                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white ${updateMenuType === 'Update Password' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('Update Password')}>
                        <RiLockPasswordFill />
                        <Link className="pl-1 font-mono text-sm">Password Update</Link>
                    </div>


                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white  ${updateMenuType === 'Delete Account' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('Delete Account')}>
                        <FcDeleteDatabase />
                        <Link className="pl-1 font-mono text-sm">Delete Account</Link>
                    </div>

                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white  ${updateMenuType === 'Update Role' ? ' text-blue-500' : " "}`}
                        onClick={() => updateMenueContentHandler('Update Role')}>
                        <FaClipboardUser />
                        <Link className="pl-1 font-mono text-sm">Update Role</Link>
                    </div>

                    <div className={`flex items-center pl-1 hover:bg-gray-600 h-8 border-b border-white`}>
                        <IoIosLogOut />
                        <Link to='/' className="pl-1 font-mono text-sm hover:text-blue-500" onClick={logoutHanddler}>Logout</Link>
                    </div>

                </div>

            </div>}
        </section>
    )
}

export default Setting;