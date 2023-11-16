import React from 'react'
import '../css/Loading.css'
export const Loading = () => {
  return (
      <div className="bg-gray-300/50 absolute z-20 top-0 left-0 right-0 bottom-0 w-full h-full  flex items-center justify-center cursor-wait">
    <span className="loader"></span>
    </div>  
  )
  //   <span className="animate-spin w-40 h-40 rounded-full border-2 border-x-4 border-black/80 "></span>
}
