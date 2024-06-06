/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { commonStyle } from '../style'

function Review() {
  const [review, setReview] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const getTestimonialData = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/review/all`);
      response = await response.json();
      setIsLoading(false);
      setReview(response);
    }
    catch (err) {
      //  console.log(err);
    }
  }

  useEffect(() => {
    getTestimonialData();
  }, []);


  return (
    <div className="mb-2  flex flex-col ">
      <h3 className={commonStyle.heading}>Testimoials</h3>

      {
        !isLoading ? <>
          <div className=" mt-2 gap-2 flex items-center overflow-x-scroll scrollbarStyle relative h-[12rem]">

            {review.data?.slice(0, 7).map((item, idx) => {
              return <div key={idx}> <div className="bg bg-white h-[9rem]   shadow rounded-3xl  flex flex-col items-center  w-[15rem]  "  >

                <img src={item.user.profile_url} className="w-16 h-16 rounded-full bg-gray-100 relative -top-4  p-1" />

                <p className="text text-center text-blue-900 text-xs font-bold italic my-1 ">&ldquo;
                  {item.about.substring(0, 95)} {item.about.length >= 80 ? ".." : " "} &bdquo;</p>
                <h1 className="font-semibold text text-center text-blue-600 text-xs  italic bg-gray-300 px-1 rounded-lg shadow-sm">By : {item.user.username}</h1>
              </div> </div>
            })

            }
          </div>
        </> : <div className='w-full flex justify-center items-center  h-40'>
          <h4 className='text-center font-bold font-mono'>Loading...</h4>
        </div>
      }

    </div>
  )
}

export default Review;