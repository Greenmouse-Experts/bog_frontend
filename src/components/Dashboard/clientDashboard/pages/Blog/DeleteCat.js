import { Button } from '@material-tailwind/react'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  deleteBlogCategory } from '../../../../../redux/actions/PostAction';


const DeleteCategoryModal = ({ CloseModal, id }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const submitHandler = () => {
        setLoading(true);
        dispatch(deleteBlogCategory(id));
        setLoading(false)
        CloseModal()
    }

    return (
        <div className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
            <div className="bg-white px-4 lg:w-5/12 rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                <p className="lg:fs-700 fw-500">Are you sure you want to delete this blog category</p>
                
                <div className="mt-8 flex justify-between">
                    <Button color="white" className='border' onClick={CloseModal}>Cancel</Button>
                    <Button type='submit' className="bg-red-600" onClick={submitHandler}>{loading? "Deleting.." : "Delete"}</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCategoryModal