import React from 'react'

import {FiSearch} from 'react-icons/fi'
const SearchBar = ({searchChangeHandle}) => {
  return (
    <div className=' w-full py-[5px] px-0 border-2 rounded-lg pl-2 flex items-center'>
    <FiSearch style={{color:"#cccccc"}}/>
    <input
    type="text"
    className="SearchBar w-full pl-2"
    placeholder="Search user"
    onChange={searchChangeHandle}
  />
  </div>
  )
}

export default SearchBar