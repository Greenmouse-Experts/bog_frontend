import React from 'react'
import { FaTimes } from 'react-icons/fa'

const CancelOrderModal = ({CloseModal}) => {
  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
        <div className="bg-white lg:w-4/12 relative rounded-md  overscroll-none  w-11/12 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className="fw-600 p-8 text-lg lg:text-xl mb-6">Are you sure you want to cancel this order</p>
            <div className='mt-6 rounded-b-md flex bg-light p-8 justify-between'>
                <button className='px-12 py-2 border-pri text-primary rounded' onClick={CloseModal}>Close</button>
                <button className='px-12 py-2 bg-red-500 text-white rounded'>Cancel</button>
            </div>
            <FaTimes className="absolute top-5 right-5 cursor-pointer" onClick={CloseModal}/>
        </div>
    </div>
  )
}

export default CancelOrderModal