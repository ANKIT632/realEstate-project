/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { commonStyle } from '../style'
import SingleCard from './singleCard.component'
import { useNavigate } from 'react-router-dom';

function NewDeals() {

  const [deals, setDeals] = useState([]);
  const [isLoading,setIsLoading]=useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/selling/property/all?page=1&size=6`)
      .then(response => response.json())
      .then(data =>{ setDeals(data)
         setIsLoading(false);
      });


  }, [])



  const handllerNavigate = () => {
    navigate('/allDeals')
  }

  return (
    <div className='w-full my-3 '>
      <h2 className={commonStyle.heading}>New Deals</h2>
 
   {
      !isLoading?<>
      <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center '>
        {
          deals.allProperty?.length && deals?.allProperty.map((data, idx) => {
            return <SingleCard key={idx} data={data} />
          })}

      </div>
      <div className='w-full flex justify-center '>
        <button className={commonStyle.authBtn + " relative text-sm"} onClick={handllerNavigate}>Get All Deals</button>
      </div>
     </>:<div className='w-full flex justify-center items-center  h-40'>
         <h4 className='text-center font-bold font-mono'>Loading...</h4>
     </div>
   }
    </div>
  )
}

export default NewDeals