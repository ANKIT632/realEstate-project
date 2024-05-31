/* eslint-disable react/prop-types */

import { useState } from 'react'
import { commonStyle } from '../style'



function SellTrackComponent({ data }) {

  // get all visitor of property
  const [visitorData, setVisitorData] = useState({});
  const [isVisitShow,setIsVisitShow]=useState(true);

  const getVisitorData = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/property/visitors/${propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setIsVisitShow((pre)=>!pre);
      setVisitorData(data);

    }

    catch (err) {
      console.log(err.message);
    }
  }


  return (
    <div className='h-fit bg-white mb-3 py-3 w-[95%] px-2 rounded-xl  shadow-md hover:shadow-lg '>


      <div className='flex'>
        <div>
          <div className='w-[200px] max-sm:w-[180px] max-xs:w-[120px]'>
            <img src={data?.imagesUrl[0]} alt='img' className='rounded-2xl w-full h-32 object-cover bg-gray-400 max-sm:h-28 max-xs:h-20' />
          </div>

        </div>

        <div className='pl-2 pt-1 md:pl-6'>
          <h3 className={" text-sm  md:text-lg font-bold text-blue-600"}>{data.title}</h3>
          <h3 className={"  text-xs  font-bold text-black"}>Price : <strong className='text-blue-600 font-medium'> {data?.price}</strong></h3>

          <h3 className={"  text-xs font-bold text-black"}>City : <strong className='text-blue-600 font-medium '> {data?.location?.city}</strong></h3>

          <h3 className={"  text-xs  font-bold text-black max-sm:hidden "}>Description : <strong className='text-blue-600 font-medium'> {data.description}</strong></h3>

          {/* <h3 className={"  text-xs   font-bold text-black"}>Sold : <strong className='text-blue-600 font-medium'> {data.isSold ? 'close for Buy' : 'open for Buy'}</strong></h3> */}


          {isVisitShow && <button className={commonStyle.btn + " relative text-xs left-0 mt-1 "} onClick={() => getVisitorData(data._id)} >Show visitors</button>}

        </div>
      </div>

      <div className={`h-[100px] w-full bg-gray-200 mt-2 flex space-x-1 items-center rounded-md`}>
        {

          visitorData?.visitors?.visitors?.map((data, idx) => {
         

            return (
                
              <div key={idx} className='m-1 flex flex-col items-center'>
                <img src={data?.visitorDetails?.profile_url} alt='img' className='h-[40px] w-[40px] rounded-[50%] bg-gray-300 ' />
                <strong className='text-xs text-blue-600 font-medium'> {data.visitorDetails.username}</strong>
                <h4 className='text-xs  font-bold text-black'>{data?.visitedAt.slice(0,10)}</h4>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default SellTrackComponent