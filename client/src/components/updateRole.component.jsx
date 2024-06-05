/* eslint-disable no-undef */
import { settingStyle, formStyle } from '../style'
import { useContext } from "react";
import UserDataContext from "../context/userContext";
import { useNavigate } from 'react-router-dom';
import { deleteSession } from '../localSession/authSession';
import { removeLocalStorage } from '../localSession/userLocaldata';

function UpdateRole() {

  const { userData, accessToken, setUserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  // handdler role update
  const handlerupdateUserRole = async (formData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData)

      })

      if (res.status === 200) {
        deleteSession('user_data');
        deleteSession('access_token');
        setUserData({});
        deleteSession('userId');
        removeLocalStorage('user_Profile_data');

        navigate('/auth');
      }


    }
    catch (err) {
      alert(err);
    }
  }

  // handler from submit
  const handlerSubmitForm = (e) => {
    e.preventDefault();

    let formData = {};

    const currentRole = userData.role === 'Seller' ? 'seller' : 'buyer'
    if (currentRole !== e.target.role.value) {

      formData.role = e.target.role.value;
      handlerupdateUserRole(formData);


    }

  }



  return (
    <form className={settingStyle.updateCompMainDiv} onSubmit={handlerSubmitForm}>

      <div className='w-[80%]' >

        <label className={formStyle.lable} htmlFor='role'>Role</label>
        <select defaultValue={userData.role === 'Seller' ? 'seller' : 'buyer'} name="role" id="role" className={formStyle.input}>

          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button type='submit' className={settingStyle.btn + " sm:mt-6 bg-green-400 hover:bg-green-500 active:bg-green-600"}>Update Role</button>
      </div>

    </form>
  )
}

export default UpdateRole;