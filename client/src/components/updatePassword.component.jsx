import InputBox from "./inputBox.component";
import {settingStyle} from '../style'

function UpdatePassword() {
  return (
    <form className={settingStyle.updateCompMainDiv}>

    <InputBox type={'text'} label={'current password'} placeholder={'Enter current password'}/>
    <InputBox type={'text'} label={'New password'} placeholder={'Enter new password'}/>
    
    <buttom className={settingStyle.btn}>Update password</buttom>
    </form>
  )
}

export default UpdatePassword;