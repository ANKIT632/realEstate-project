
function SellTrackComponent({data}) {
  return (
    <div className='bg-white mb-3 py-3 w-[95%] px-2 rounded-xl  shadow-md hover:shadow-lg ' key={data?._id}>
  
    <div className='flex'>
        <div>
            <div className='w-[200px] max-sm:w-[180px] max-xs:w-[120px]'>
                <img src={data?.imagesUrl[0]} alt='img' className='rounded-2xl w-full h-32 object-cover bg-gray-400 max-sm:h-28 max-xs:h-20' />
            </div>

            <div className='flex items-center mt-2 ml-1'>

                <h3 className={"pl-1 text-xs font-bold max-sm:text-[11px] max-xs:hidden"}>owner : </h3>

                <h3 className={"px-1  text-xs font-bold max-sm:text-[11px] text-blue-700"}>{data?.owner?.username}</h3>

                <img src={data?.owner.profile_url} alt='img' className='h-5 w-5 bg-gray-400 rounded-[50%] cursor-pointer' />

            </div>
        </div>

        <div className='pl-2 pt-1 md:pl-6'>
            <h3 className={" text-sm  md:text-lg font-bold text-blue-600"}>{data.title}</h3>
            <h3 className={"  text-xs  font-bold text-black"}>Price : <strong className='text-blue-600 font-medium'> {data?.price}</strong></h3>

            <h3 className={"  text-xs font-bold text-black"}>City : <strong className='text-blue-600 font-medium '> {data?.location?.city}</strong></h3>

            <h3 className={"  text-xs  font-bold text-black max-sm:hidden "}>Description : <strong className='text-blue-600 font-medium'> {data.description}</strong></h3>

            <h3 className={"  text-xs   font-bold text-black"}>Sold : <strong className='text-blue-600 font-medium'> {data.isSold ? 'close for Buy' : 'open for Buy'}</strong></h3>

            <button className={commonStyle.btn + " relative text-xs left-0 mt-1 "}>Known more</button>

           { userData==='Buyer' || <button className={commonStyle.btn + " relative text-xs left-0 mt-1 ml-1 " +"bg-green-400"} onClick={HandlerGetSchedule}>Get Schedule</button>

           }
        </div>
    </div>
</div>
  )
}

export default SellTrackComponent