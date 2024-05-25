import InputBox from "./inputBox.component";
import { settingStyle, formStyle } from '../style'
import { useEffect, useState, useContext } from "react";
import { getLocalStorage, setLocalStorage } from "../localSession/userLocaldata";
import { useParams } from "react-router-dom";
import UserDataContext from "../context/userContext";



function UpdateProfile() {

  const { accessToken } = useContext(UserDataContext);
  const [userData, setUserData] = useState({});
  const { userId } = useParams();




  // handler post update profile
  const handlerupdateUserProfile = (formData) => {
    console.log("form", formData);
    fetch('http://localhost:8080/api/v1/user/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)

    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

  }

  // handler from submit
  const handlerSubmitForm = (e) => {
    e.preventDefault();

    let formData = {};
    const form = new FormData(document.getElementById('updateFormElement'));

    for (let [key, value] of form.entries()) {
      if (value !== 'none')
        formData[key] = value;
    }


    handlerupdateUserProfile(formData);

  }

  useEffect(() => {
    const userProfileData = getLocalStorage('user_Profile_data');


    if (!userProfileData._id) {
      fetch('http://localhost:8080/api/v1/user/profile/' + userId).then(res => res.json()).then(data => {

        if (data.status === 'success') {

          setUserData(data.user);
          setLocalStorage('user_Profile_data', data.user);
        }

      }).catch(err => console.log(err));
    }

    else
      setUserData(userProfileData);



  }, []);

  return (
    <form className={settingStyle.updateCompMainDiv} id="updateFormElement" onSubmit={handlerSubmitForm}>

      <div>
        <img src="" className="w-16 h-16 rounded-full bg-white" />
      </div>

      <InputBox label={'Username'} placeholder={'Enter name'} id={"username"} value={userData.username} />

      <div className='w-[80%]' >
        <label className={formStyle.lable} htmlFor='gender'>Gender</label>
        <select defaultValue={userData.gender} name="gender" id="gender" className={formStyle.input}>
          <option value="none">none</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>

      <InputBox label={'Age'} placeholder={'Enter age'} id={'age'} value={userData.age} />

      <InputBox label={'Phone No'} placeholder={'Enter mobile no'} id={'phone'} value={userData.phone} />

      <InputBox label={' Full Adress'} placeholder={'Enter mobile no'} id={'adress'} value={userData.address} />

      <InputBox label={'LinkedIn'} placeholder={'Enter LinkedIn profile'} id={'LinkedIn'} value={userData.socialUrls?.LinkedIn} />

      <InputBox label={'Facebook'} placeholder={'Enter Facebook profile'} id={'Facebook'} value={userData.socialUrls?.Facebook} />

      <InputBox label={'Instragram'} placeholder={'Enter LinkedIn profile'} id={'Instragram'} value={userData.socialUrls?.Instagram} />

      <InputBox label={'Twitter'} placeholder={'Enter Twitter profile'} id={'Twitter'} value={userData.socialUrls?.Twitter} />

      <button type="submit" className={settingStyle.btn} >Update Profile</button>
    </form>
  )
}

export default UpdateProfile;