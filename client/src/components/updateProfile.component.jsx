import InputBox from "./inputBox.component";
import {settingStyle} from '../style'
function UpdateProfile() {
  return (
    <form className={settingStyle.updateCompMainDiv}>

      <div>
      <img src="" className="w-16 h-16 rounded-full bg-white"/>
      </div>
      <InputBox type={'text'} label={'Username'} placeholder={'Enter name'}/>
      <InputBox type={'text'} label={'Mobile Number'} placeholder={'Enter mobile no'}/>
      <InputBox type={'text'} label={'Gender'} placeholder={'Enter gender'}/>
      <InputBox type={'text'} label={'Age'} placeholder={'Enter age'}/>
      <InputBox type={'text'} label={'LinkedIn'} placeholder={'Enter LinkedIn profile'}/>
      <InputBox type={'text'} label={'Facebook'} placeholder={'Enter Facebook profile'}/>
      <InputBox type={'text'} label={'Instragram'} placeholder={'Enter LinkedIn profile'}/>
      <InputBox type={'text'} label={'Twitter'} placeholder={'Enter Twitter profile'}/>

    <buttom className={settingStyle.btn}>Update Profile</buttom>
    </form>
  )
}

export default UpdateProfile;