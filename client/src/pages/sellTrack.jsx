import { useEffect, useState } from 'react';
import {getSession} from '../localSession/authSession';
import SellTrackComponent from '../components/sellTrackComponent';


function SellTrack() {

  const [isSellData, setIsSellData] = useState({});


  const getOwnSellData = async () => {
    try {
      const token= await getSession('access_token');
    
      const response = await fetch('http://localhost:8080/api/v1/owner/selling/properties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setIsSellData(data);
      console.log(data);
    }

    catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
 
    getOwnSellData();

  }, [])

  return (
    <div className="w-full min-h-[94vh]">
      <SellTrack/>
    </div>
  )
}

export default SellTrack;