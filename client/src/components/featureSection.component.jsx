import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { commonStyle } from '../style'
import { useState, useEffect } from "react";

const images = [
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  'https://images.unsplash.com/photo-1658253614194-85603071f903?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1655322126436-9dd898d4a636?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  'https://images.unsplash.com/photo-1699636250199-2a6998981619?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570356811230-2f3b816ebb29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1565838500329-d10006e80f55?q=80&w=1861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623495349319-e2e1c06efced?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const cityName = [
  "Delhi",
  "Mumbai",
  "Noida",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Gurgaon"
];

function FeatureSection() {

  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section className="w-full py-16 bg-gradient-to-b from-white via-slate-50 to-slate-100">

      {/* HEADER */}
      <div className="text-center mb-10 px-4">
        <h2 className={`${commonStyle.heading}`}>
          Explore Properties Across India
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm">
          Premium homes in top cities, curated for lifestyle & investment.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        {/* SKELETON */}
        {!loaded && (
          <div className="h-[500px] rounded-3xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse shadow-xl"></div>
        )}

        {loaded && (
          <>
            {/* PROGRESS BAR */}
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-black transition-all duration-[4000ms]"
                style={{
                  width: `${((current + 1) / images.length) * 100}%`,
                }}
              ></div>
            </div>

            <Carousel
              autoPlay
              infiniteLoop
              emulateTouch
              showStatus={false}
              showThumbs={false}
              interval={4000}
              transitionTime={800}
              onChange={(index) => setCurrent(index)}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-3xl shadow-2xl group"
                >
                  {/* IMAGE */}
                  <img
                    src={image}
                    alt={cityName[index]}
                    className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* FLOATING CARD */}
                  <div className="absolute bottom-8 left-8 right-8 sm:w-[320px]
                                  bg-white/15 backdrop-blur-xl border border-white/20
                                  rounded-2xl p-5 text-white shadow-xl">

                    <h3 className="text-2xl font-bold">
                      {cityName[index]}
                    </h3>

                    <p className="text-xs text-gray-200 mt-1">
                      Verified properties · Trusted developers
                    </p>

                    <div className="flex gap-4 mt-4 text-xs">
                      <div>
                        <p className="font-semibold">2,500+</p>
                        <p className="text-gray-300">Listings</p>
                      </div>
                      <div>
                        <p className="font-semibold">₹45L+</p>
                        <p className="text-gray-300">Starting</p>
                      </div>
                    </div>

                    <button
                      className="mt-5 w-full bg-white text-black py-2 rounded-xl
                                 font-semibold text-sm hover:bg-gray-100 active:scale-95 transition"
                    >
                      Explore Properties
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </section>

  );
}

export default FeatureSection;