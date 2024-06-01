import { useEffect,useState } from "react";
import {getSession} from '../localSession/authSession';
import SellTrackComponent from "../components/sellTrackComponent";

function BuyTrack() {

const [scheduleData,setScheduleData]=useState([]);


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

      const response = await fetch(`http://localhost:8080/api/v1/property/visitor/schedule`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      const data=await response.json();
      
    
    setScheduleData(data);

     }
      catch(err){
              console.log(err);
      }

  }

 
  useEffect(()=>{
    handlerGetScheduleData();
  },[])
 
  return (
    <div className="w-full h-[95vh]">BuyTrack
     <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center '>
        {    
           
          scheduleData?.schedule?.map((data, idx) => {
            const date =getVisitDate(data.visitors)
            return (data?.propertyDetails && <SellTrackComponent key={idx} data={data?.propertyDetails}  date={date}/>)
          })

          }

      </div>
    </div>
  )
}

export default BuyTrack;