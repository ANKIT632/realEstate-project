/* eslint-disable no-undef */
import { settingStyle, formStyle } from '../style'
import { useState, useContext } from "react";
import UserDataContext from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../localSession/authSession';

function DeleteAcconunt() {


  const { accessToken } = useContext(UserDataContext);
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const navigate=useNavigate();
  const { setUserData} = useContext(UserDataContext);

  // handler post update profile
  const handlerupdateUserProfile = (formData) => {

    fetch(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)

    }).then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert(data.message);

          deleteSession('user_data');
          deleteSession('access_token');
          setUserData({});
          deleteSession('userId');
          navigate('/');

        }
        else {
          alert(data.message);
        }

      }).catch(error => alert(error.message));

  }

  // handler from submit
  const handlerSubmitForm = (e) => {
    e.preventDefault();

    let formData = {};
    formData['password'] = e.target.password.value;

    handlerupdateUserProfile(formData);
  }


  const handlePasswordVisibility1 = () => {
    setPasswordVisibility1(!passwordVisibility1);

  }



  return (
    <form className={settingStyle.updateCompMainDiv} onSubmit={handlerSubmitForm}>

      <div className={formStyle.divStyle + " relative"}>

        <label className={formStyle.lable} htmlFor="password">
       Password
        </label>

        <input className={formStyle.input + ' pr-7 '} id="password" type={passwordVisibility1 ? "text" : "password"} placeholder="Enter Password" name="password" required />

        {passwordVisibility1 ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility1}></i> : <i className="fi fi-ss-eye-crossed  cursor-pointer absolute top-8 right-2" onClick={handlePasswordVisibility1}></i>}
      </div>
  
      <button type='submit' className={settingStyle.btn+ " sm:mt-6 bg-red-400 hover:bg-red-500 active:bg-red-600"}> delete account</button>
    </form>
  )
}

export default DeleteAcconunt;