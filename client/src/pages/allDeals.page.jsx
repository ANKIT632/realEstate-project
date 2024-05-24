import React, { useEffect,useContext } from 'react'
import SingleCard from '../components/singleCard.component';
import { FcNext, FcPrevious } from "react-icons/fc";
import UserDataContext from '../context/userContext';
import { IoMdRefreshCircle } from "react-icons/io";

function AllDeals() {

  const { searchQuery,setSearchQuery} = useContext(UserDataContext); 
  const [pageNo, setPageNo] = React.useState(1);
  const [dealsData, setDealsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPage, setTotalPage] = React.useState(1);

  // fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response ={};
      if(searchQuery.trim()!==''){
    
      
       response = await fetch(`https://realestate-project-6mri.onrender.com/api/v1/selling/property/search?searchQuery=${searchQuery}&page=${pageNo}&size=10`);
        
       console.log("q");
      }
      else{
        response = await fetch(`https://realestate-project-6mri.onrender.com/api/v1/selling/property/all?page=${pageNo}&size=10`);
      }
      const data = await response.json();
     
  console.log("data",data);
      setDealsData(data);
      setIsLoading(false);
   
    

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // next page 
  const nextPageHanddler = () => {
    if(pageNo<totalPage)
    setPageNo(pageNo + 1);
  };


  // pre page  
  const prePageHandler = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleRefresh=(e)=>{
    e.preventDefault();
  setSearchQuery("");
  setPageNo(1);
  setTotalPage(Math.ceil(dealsData.totalProperty/10.0));
  }


  useEffect(() => {
    fetchData();
    setPageNo(1);
  }, []);


  useEffect(() => {
    setTotalPage(Math.ceil(dealsData.totalProperty/10.0));
    fetchData();
  }, [pageNo,searchQuery]);



  return (
    <div className=' w-full overflow-hidden min-h-[90vh]'>
    <div className='w-full flex mb-2 mt-1 bg-gray-300 items-center  '>
    <h2 className="  text-md font-mono font-bold pl-2">Daily New Deals</h2>
    <IoMdRefreshCircle className='text-lg cursor-pointer ml-2 transform hover:rotate-180' onClick={handleRefresh}/>
    </div>
      {(!isLoading) ? <>

        <div className='grid grid-cols-2 gap-2   max-md:grid-cols-1 justify-items-center '>
          {
            dealsData.allProperty?.length && dealsData?.allProperty.map((data, idx) => {
              return <SingleCard key={idx} data={data} />
            })}

        </div>
        <div className='flex justify-between px-4 pb-3 md:px-24'>

          <div className='p-x-0.5 bg-gray-200 hover:bg-gray-300 rounded-sm shadow border border-gray-300 md:p-1'> <FcPrevious className='cursor-pointer text-[25px]' onClick={prePageHandler} />
          </div>
          <div className='p-x-0.5 bg-gray-200 hover:bg-gray-300 rounded-sm shadow border border-gray-300 md:p-1'>
            <FcNext className={`cursor-pointer text-[25px]  ${(pageNo>totalPage)? ' hidden ':''}`} onClick={nextPageHanddler} />
          </div>
        </div>
      </> 
      : <p className={"h-screen flex justify-center items-center "}>loading...</p>
      }


    </div>
  );
}

export default AllDeals;