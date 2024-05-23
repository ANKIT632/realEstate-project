import { useEffect, useState } from "react";
import { commonStyle } from '../style'

function Review() {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch('https://realestate-project-6mri.onrender.com/api/v1/property/review/all')
      .then(response => response.json())
      .then(data => setReview(data));

  }, []);

  console.log('review');
  return (
    <div className="mb-2 ">
      <h3 className={commonStyle.heading+" text-center mt-6"}>Testimoials</h3>

      <div className=" mt-6 flex justify-center items-center space-x-4 max-md:flex-col max-md:space-y-5 max-sm:space-x-0">

        {review.data?.slice(0,3).map((item, idx) => {
          return <div className="bg bg-gray-200 h-[12rem] w-[17rem] relative shadow rounded-3xl  flex flex-col items-center  max-sm:w-[16rem] max-md:h-[12rem]" key={idx}  >
         
            <img src={item.user.profile_url} className="w-16 h-16 rounded-full bg-gray-100 relative -top-4  p-1" />

            <p className="text text-center text-blue-900 text-sm italic my-2 ">&ldquo;
              {item.about.substring(0, 95)} {item.about.length >= 80 ? ".." : " "} &bdquo;</p>
            <h1 className="font-semibold text text-center text-blue-600 text-sm italic my-2">By : {item.user.username}</h1>
          </div>
        })

        }
      </div>

    </div>
  )
}

export default Review;