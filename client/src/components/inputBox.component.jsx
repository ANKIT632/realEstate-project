/* eslint-disable react/prop-types */
import {formStyle} from '../style'
import { useEffect, useState } from 'react';

export default function InputBox({label,placeholder,id,value}) {
 useEffect(()=>{
  document.getElementById(id).value=value;
  
 },[value])

  return (
    
    <div className='w-[80%]'>
        <label className={formStyle.lable} htmlFor={label}>{label}</label>
        <input type='text' name={id} id={id}  placeholder={placeholder}  autoComplete="true" className={formStyle.input} />
    </div>

  )
}
