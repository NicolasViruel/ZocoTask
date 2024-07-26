import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <h2 className="text-lg font-semibold text-black">Loading...</h2>
    </div>
  )
}

export default Loader