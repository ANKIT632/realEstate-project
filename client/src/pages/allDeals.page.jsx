/* eslint-disable no-undef */
import React, { useEffect, useContext, useCallback, useState } from 'react'
import SingleCard from '../components/singleCard.component';
import { FcNext, FcPrevious } from "react-icons/fc";
import UserDataContext from '../context/userContext';
import { IoMdRefreshCircle } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';

function AllDeals() {
  const { searchQuery, setSearchQuery } = useContext(UserDataContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = React.useState(1);
  const [dealsData, setDealsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPage, setTotalPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState([
    'All',
    'Apartment',
    'House', 
    'Studio',
    'Villa',
    'Commercial'
  ]);

  // Initialize category from URL params
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams, categories]);

  // fetch data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let response = {};
      let url = `${process.env.REACT_APP_BACKEND_URL}/selling/property/all?page=${pageNo}&size=10`;
      
      if (searchQuery.trim() !== '') {
        url = `${process.env.REACT_APP_BACKEND_URL}/selling/property/search?searchQuery=${searchQuery}&page=${pageNo}&size=10`;
      }
      
      // Add category filter if selected
      if (selectedCategory && selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`;
      }
      
      response = await fetch(url);
      const data = await response.json();
      setTotalPage(Math.max(1, Math.ceil((data.totalProperty || 0) / 10.0)));
      setDealsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, [pageNo, searchQuery, selectedCategory]);

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
    setSelectedCategory('');
    setSearchParams({});
    setPageNo(1);
  }

  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    setPageNo(1);
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='w-full min-h-[90vh] p-4 bg-gray-50'>
      {/* Header */}
      <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow mb-6 flex-wrap gap-4'>
        <h2 className="text-2xl font-bold text-slate-800">Daily New Deals</h2>
        <button
          onClick={handleRefresh}
          className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold'
        >
          <IoMdRefreshCircle className='text-xl' />
          Refresh All
        </button>
      </div>

      {/* Category Filter */}
      <div className='mb-6 bg-white p-4 rounded-lg shadow'>
        <h3 className='text-lg font-bold text-slate-800 mb-4'>Filter by Category</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category || (category === 'All' && selectedCategory === '')
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg font-bold text-gray-700 font-mono animate-pulse">Loading...</p>
        </div>
      ) : dealsData.allProperty?.length > 0 ? (
        <>
          <div className='mb-4 text-sm text-slate-600'>
            Showing <span className='font-bold'>{dealsData.allProperty.length}</span> properties out of <span className='font-bold'>{dealsData.totalProperty}</span> total
            {selectedCategory && selectedCategory !== 'All' && <span> in <span className='font-bold text-cyan-600'>{selectedCategory}</span> category</span>}
          </div>
          
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {dealsData.allProperty.map((data, idx) => (
              <div key={idx} className='hover:scale-105 transition-transform duration-300'>
                <SingleCard data={data} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center gap-6 mt-8 flex-wrap'>
            <button
              onClick={prePageHandler}
              disabled={pageNo === 1}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 bg-white font-semibold transition-all ${
                pageNo === 1 ? 'opacity-40 cursor-not-allowed border-gray-300 text-gray-400' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <FcPrevious size={22} /> Previous
            </button>

            <div className="text-slate-700 font-bold flex items-center justify-center px-4 py-2 bg-white rounded-lg border-2 border-slate-300">
              Page {pageNo} / {totalPage}
            </div>

            <button
              onClick={nextPageHanddler}
              disabled={pageNo === totalPage}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 bg-white font-semibold transition-all ${
                pageNo === totalPage ? 'opacity-40 cursor-not-allowed border-gray-300 text-gray-400' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next <FcNext size={22} />
            </button>
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center h-[40vh] bg-white rounded-lg shadow'>
          <p className='text-gray-500 font-bold text-lg mb-2'>No Results Found</p>
          <p className='text-gray-400 text-sm'>
            {selectedCategory && selectedCategory !== 'All' 
              ? `No properties found in ${selectedCategory} category` 
              : 'Try adjusting your search criteria'}
          </p>
        </div>
      )}
    </div>
  );
}

export default AllDeals;
