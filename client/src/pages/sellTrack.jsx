/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import {getSession} from '../localSession/authSession';
import SellTrackComponent from '../components/sellTrackComponent';


function SellTrack() {

  const [sellData, setSellData] = useState({});


  


   // get all seller property
  const getOwnSellData = async () => {
    try {
      const token= await getSession('access_token');
    
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/owner/selling/properties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSellData(data);

    }

    catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
 
    getOwnSellData();

  }, [])

  return (
    <div className="w-full min-h-[94vh] flex flex-col max-md:items-center mt-3 md:grid md:grid-cols-2 ">
    {
        sellData.totalProperty && sellData.allProperty?.map((data, idx) => 
      <SellTrackComponent data={data} key={idx}/>
         )
    }
    </div>
  )
}

export default SellTrack;