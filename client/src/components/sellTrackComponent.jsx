/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import { useState, useContext } from 'react'
import { commonStyle } from '../style'
import { useLocation } from 'react-router-dom';
import UserDataContext from "../context/userContext";


function SellTrackComponent({ data, date }) {

  // get all visitor of property
  const [visitorData, setVisitorData] = useState({});
  const [isVisitShow, setIsVisitShow] = useState(true);
  const { accessToken } = useContext(UserDataContext);

  const location = useLocation();

  const getVisitorData = async (propertyId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/visitors/${propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${accessToken}`

        }
      });


      const data = await response.json();

      setIsVisitShow((pre) => !pre);
      setVisitorData(data);


    }

    catch (err) {
      // console.log(err.message);
    }
  }


  return (
    <div className='h-fit bg-white mb-3 py-3 w-[95%]  px-2 rounded-xl  shadow-md hover:shadow-lg '>


      <div className='flex max-xs:flex-col'>

        <div className='w-[200px] max-sm:w-[180px] max-xs:w-[150px]'>
          <img src={data?.imagesUrl[0]} alt='img' className='rounded-2xl w-full h-32 object-cover bg-gray-400 max-sm:h-28 max-xs:h-20' />
        </div>


        <div className='pl-2 pt-1 md:pl-6'>
          <h3 className={" text-sm  md:text-lg font-bold text-blue-600"}>{data.title}</h3>
          <h3 className={"  text-xs  font-bold text-black"}>Price : <strong className='text-blue-600 font-medium'> {data?.price}</strong></h3>

          <h3 className={"  text-xs font-bold text-black"}>City : <strong className='text-blue-600 font-medium '> {data?.location?.city}</strong></h3>

          <h3 className={"  text-xs  font-bold text-black  "}>Description : <strong className='text-blue-600 font-medium'> {data.description}</strong></h3>

          <h3 className={"  text-xs  font-bold text-black  "}>Status : <strong className='text-blue-600 font-medium'> {data?.isSold ? "Sold Out" : "Not Sold"}</strong></h3>


          {location.pathname === '/buyTrack' && <h3 className={`text-xs  font-bold text-black  `}>Negotiable Price : <strong className='text-blue-600 font-medium'> {data.nagotiate ? "Yes" : "No"}</strong></h3>
          }
          {/* <h3 className={"  text-xs   font-bold text-black"}>Sold : <strong className='text-blue-600 font-medium'> {data.isSold ? 'close for Buy' : 'open for Buy'}</strong></h3> */}


          {isVisitShow && <button className={commonStyle.btn + ` relative text-xs left-0 mt-1 ${location.pathname === '/buyTrack' ? ' hidden' : " "}`} onClick={() => getVisitorData(data._id)} >Show visitors</button>}

          {location.pathname === '/buyTrack' && <h3 className={`text-xs  font-bold text-black  `}>Visit At : <strong className='text-blue-600 font-medium'> {date}</strong></h3>
          }

        </div>
      </div>

      {!isVisitShow && !visitorData?.message && <div className={`h-[100px] w-full bg-gray-200 mt-2 flex space-x-1 items-center rounded-md`}>
        {

          visitorData?.visitors?.visitors?.map((data, idx) => {


            return (

              <div key={idx} className='m-1 flex flex-col items-center'>
                <img src={data?.visitorDetails?.profile_url} alt='img' className='h-[40px] w-[40px] rounded-[50%] bg-gray-300 ' />
                <strong className='text-xs text-blue-600 font-medium'> {data.visitorDetails.username}</strong>
                <h4 className='text-xs  font-bold text-black'>{data?.visitedAt.slice(0, 10)}</h4>
              </div>
            )
          })
        }
      </div>
      }

      {visitorData?.message && !isVisitShow && <h3 className='text-xs text-red-600 font-bold mt-2'>{visitorData.message}</h3>}

    </div>
  )
}

export default SellTrackComponent