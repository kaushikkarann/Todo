
import React from 'react'

export default function  List({
  title,
  description,
  date,
  completed,
  handledelete,
  completeFun
}){
   return (
  <>
   <div 
  className={`rounded-xl transform transition-all duration-300  p-3 h-max max-w-100   ${completed?"bg-blue-100  ":"bg-violet-200"}`}
  
  >
    <div className=" flex justify-between items-start">
    <h3 className={`text-xl font-semibold wrap-break-word ${completed?"line-through" :""}`}>{title}</h3>
      <h3 className='text-xs rounded-xl bg-cyan-100 py-1 px-3'>{date}</h3>
    </div> 

    <div className={`${completed?"line-through" :""}`}>
      <p className=' wrap-break-word'>{description}</p>
    </div>
    <div className="btn mt-3 gap-2 text-white flex  ">
      <button
       className='cursor-pointer bg-red-400  p-2 rounded-full hover:bg-red-500 w-50 transition-all ease-in-out hover:w-100 '
       onClick={handledelete}>Delete</button>
      <button className='cursor-pointer bg-blue-400 p-2 rounded-full hover:bg-blue-500 w-50 transition-all ease-in-out hover:w-100 '
      onClick={completeFun}
      >Completed</button>

    </div>
      <h1>{completed} </h1>
   </div>


  
         </>
  
  )
}
