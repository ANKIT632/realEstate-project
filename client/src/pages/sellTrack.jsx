/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { getSession } from '../localSession/authSession';
import SellTrackComponent from '../components/sellTrackComponent';


function SellTrack() {

  const [sellData, setSellData] = useState({});
  const [isLoading,setIsLoading]=useState(true);


  // get all seller property
  const getOwnSellData = async () => {
    try {
      const token = await getSession('access_token');

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/owner/selling/properties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
 
      setSellData(data);
      setIsLoading(false);
    
    }

    catch (err) {
      alert("error",err.message);
    }
  }


  useEffect(() => {

    getOwnSellData();

  }, [])

  return (
    (!isLoading)?
    <div className=' min-h-[94vh]'>
    <div className="w-full flex flex-col  max-md:items-center md:justify-items-center mt-4 md:grid md:grid-cols-2  ">
      {
        sellData.totalProperty && sellData.allProperty?.map((data, idx) =>
          <SellTrackComponent data={data} key={idx} />
        )
      }
    </div></div>:<h1 className='text-center font-mono min-h-[93vh]'>Loading...</h1>
  )
}

export default SellTrack;