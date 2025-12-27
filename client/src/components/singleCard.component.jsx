/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { commonStyle } from '../style'
import UserDataContext from '../context/userContext';
import { useContext } from 'react';


function SingleCard({ data }) {

    const { userData, accessToken } = useContext(UserDataContext);

    const HandlerGetSchedule = async () => {
        try {

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/property/create/visitor/${data._id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });




        }
        catch (err) {
            // console.log("error in get schedule",err)
        }

    }

    return (
        <div
            key={data?._id}
            className="
      bg-white w-full max-w-[780px]
      rounded-2xl shadow-md
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300
      overflow-hidden relative
    "
        >
            {/* STATUS BADGE */}
            <span
                className={`
        absolute top-3 right-3 z-10
        px-3 py-1 text-xs font-semibold
        rounded-full shadow
        ${data?.isSold
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                    }
      `}
            >
                {data?.isSold ? 'Sold Out' : 'Available'}
            </span>

            <div className="flex gap-4 p-4">

                {/* IMAGE */}
                <div className="relative flex-shrink-0">
                    <img
                        src={data?.imagesUrl[0]}
                        alt="property"
                        className="
            w-[180px] h-[140px]
            sm:w-[220px] sm:h-[160px]
            object-cover rounded-xl
            bg-gray-200
          "
                    />

                    {/* OWNER INFO */}
                    <div className="flex items-center gap-2 mt-2 px-1">
                        <img
                            src={data?.owner?.profile_url}
                            alt="owner"
                            className="h-6 w-6 rounded-full border"
                        />
                        <span className="text-xs font-medium text-gray-600">
                            {data?.owner?.username}
                        </span>
                    </div>
                </div>

                {/* CONTENT */}
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

                    {/* ACTION */}
                    {(userData.role === 'Buyer' || userData.role === 'Seller') &&
                        !data?.isSold && (
                            <button
                                onClick={HandlerGetSchedule}
                                className="
                self-start mt-3
                px-4 py-1.5
                text-xs font-semibold
                text-white
                rounded-full
                bg-gradient-to-r from-green-500 to-green-600
                hover:from-green-600 hover:to-green-700
                shadow
                transition
              "
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

