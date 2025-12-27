/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { commonStyle } from '../style';
import SingleCard from './singleCard.component';
import { useNavigate } from 'react-router-dom';

function NewDeals() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/selling/property/all?page=1&size=6`)
      .then(res => res.json())
      .then(data => {
        setDeals(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-slate-50 to-white">

      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className={`${commonStyle.heading} inline-block`}>
          🔥 New Deals
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Recently added properties you don’t want to miss
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        /* Skeleton Loader */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-[300px] rounded-2xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8">
            {deals?.allProperty?.length > 0 ? (
              deals.allProperty.map((data, idx) => (
                <div
                  key={idx}
                  className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-2xl"
                >
                  {/* New Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
                    NEW
                  </span>

                  {/* Card */}
                  <SingleCard data={data} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No deals available right now.
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="w-full flex justify-center mt-14">
            <button
              onClick={() => navigate('/allDeals')}
              className={`${commonStyle.authBtn}
                          px-10 py-3 text-sm font-semibold
                          shadow-lg hover:shadow-2xl
                          transition-all duration-300 text-nowrap`}
            >
              Explore All Properties →
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default NewDeals;
