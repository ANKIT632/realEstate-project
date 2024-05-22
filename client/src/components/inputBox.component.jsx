/* eslint-disable react/prop-types */
import {formStyle} from '../style'

export default function InputBox({label,type,placeholder}) {
  return (
    
    <div className='w-[80%]'>
        <label className={formStyle.lable} htmlFor={label}>{label}</label>
        <input type={type} placeholder={placeholder} required autoComplete="true" className={formStyle.input}/>
      
    </div>

  )
}
