/* eslint-disable no-undef */
import { formStyle, commonStyle } from '../style';
import {getSession} from '../localSession/authSession'

function SellProperty() {


  const propertyAddInServer = (formData) => {
    const token =getSession('access_token');
    fetch(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/owner/selling/property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
      
    })
      .then(response => response.json())
      .then(data => {
       
        console.log(data.message);
      }).catch(err=>{
        console.log(err.message);
      });
    }


  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formElement = document.getElementById('formElement');


    let form = new FormData(formElement);
    let formData = {};
    formData.propertyInfo={};
    formData.location={};
    for (let [key, value] of form.entries()) {
      if(key==='bedrooms' || key==='bathrooms' ||key==='squareFeet'){
        formData.propertyInfo[key]=value;
      }
      else if(key=='city' || key=='region' || key=='country' ||key=='postalCode' ){
        formData.location[key]=value;
      }
      else
      formData[key] = value;
     
    }
     propertyAddInServer(formData);
  }
 

  return (

    <form id='formElement' className="w-full flex flex-col justify-center items-center pt-4 bg-slate-200">
      <div className={formStyle.mainFormDiv}>

        <div className='border-gray-900 bg-white pt-2 px-2 rounded-lg '>
          <h5 className={commonStyle.title + "shadow-lg bg-gray-50 ring-2 ring-black ring-opacity-5 rounded-lg p-1 "}>Sell property</h5>
        </div>

        <div className={formStyle.divStyle}>
          <label htmlFor="title" className={formStyle.lable}>title</label>
          <input type="text" name="title" id="title" placeholder="title" className={formStyle.input} />
        </div>

        <div className={formStyle.divStyle}>
          <label htmlFor="description" className={formStyle.lable}>Description</label>
          <textarea type="text" name="description" id="description" placeholder="write about property.." className={formStyle.input} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
          <div className={formStyle.divStyle}>
            <label htmlFor="city" className={formStyle.lable}>City</label>
            <input type="text" name="city" id="city" placeholder="City" className={formStyle.input} required />
          </div>

          <div className={formStyle.divStyle}>
            <label htmlFor="region" className={formStyle.lable}>Region</label>
            <input type="text" name="region" id="region" placeholder="Region" className={formStyle.input} />
          </div>

          <div className={formStyle.divStyle}>
            <label htmlFor="country" className={formStyle.lable}>Country</label>
            <input type="text" name="country" id="country" placeholder="Country" className={formStyle.input} required />
          </div>

          <div className={formStyle.divStyle}>
            <label htmlFor="postalCode" className={formStyle.lable}>Postal Code</label>
            <input type="text" name="postalCode" id="postalCode" placeholder="Postal Code" className={formStyle.input} />
          </div>
        </div>

        <div className={formStyle.divStyle}>
          <label htmlFor="price" className={formStyle.lable}>Price</label>
          <input type="number" name="price" id="price" placeholder="Price" className={formStyle.input} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 justify-items-center">
          <div className={formStyle.divStyle}>
            <label htmlFor="bedrooms" className={formStyle.lable}>Bedrooms</label>
            <input type="number" name="bedrooms" id="bedrooms" placeholder="Bedrooms" className={formStyle.input} />
          </div>

          <div className={formStyle.divStyle}>
            <label htmlFor="bathrooms" className={formStyle.lable}>Bathrooms</label>
            <input type="number" name="bathrooms" id="bathrooms" placeholder="Bathrooms" className={formStyle.input} />
          </div>

          <div className={formStyle.divStyle}>
            <label htmlFor="squareFeet" className={formStyle.lable}>Square Feet</label>
            <input type="number" name="squareFeet" id="squareFeet" placeholder="Square Feet" className={formStyle.input} />
          </div>
        </div>
        <div className={formStyle.divStyle}>
          <label htmlFor="category" className={formStyle.lable}>Category</label>
          <input type="text" name="category" id="category" placeholder="category" className={formStyle.input} defaultValue="none" />
        </div>
        <div className={formStyle.divStyle}>
          <label htmlFor="tags" className={formStyle.lable}>Tags</label>
          <input type="text" name="tags" id="tags" placeholder="Tags" className={formStyle.input} defaultValue="none" />
        </div>


      </div>

      <button type="submit" className={formStyle.authBtn + " mb-9"} onClick={formSubmitHandler}>Submit</button>

    </form>

  )
}

export default SellProperty;