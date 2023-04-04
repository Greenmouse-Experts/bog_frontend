import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

export const ProjectMain = ({CloseModal, id}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (values) => {
        try{
            setIsLoading(true)
            const paylaod = {
                ...values,
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.put(`${process.env.REACT_APP_URL }/projects/update/${id}`, paylaod, config )
            setIsLoading(false)
            CloseModal()
            toast.success(
                response.data.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: 'green', color: 'white' },
                }
            );
            return response
        }catch(error){
            console.log(error)
            setIsLoading(false)
            alert(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
          totalCost: "",
          totalEndDate: ""
        },
        onSubmit: handleSubmit,
      });
      const { totalCost, totalEndDate} = formik.values;

  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
        <div className="bg-white lg:w-4/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className="fw-600 text-lg lg:text-xl mb-6">Update Project Price/End date</p>
            <form onSubmit={handleSubmit}>
            <div className="mt-3">
                    <label>Project Price</label>
                    <input
                        type="number"
                        className="w-36 lg:w-60 mt-2 ml-4 rounded border border-gray-400 p-2"
                        id="progress"
                        name="totalCost"
                        value={totalCost}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                </div>
                <div className="mt-5">
                    <label>Project End Date</label>
                    <input
                        type="date"
                        className="w-36 lg:w-60 mt-2 ml-4 rounded border border-gray-400 p-2"
                        id="progress"
                        name="totalEndDate"
                        value={totalEndDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                </div>
                <div className="text-end mt-6">
                    <button className="btn-primary" onClick={formik.handleSubmit}>
                    {isLoading? "Updating..." : "Submit"}
                    </button>
                </div>
            </form>
            <FaTimes className="absolute top-5 right-5 cursor-pointer" onClick={CloseModal}/>
        </div>
    </div>
  )
}
