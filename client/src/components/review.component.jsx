/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState, useRef } from "react";
import { commonStyle } from '../style';
import { FaStar } from "react-icons/fa";

function Review() {
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/property/review/all`)
      .then(res => res.json())
      .then(data => {
        setReview(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  /* Auto Scroll */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 260, behavior: 'smooth' });
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [review]);

  return (
    <section className="w-full py-14 bg-gradient-to-b from-white via-slate-50 to-white">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className={commonStyle.heading}>What Our Clients Say</h2>
        <p className="text-gray-500 text-sm mt-1">
          Trusted by buyers and sellers across India
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[200px] rounded-2xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Mobile Slider */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 px-6 overflow-x-auto scrollbarStyle
              snap-x snap-mandatory scroll-smooth
              md:hidden
            "
          >
            {review.data?.slice(0, 8).map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="
            hidden md:grid
            grid-cols-2 lg:grid-cols-3 gap-8 px-8
          ">
            {review.data?.slice(0, 6).map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="
      bg-white rounded-3xl shadow-md
      hover:shadow-2xl hover:-translate-y-2
      transition-all duration-300
      p-6 flex flex-col items-center
      min-w-[240px]
    ">
      {/* Avatar */}
      <img
        src={item.user.profile_url}
        alt={item.user.username}
        className="
          w-16 h-16 rounded-full
          border-4 border-white
          shadow -mt-10 bg-gray-100
        "
      />

      {/* Stars */}
      <div className="flex gap-1 mt-3 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} size={14} />
        ))}
      </div>

      {/* Review */}
      <p className="text-center text-gray-700 text-sm italic mt-3 leading-relaxed line-clamp-4">
        “{item.about}”
      </p>

      {/* Username */}
      <span className="
        mt-4 text-xs font-semibold
        text-blue-600 bg-blue-50
        px-3 py-1 rounded-full
      ">
        {item.user.username}
      </span>
    </div>
  );
}

export default Review;
