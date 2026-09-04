import React, { useState } from 'react'

const Search = ({onSearch}) => {
 
const [searchInput,setSearchInput]=useState("")
 const handleSubmit=(e)=>{
    const value=e.target.value;
    setSearchInput(value)
    if(onSearch){
        onSearch(value);
    }
 }
return (
 <div className='  w-full space-y-3 *: mt-3 bg-transparent '>
    <input className='w-full text-xl p-3 focus:border-2 focus:border-amber-200  border rounded-xl ' 
    placeholder='Type anything to search' 
    type="text"
    value={searchInput} 
    onChange={handleSubmit} />

 </div>
  )
}

export default Search