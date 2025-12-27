/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { commonStyle } from '../style';

function Review() {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/property/review/all`)
      .then(res => res.json())
      .then(data => {
        setReview(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white via-slate-50 to-white">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className={commonStyle.heading}>What Our Customers Say</h2>
        <p className="text-gray-500 text-sm mt-2">
          Real experiences from real property buyers and sellers
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        /* Skeleton Loader */
        <div className="flex gap-6 px-6 overflow-x-auto">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="min-w-[260px] h-[200px] rounded-2xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="
              flex gap-6 px-6 overflow-x-auto scrollbarStyle
              snap-x snap-mandatory scroll-smooth
            ">
            {review?.data?.slice(0, 8).map((item, idx) => (
              <div
                key={idx}
                className="
                  snap-center min-w-[260px] max-w-[260px]
                  bg-white/80 backdrop-blur-lg
                  rounded-3xl shadow-lg
                  p-5 flex flex-col items-center
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl
                "
              >
                {/* Avatar */}
                <img
                  src={item.user.profile_url}
                  alt={item.user.username}
                  className="
                    w-16 h-16 rounded-full
                    border-4 border-white shadow
                    -mt-10 bg-gray-100
                  "
                />

                {/* Quote */}
                <p className="text-center text-gray-700 text-sm italic mt-4 leading-relaxed">
                  “{item.about.substring(0, 100)}
                  {item.about.length > 100 && '…'}”
                </p>

                {/* User */}
                <div className="mt-4">
                  <span className="
                    text-xs font-semibold text-blue-600
                    bg-blue-50 px-3 py-1 rounded-full
                  ">
                    {item.user.username}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fade Edges (optional aesthetic) */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
        </div>
      )}
    </section>
  );
}

export default Review;
