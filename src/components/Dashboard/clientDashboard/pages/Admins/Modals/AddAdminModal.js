import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { adminSchema } from '../../../../../../services/validation';
import Spinner from '../../../../../layouts/Spinner';
import { createAdmin } from '../../../../../../redux/actions/UserAction';
import { FaRegEye, FaRegEyeSlash, FaTimes } from 'react-icons/fa';

const AddAdminModal = ({ CloseModal }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
        setPasswordType("text")
        return;
        }
        setPasswordType("password")
    }

    const stopLoading = () => {
        setLoading(false);
        CloseModal();
    }; 

    const createNewAdmin = (value, action) => {
        setLoading(true);
        const payload = {
            userType: "admin",
            ...value
        }
       
        dispatch(createAdmin(payload, stopLoading));
        action.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            level: "",
            email: "",
            password: "",
        },
        validationSchema: adminSchema,
        onSubmit: createNewAdmin,
    });
    const { name, email, level, password } = formik.values;
    
    return (
        <div className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
            <div className="bg-white px-4 lg:w-5/12 rounded-md h-103 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <form onSubmit={formik.handleSubmit}>
                    <div className='flex justify-between lg:mt-3'>
                        <p className="lg:fs-700 fw-600">Create New Admin User</p>
                        <FaTimes className='cursor-pointer' onClick={CloseModal}/>
                    </div>
                    
                    <div className="mt-5">
                        <label className="block">Admin Name</label>
                        <input
                            type="text"
                            className="w-full  border border-gray-400 rounded mt-2 py-2 px-2"
                            required
                            id="name"
                            name="name"
                            value={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.name && formik.errors.name ? <p className='text-red-500'>{formik.errors.name}</p> : null
                        }
                    </div>
                    <div className="mt-5">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            className="w-full  border border-gray-400 rounded mt-2 py-2 px-2"
                            required
                            id="email"
                            name="email"
                            value={email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.email && formik.errors.email ? <p className='text-red-500'>{formik.errors.email}</p> : null
                        }
                    </div>
                    <div className="mt-5">
                        <label className="block">Level</label>
                        <select
                            className="w-full  border border-gray-400 rounded mt-2 py-2 px-2"
                            required
                            id="level"
                            name="level"
                            value={level}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option>Select Admin Role</option>
                            <option value="2">Article Admin</option>
                            <option value="3">Finance Admin</option>
                            <option value="4">Product Admin</option>
                            <option value="5">Project Admin</option>
                        </select>
                        {
                            formik.touched.level && formik.errors.level ? <p className='text-red-500'>{formik.errors.level}</p> : null
                        }
                    </div>
                    <div className="mt-5">
                        <label className="block">Password</label>
                        <div className='flex items-center bg-input border border-gray-400 mt-1 rounded'>
                            <input
                                type={passwordType}
                                placeholder="Enter your desired password"
                                className="w-full border-0 py-2 px-2 rounded"
                                required
                                id="password"
                                name="password"
                                value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div onClick={togglePassword} className="px-3">
                                {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                            </div>
                        </div>
                        {
                            formik.touched.password && formik.errors.password ? <p className='text-red-500'>{formik.errors.password}</p> : null
                        }
                    </div>
                    
                    <div className="mt-8 flex  justify-between">
                        <Button color="red" className='lg:px-12' onClick={CloseModal}>Cancel</Button>
                        {
                            loading ? <Spinner /> :
                                <Button type='submit' className="bg-primary lg:px-12">Create Admin</Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAdminModal