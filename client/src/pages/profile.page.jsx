/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from '../localSession/userLocaldata';
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";
import { formStyle } from "../style";




function Profile() {

    const [userProfileData, setUserProfileData] = useState();
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const data = getLocalStorage('user_Profile_data');

        if (!data._id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/` + userId).then(res => res.json()).then(data => {
                if (data.status === 'success') {
                    setUserProfileData(data.user);
                    setLocalStorage('user_Profile_data', data.user);
                }

            }).catch(err => alert(err));
        }

        else
            setUserProfileData(data);

    }, [])


    return (
        <div className="w-full min-h-[94vh] flex flex-col items-center">


            <div className="w-full h-20 bg-gray-200 relative flex items-center px-1">
                <img src={userProfileData?.profile_url} alt="img" className=" w-16 h-16 rounded-2xl bg-gray-100 shadow " />

                <div className=" ml-2 ">
                    <div className=" flex  items-center px-1 mb-1 rounded-lg shadow bg-white font-semibold text-sm"><FaUserCircle /><h4 className="font-mono text-blue-300 pl-1">{userProfileData?.username}</h4></div>

                    <div className=" flex  items-center px-1 rounded-lg  bg-white shadow font-semibold text-sm"><BiSolidUserBadge /><h4 className="font-mono text-blue-300 pl-1">{userProfileData?.role}</h4></div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-[95%] mt-4 gap-2 ">

                <div className=" font-mono bg-white pl-2 rounded-lg shadow  font-bold">Age
                    <h4 className="font-mono text-blue-300">{userProfileData?.age}</h4>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Gender
                        <h4 className="font-mono text-blue-300">{userProfileData?.gender}</h4>
                    </div>
                </div>


                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Address
                        <h4 className="font-mono text-blue-300">{userProfileData?.address}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Email
                        <h4 className="font-mono text-blue-300">{userProfileData?.email}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Phone
                        <h4 className="font-mono text-blue-300">{userProfileData?.phone}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Instagram Id
                        <h4 className="font-mono text-blue-300">{userProfileData?.socialUrls.Instagram}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Facebook Id
                        <h4 className="font-mono text-blue-300">{userProfileData?.socialUrls.Facebook}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">LinkedIn Id
                        <h4 className="font-mono text-blue-300">{userProfileData?.socialUrls.LinkedIn}</h4>
                    </div>
                </div>

                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Twitter Id
                        <h4 className="font-mono text-blue-300">{userProfileData?.socialUrls.Twitter}</h4>
                    </div>
                </div>



                <div>
                    <div className=" font-mono bg-white pl-2 rounded-lg shadow font-semibold text-sm">Created At
                        <h4 className="font-mono text-blue-300">{userProfileData?.createdAt.slice(0, 10)}</h4>
                    </div>
                </div>

            </div>

            <button className={"text-center mt-3 " + formStyle.authBtn} onClick={() => navigate("/setting/" + userId)}>Update</button>

        </div>

    )
}

export default Profile;