
function Auth() {
  return (
    <form className="w-full flex justify-center mt-6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-full xs:w-[90%]">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Full Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Full Name" name="username" />
        </div>
     
        
        

        <div className="md:w-full xs:w-[90%]">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Full Name" name="username" />
        </div>

      </div>
    </form>
  )
}

export default Auth;