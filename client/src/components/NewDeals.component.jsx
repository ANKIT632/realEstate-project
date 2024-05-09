import { useEffect, useState } from 'react'
import { commonStyle } from '../style'

function NewDeals() {

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('https://realestate-project-6mri.onrender.com/api/v1/selling/property/all')
      .then(response => response.json())
      .then(data => setDeals(data));
  }, [])

  // console.log(deals.allProperty.imagesUrls);

  return (
    <div className='my-3'>
      <h2 className={commonStyle.heading}>New Deals</h2>

      <div className='w-full flex flex-col justify-center items-center'>
      {

       
        deals.allProperty?.length && deals.allProperty.map((data, idx) => {
          console.log(data);
          return (<div key={idx} className='bg-white mb-3 py-3 w-[95%] px-2 rounded-xl  shadow-md hover:shadow-lg '>
            <div className='flex'>
              <div>
                <img src={data.imagesUrl[0]} alt='img' className='w-[300px] h-40 rounded-2xl' />
              </div>

              <div className='pl-2 pt-1 md:pl-6'>
                <h3 className={" text-sm  md:text-lg font-bold text-blue-600"}>{data.title}</h3>
                <h3 className={"  text-sm   font-bold text-black"}>Price : <strong className='text-blue-600 font-medium text-[12px]'> {data.price}</strong></h3>

                <h3 className={"  text-sm   font-bold text-black"}>City : <strong className='text-blue-600 font-medium text-[12px]'> {data.location.city}</strong></h3>

                
                <h3 className={"  text-sm   font-bold text-black"}>Description : <strong className='text-blue-600 font-medium text-[12px]'> {data.description}</strong></h3>

                
                <h3 className={"  text-sm   font-bold text-black"}>Sold : <strong className='text-blue-600 font-medium text-[12px]'> {data.isSold?'close for Buy':'open for Buy'}</strong></h3>

                <button className={commonStyle.btn +" relative text-[12px] left-1"}>Known more</button>
              </div>
              
             
            </div>

            <div className='flex items-center mt-2 ml-1'>
            
              <img src={data.owner.profile_url} alt='img' className='h-7 w-7 bg-gray-400 rounded-[50%] cursor-pointer '/>

              <h3 className={"pl-1 text-[13px] font-bold "}>{data.owner.username}</h3>
            </div>

           
          </div>)
        })}
        </div>  
    </div>
  )
}

export default NewDeals