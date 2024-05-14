import { useEffect, useState } from 'react'
import { commonStyle } from '../style'

function NewDeals() {

  const [deals, setDeals] = useState([]);


  useEffect(() => {
    fetch('https://realestate-project-6mri.onrender.com/api/v1/selling/property/all?page=1&size=4')
      .then(response => response.json())
      .then(data => setDeals(data));
  }, [])

  // console.log(deals.allProperty.imagesUrls);

  return (
    <div className='w-full my-3 '>
      <h2 className={commonStyle.heading}>New Deals</h2>

      <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center'>
        {


          deals.allProperty?.length && deals?.allProperty.map((data, idx) => {
            console.log(data);
            return (<div key={idx} className='bg-white mb-3 py-3 w-[95%] px-2 rounded-xl  shadow-md hover:shadow-lg '>
              <div className='flex'>
                <div>
                  <img src={data?.imagesUrl[0]} alt='img' className='w-[230px] h-32 rounded-2xl max-sm:h-28 max-sm:w-[180px] max-xs:h-20  max-xs:w-[120px] bg-gray-400' />

                  <div className='flex items-center mt-2 ml-1'>

                    <h3 className={"pl-1 text-xs font-bold max-sm:text-[11px] max-xs:hidden"}>owner : </h3>



                    <h3 className={"px-1  text-xs font-bold max-sm:text-[11px] text-blue-700"}>{data.owner.username}</h3>

                    <img src={data.owner.profile_url} alt='img' className='h-5 w-5 bg-gray-400 rounded-[50%] cursor-pointer' />

                  </div>
                </div>

                <div className='pl-2 pt-1 md:pl-6'>
                  <h3 className={" text-sm  md:text-lg font-bold text-blue-600"}>{data.title}</h3>
                  <h3 className={"  text-xs  font-bold text-black"}>Price : <strong className='text-blue-600 font-medium'> {data.price}</strong></h3>

                  <h3 className={"  text-xs font-bold text-black"}>City : <strong className='text-blue-600 font-medium '> {data.location.city}</strong></h3>


                  <h3 className={"  text-xs  font-bold text-black max-sm:hidden "}>Description : <strong className='text-blue-600 font-medium'> {data.description}</strong></h3>


                  <h3 className={"  text-xs   font-bold text-black"}>Sold : <strong className='text-blue-600 font-medium'> {data.isSold ? 'close for Buy' : 'open for Buy'}</strong></h3>

                  <button className={commonStyle.btn + " relative text-xs left-0 mt-1 "}>Known more</button>
                </div>


              </div>




            </div>)
          })}


      </div>
      <div className='w-full flex justify-center '>
        <button className={commonStyle.authBtn + " relative text-sm"}>Get All Deals</button>
      </div>
    </div>
  )
}

export default NewDeals