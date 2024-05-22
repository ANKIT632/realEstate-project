import InputBox from "./inputBox.component";
import {settingStyle} from '../style'

function DeleteAcconunt() {
  return (
    <form className={settingStyle.updateCompMainDiv}>

    <InputBox type={'text'} label={'password'} placeholder={'Enter current password'}/>

    
    <buttom className={settingStyle.btn+ " sm:mt-6 bg-red-400 hover:bg-red-500 active:bg-red-600"}> delete account</buttom>
    </form>
  )
}

export default DeleteAcconunt