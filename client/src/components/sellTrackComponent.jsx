/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserDataContext from '../context/userContext';

function SellTrackComponent({ data, date, onMarkSold }) {
  const [visitorData, setVisitorData] = useState({});
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isSoldLoading, setIsSoldLoading] = useState(false);
  const { accessToken } = useContext(UserDataContext);
  const location = useLocation();

  const getVisitorData = async (propertyId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/visitors/${propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      });

      const result = await response.json();
      setVisitorData(result);
      setIsVisitOpen((prev) => !prev);
    }
    catch (err) {
      alert(err.message || 'Failed to load visitors');
    }
  };

  const handleMarkSold = async () => {
    if (!onMarkSold || data?.isSold) {
      return;
    }

    setIsSoldLoading(true);
    try {
      await onMarkSold(data._id);
    }
    finally {
      setIsSoldLoading(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col gap-4 p-4 md:flex-row">
        <div className="w-full md:w-[210px]">
          <img
            src={data?.imagesUrl[0]}
            alt="property"
            className="h-40 w-full rounded-xl object-cover bg-slate-200 md:h-32"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-cyan-700">{data?.title}</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${data?.isSold ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {data?.isSold ? 'Sold' : 'Live'}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
            <p><strong>Price:</strong> {data?.price}</p>
            <p><strong>City:</strong> {data?.location?.city}</p>
            <p className="sm:col-span-2"><strong>Description:</strong> {data?.description}</p>
            {location.pathname === '/buyTrack' && <p><strong>Visit Date:</strong> {date}</p>}
            {location.pathname === '/buyTrack' && <p><strong>Negotiable:</strong> {data?.nagotiate ? 'Yes' : 'No'}</p>}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {location.pathname !== '/buyTrack' && (
              <button
                type="button"
                onClick={() => getVisitorData(data._id)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {isVisitOpen ? 'Hide Visitors' : 'Show Visitors'}
              </button>
            )}

            {location.pathname !== '/buyTrack' && !data?.isSold && (
              <button
                type="button"
                disabled={isSoldLoading}
                onClick={handleMarkSold}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white ${isSoldLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                {isSoldLoading ? 'Saving...' : 'Mark As Sold'}
              </button>
            )}
          </div>
        </div>
      </div>

      {isVisitOpen && !visitorData?.message && (
        <div className="border-t border-slate-200 bg-slate-50 p-3">
          <div className="flex flex-wrap gap-3">
            {visitorData?.visitors?.visitors?.map((visitor, idx) => (
              <div key={idx} className="min-w-[90px] rounded-lg border border-slate-200 bg-white p-2 text-center">
                <img src={visitor?.visitorDetails?.profile_url} alt="visitor" className="mx-auto h-10 w-10 rounded-full bg-slate-200" />
                <p className="mt-1 truncate text-xs font-semibold text-cyan-700">{visitor?.visitorDetails?.username}</p>
                <p className="text-[11px] text-slate-600">{visitor?.visitedAt?.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {visitorData?.message && isVisitOpen && (
        <p className="border-t border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-rose-600">{visitorData.message}</p>
      )}
    </article>
  );
}

export default SellTrackComponent;
