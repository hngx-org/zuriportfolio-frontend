import React from 'react'



const errordata = () => {
  return (
   <div className="px-10 md:px-32 py-10 grid grid-cols-1 justify-center align-middle " >
    
    <div className="rounded overflow-hidden shadow-lg text-center">  
    <h1 className="text-6xl font-semibold text-brand-green-primary">Oops!</h1>
    <p className=" text-lg text-gray-600 my-5 "> Error fetching data.</p>
    <div className="animate-bounce my-5">
      <svg className="mx-auto h-16 w-16 text-brand-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
      </svg>
  </div>
</div>
</div>
  )
}

export default errordata