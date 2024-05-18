import React, { useEffect } from 'react'
import SingleCard from '../components/singleCard.component';
import { commonStyle } from '../style'
import { FcNext, FcPrevious } from "react-icons/fc";

function AllDeals() {
  const [pageNo, setPageNo] = React.useState(1);
  const [dealsData, setDealsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  // fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://realestate-project-6mri.onrender.com/api/v1/selling/property/all?page=${pageNo}&size=10`);
      const data = await response.json();


      setDealsData(data);
      setIsLoading(false);



    } catch (error) {
      console.error('Error:', error);
    }
  };

  // next page 
  const nextPageHanddler = () => {

    setPageNo(pageNo + 1);
  };


  // pre page  
  const prePageHandler = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };


  useEffect(() => {
    fetchData();
  }, [pageNo]);


  return (
    <div className=' w-full overflow-hidden min-h-[90vh]'>
      {(!isLoading) ? <><h2 className="">New Deals</h2>

        <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center '>
          {
            dealsData.allProperty?.length && dealsData?.allProperty.map((data, idx) => {
              return <SingleCard key={idx} data={data} />
            })}

        </div>
        <div className='flex justify-between px-4 pb-3 md:px-24'>

          <div className='p-x-0.5 bg-gray-200 hover:bg-gray-300 rounded-sm shadow border border-gray-300 md:p-1'> <FcPrevious className='cursor-pointer text-[25px]' onClick={prePageHandler} />
          </div>
          <div className='p-x-0.5 bg-gray-200 hover:bg-gray-300 rounded-sm shadow border border-gray-300 md:p-1'>
            <FcNext className='cursor-pointer text-[25px]' onClick={nextPageHanddler} />
          </div>
        </div>
      </> 
      : <p className={"h-screen flex justify-center items-center "}>loading...</p>
      }


    </div>
  );
}

export default AllDeals;