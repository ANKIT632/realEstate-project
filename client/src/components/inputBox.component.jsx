/* eslint-disable react/prop-types */

export default function InputBox({label,type,value}) {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
        <input type={type} value={value}/>
    </div>
  )
}
