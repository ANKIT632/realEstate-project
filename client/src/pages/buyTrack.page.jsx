/* eslint-disable no-undef */
import { useEffect,useState } from "react";
import {getSession} from '../localSession/authSession';
import SellTrackComponent from "../components/sellTrackComponent";

function BuyTrack() {

const [scheduleData,setScheduleData]=useState([]);
const [isLoading,setIsLoading]=useState(true);

const getVisitDate=(data)=>{ 
   const userId=getSession('userId');
 
   // get current visitor from array.
    const singleUserVisitor=data.filter((user)=>user.visitorDetails===userId);

    const date=singleUserVisitor[0].visitedAt.slice(0,10);
    return date;   
}
  const handlerGetScheduleData = async()=>{

     try{
      const token= await getSession('access_token');

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/visitor/schedule`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data=await response.json();
      
      setScheduleData(data);
    setIsLoading(false)
     }
      catch(err){
              // console.log(err);
      }

  }

 
  useEffect(()=>{
    handlerGetScheduleData();
  },[])
 
  return (
    (!isLoading)? <div className="w-full h-[95vh]">
     <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center mt-4'>
        {    
           
          scheduleData?.schedule?.map((data, idx) => {
            const date =getVisitDate(data.visitors)
            return (data?.propertyDetails && <SellTrackComponent key={idx} data={data?.propertyDetails}  date={date}/>)
          })

          }

      </div>
    </div>:<h1 className='text-center font-mono min-h-[95vh]'>Loading...</h1>
  )
}

export default BuyTrack;