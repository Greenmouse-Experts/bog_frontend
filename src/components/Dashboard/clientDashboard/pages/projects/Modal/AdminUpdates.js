import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast';

export const AdminUpdates = ({CloseModal,project}) => {

    const [isLoading, setIsLoading] = useState(false)
     const [photo, setPhoto] = useState('');
    // const [photos, setPhotos] = useState([]);

    // const handlePhotoChange = (e) => {
    //     setPhotos(Array.from(e.target.files));
    // }

    const handleSubmit = async (values) => {
        try{
            setIsLoading(true)
            console.log(project)
            const paylaod = {
                body: body,
                image: photo,
                project_slug: project.projectSlug,
            }
            let data = new FormData();
            values.image.forEach((image, index) => {
            data.append(`image`, values.image[index]);
            });
            console.log(values.image);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }

            const response =   await axios.post(`${process.env.REACT_APP_IMAGE_URL}/upload`, data)
                await axios.post(`${process.env.REACT_APP_URL }/projects/notification/create`, paylaod, config )
            
            setIsLoading(false)
            setPhoto(response[0])
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
            // return res
        }catch(error){
            console.log(error)
            setIsLoading(false)
            alert(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
          body: "",
          image: '',
        },
        onSubmit: handleSubmit,
      });
      const { body} = formik.values;

  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
        <div className="bg-white lg:w-5/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className="fw-600 text-lg mb-6">Project Progress Update</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Update Message</label>
                    <textarea name="body" value={body} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border border-gray-400 rounded mt-2 p-2 h-24"/>
                </div>
                <div className='mt-4'>
                    <label>Add Images</label>
                    <input 
                        type='file' 
                        name='image'
                        onChange={(event) => {
                            const files = event.target.files;
                            let myFiles =Array.from(files);
                            formik.setFieldValue("image", myFiles);
                          }}
                        multiple
                        className="w-full border border-gray-400 rounded mt-2 p-2" />
                </div>
                <div className="text-end mt-6">
                    <button className="btn-primary" onClick={formik.handleSubmit}>
                    {isLoading? "Updating..." : "Add Update"}
                    </button>
                </div>
            </form>
            <FaTimes className="absolute top-5 right-5 cursor-pointer" onClick={CloseModal}/>
        </div>
    </div>
  )
}
