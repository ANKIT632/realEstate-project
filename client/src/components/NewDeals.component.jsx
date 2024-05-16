import { useEffect, useState } from 'react'
import { commonStyle } from '../style'
import SingleCard from './singleCard.component'

function NewDeals() {

  const [deals, setDeals] = useState([]);


  useEffect(() => {
    fetch('https://realestate-project-6mri.onrender.com/api/v1/selling/property/all?page=1&size=4')
      .then(response => response.json())
      .then(data => setDeals(data));
  }, [])

 

  return (
    <div className='w-full my-3 '>
      <h2 className={commonStyle.heading}>New Deals</h2>

      <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center'>
        {
          deals.allProperty?.length && deals?.allProperty.map((data, idx) => {
            return <SingleCard key={idx} data={data} />
          })}

      </div>
      <div className='w-full flex justify-center '>
        <button className={commonStyle.authBtn + " relative text-sm"}>Get All Deals</button>
      </div>
    </div>
  )
}

export default NewDeals