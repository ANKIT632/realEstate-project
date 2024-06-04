/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { commonStyle } from '../style'

function Review() {
  const [review, setReview] = useState([])

  const getTestimonialData = async () => {
    try{let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/review/all`);
    response = await response.json();
    setReview(response);}
    catch(err){
      //  console.log(err);
    }
  }

  useEffect(() => {
    getTestimonialData();
  }, []);

  console.log('review');
  return (
    <div className="mb-2 w-full flex flex-col items-center">
      <h3 className={commonStyle.heading + " text-center mt-6"}>Testimoials</h3>

      <div className=" mt-6 flex justify-center items-center space-x-4 max-md:flex-col max-md:space-y-5 max-sm:space-x-0 w-[97%]">

        {review.data?.slice(0, 4).map((item, idx) => {
          return <div className="bg bg-white h-[9rem] w-[17rem] relative shadow rounded-3xl  flex flex-col items-center  max-sm:w-[15rem] md:h-[10rem]" key={idx}  >

            <img src={item.user.profile_url} className="w-16 h-16 rounded-full bg-gray-100 relative -top-4  p-1" />

            <p className="text text-center text-blue-900 text-xs font-bold italic my-1 ">&ldquo;
              {item.about.substring(0, 95)} {item.about.length >= 80 ? ".." : " "} &bdquo;</p>
            <h1 className="font-semibold text text-center text-blue-600 text-xs  italic ">By : {item.user.username}</h1>
          </div>
        })

        }
      </div>

    </div>
  )
}

export default Review;