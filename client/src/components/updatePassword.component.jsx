import { settingStyle, formStyle } from '../style'
import { useState, useContext } from "react";
import UserDataContext from "../context/userContext";

function UpdatePassword() {

  const { accessToken } = useContext(UserDataContext);
  const [passwordVisibility1, setPasswordVisibility1] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  
  // handler post update profile
  const handlerupdateUserProfile = (formData) => {

    fetch('http://localhost:8080/api/v1/user/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)

    }).then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert(data.message);
        }
        else {
          alert(data.message);
        }

      }).catch(error => console.error('Error:', error));

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


  const handlePasswordVisibility1 = () => {
    setPasswordVisibility1(!passwordVisibility1);

  }
  const handlePasswordVisibility2 = () => {
    setPasswordVisibility2(!passwordVisibility2);

  }


  return (
    <form className={settingStyle.updateCompMainDiv} onSubmit={handlerSubmitForm} id='updateFormElement'>

      <div className={formStyle.divStyle + " relative"}>

        <label className={formStyle.lable} htmlFor="currentPassword">
           Current Password
        </label>

        <input className={formStyle.input + ' pr-7 '} id="currentPassword" type={passwordVisibility1 ? "text" : "password"} placeholder="Enter Password" name="password" required />

        {passwordVisibility1 ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility1}></i> : <i className="fi fi-ss-eye-crossed  cursor-pointer absolute top-8 right-2" onClick={handlePasswordVisibility1}></i>}
      </div>

      <div className={formStyle.divStyle + " relative"}>

        <label className={formStyle.lable} htmlFor="newPassword">
        New Password
        </label>

        <input className={formStyle.input + ' pr-7 '} id="newPassword" type={passwordVisibility2 ? "text" : "password"} placeholder="Enter Password" name="newPassword" required />

        {passwordVisibility2 ? <i className="fi fi-ss-eye absolute top-8 right-2 cursor-pointer" onClick={handlePasswordVisibility2}></i> : <i className="fi fi-ss-eye-crossed  cursor-pointer absolute top-8 right-2" onClick={handlePasswordVisibility2}></i>}
      </div>

      <button className={settingStyle.btn}>Update password</button>
    </form>
  )
}

export default UpdatePassword;