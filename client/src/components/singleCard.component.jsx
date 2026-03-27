/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useMemo, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import UserDataContext from '../context/userContext';
import { isPropertyFavourite, toggleFavouriteProperty } from '../localSession/favProperty';

function SingleCard({ data, onFavouriteToggle }) {
  const { userData, accessToken, isAuthenticated } = useContext(UserDataContext);
  const [isFav, setIsFav] = useState(isPropertyFavourite(data?._id));

  const ownerProfile = useMemo(() => {
    return data?.owner?.profile_url || 'https://via.placeholder.com/80';
  }, [data?.owner?.profile_url]);

  const ownerName = data?.owner?.username || 'Owner';

  const HandlerGetSchedule = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to get a visit schedule');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/create/visitor/${data._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const result = await response.json();
      if (!response.ok || result.status !== 'success') {
        throw new Error(result.message || 'Unable to create schedule');
      }

      alert(result.message || 'Visit schedule created');
    }
    catch (err) {
      alert(err.message || 'Schedule request failed');
    }
  };

  const handleToggleFavourite = () => {
    if (!isAuthenticated) {
      alert('Please sign in to use favourites');
      return;
    }

    const nextData = toggleFavouriteProperty(data);
    if (onFavouriteToggle) {
      onFavouriteToggle(nextData);
    }
    setIsFav((prev) => !prev);
  };

  return (
    <div
      key={data?._id}
      className="bg-white w-full max-w-[780px] rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
    >
      <span
        className={`absolute top-3 right-3 z-10 px-3 py-1 text-xs font-semibold rounded-full shadow ${
          data?.isSold
            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
        }`}
      >
        {data?.isSold ? 'Sold Out' : 'Available'}
      </span>

      <button
        type="button"
        aria-label="toggle-favourite"
        onClick={handleToggleFavourite}
        className="absolute top-3 left-3 z-10 h-8 w-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-105 transition"
      >
        {isFav ? <FaHeart className="text-rose-500" /> : <FaRegHeart className="text-slate-700" />}
      </button>

      <div className="flex gap-4 p-4">
        <div className="relative flex-shrink-0">
          <img
            src={data?.imagesUrl[0]}
            alt="property"
            className="w-[180px] h-[140px] sm:w-[220px] sm:h-[160px] object-cover rounded-xl bg-gray-200"
          />

          <div className="flex items-center gap-2 mt-2 px-1">
            <img
              src={ownerProfile}
              alt="owner"
              className="h-6 w-6 rounded-full border"
            />
            <span className="text-xs font-medium text-gray-600">
              {ownerName}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-blue-700 leading-tight">
              {data?.title}
            </h3>

            <p className="text-sm text-gray-700">
              <strong>City:</strong>{' '}
              <span className="text-blue-600">
                {data?.location?.city}
              </span>
            </p>

            <p className="text-sm text-gray-700">
              <strong>Price:</strong>{' '}
              <span className="text-blue-600 font-semibold">
                {data?.price}
              </span>
            </p>

            <p className="text-xs text-gray-600 line-clamp-2">
              {data?.description}
            </p>
          </div>

          {(userData.role === 'Buyer' || userData.role === 'Seller') && !data?.isSold && (
            <button
              onClick={HandlerGetSchedule}
              className="self-start mt-3 px-4 py-1.5 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow transition"
            >
              Get Schedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
