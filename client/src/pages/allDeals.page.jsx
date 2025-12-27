/* eslint-disable no-undef */
import React, { useEffect, useContext } from 'react'
import SingleCard from '../components/singleCard.component';
import { FcNext, FcPrevious } from "react-icons/fc";
import UserDataContext from '../context/userContext';
import { IoMdRefreshCircle } from "react-icons/io";

function AllDeals() {
  const { searchQuery, setSearchQuery } = useContext(UserDataContext);
  const [pageNo, setPageNo] = React.useState(1);
  const [dealsData, setDealsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPage, setTotalPage] = React.useState(1);

  // fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = {};
      if (searchQuery.trim() !== '') {
        response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/selling/property/search?searchQuery=${searchQuery}&page=${pageNo}&size=10`);
      } else {
        response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/selling/property/all?page=${pageNo}&size=10`);
      }
      const data = await response.json();
      if (totalPage === 1) {
        setTotalPage(Math.ceil(data.totalProperty / 10.0));
      }
      setDealsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // next page 
  const nextPageHanddler = () => {
    if (pageNo < totalPage) setPageNo(pageNo + 1);
  };

  // previous page  
  const prePageHandler = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setPageNo(1);
  }

  useEffect(() => {
    fetchData();
  }, [pageNo, searchQuery]);

  return (
    <div className='w-full min-h-[90vh] p-4 bg-gray-50'>
      {/* Header */}
      <div className='flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4'>
        <h2 className="text-xl font-mono font-bold text-blue-700">Daily New Deals</h2>
        <IoMdRefreshCircle 
          className='text-2xl text-blue-600 cursor-pointer hover:text-blue-800 transform hover:rotate-180 transition-all duration-500' 
          onClick={handleRefresh} 
        />
      </div>

      {/* Deals Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg font-bold text-gray-700 font-mono animate-pulse">Loading...</p>
        </div>
      ) : dealsData.allProperty?.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {dealsData.allProperty.map((data, idx) => (
              <div key={idx} className='hover:scale-105 transition-transform duration-300'>
                <SingleCard data={data} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center gap-6 mt-6'>
            <button
              onClick={prePageHandler}
              disabled={pageNo === 1}
              className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-200 transition ${
                pageNo === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FcPrevious size={22} /> Previous
            </button>

            <span className="text-gray-700 font-semibold flex items-center justify-center">
              Page {pageNo} / {totalPage}
            </span>

            <button
              onClick={nextPageHanddler}
              disabled={pageNo === totalPage}
              className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-200 transition ${
                pageNo === totalPage ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next <FcNext size={22} />
            </button>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center h-[40vh]'>
          <p className='text-gray-500 font-bold'>No Results Found</p>
        </div>
      )}
    </div>
  );
}

export default AllDeals;
