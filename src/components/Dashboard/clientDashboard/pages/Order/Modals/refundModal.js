import axios from 'axios'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast';

const RefundOrderModal = ({CloseModal, id, getUserOrders}) => {

  const [loading, setLoading] = useState(false)

  const requestRefund = async() => {
      try {
        setLoading(true);
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': localStorage.getItem("auth_token")
              },
          }
          const response = await axios.get(`${process.env.REACT_APP_URL }/orders/request-refund/${id}`, config);
          setLoading(false);
          toast.success(
              response.data.message,
              {
                  duration: 4000,
                  position: "top-center",
                  style: { background: 'green', color: 'white' },
              }
          );
          CloseModal()
          getUserOrders()
          return response
      } catch (error) {
          setLoading(false);
      }
  }

  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
        <div className="bg-white lg:w-4/12 relative rounded-md  overscroll-none  w-11/12 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className="fw-500 p-8 py-6 lg:text-lg mb-6">Do you want to request for a refund</p>
            <div className='mt-6 rounded-b-md flex bg-light p-8 py-6 justify-between'>
                <button className='px-12 py-2 border-pri text-primary rounded' onClick={CloseModal}>No</button>
                <button className='px-12 py-2 bg-red-500 text-white rounded' onClick={requestRefund}>{loading? "Requesting..." : "Yes"}</button>
            </div>
            <FaTimes className="absolute top-5 right-5 cursor-pointer" onClick={CloseModal}/>
        </div>
    </div>
  )
}

export default RefundOrderModal