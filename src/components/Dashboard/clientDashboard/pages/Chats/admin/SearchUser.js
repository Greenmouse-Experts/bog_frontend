import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchUserList = () => {
  return (
    <>
        <div className='mt-6 px-2'>
            <div className='flex items-center border rounded-lg'>
                <input type='search' className='w-full outline-none p-2 rounded-lg' placeholder='Search a user'/>
                <BsSearch className='mx-2 text-xl'/>
            </div>
            <div></div>
        </div>
    </>
  )
}

export default SearchUserList