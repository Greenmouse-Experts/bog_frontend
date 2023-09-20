/* eslint-disable  */
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { changePasswordValidation } from '../../services/validation';
import Spinner from "../layouts/Spinner";
import Axios from "../../config/config";
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const { search } = useLocation();
    const email = new URLSearchParams(search).get("email");
    const token = new URLSearchParams(search).get("token");
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = (index) => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            if (values.password !== values.confirmPassword) {
                setLoading(false)
                toast.error(
                    "Passwords do not match",
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
                return;
            }
            const payload = {
                email,
                token,
                password: values.password
            };
            const resp = await Axios.post('/user/reset-password', payload);
            setLoading(false)
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Password created successfully"
            }).then(() => {
                navigate("/login")
            });
        } catch (error) {
            setLoading(false)
            toast.error(
               error.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }

    }
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: changePasswordValidation,
        onSubmit: handleSubmit,
    });
    const { confirmPassword, password } = formik.values;

    return (
        <div className="bg-login min-h-screen bg-cover text-black font-primary" >
            <div className="flex lg:pt-16 text-sm h-screen items-center justify-center">
                <div className="lg:w-5/12 w-11/12 pt-5 pb-8">
                    <Link to="/"><img src={require('../assets/images/logo.png')} alt="App Logo" className="w-28 pb-5 lg:w-44" /></Link>
                    <div className="lg:px-12 bg-white py-8 px-5 shadow-lg ">
                        <div>

                            <p className="text-xl fw-700">Create New Password</p>

                        </div>
                        <div className="mt-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mt-6 w-full">
                                    <div className="flex justify-between">
                                        <label>
                                            New Password
                                        </label>
                                    </div>
                                    <div className="flex mt-2 items-center border-gray-400 rounded border">
                                    <input
                                        type={passwordType}
                                        placeholder="enter your password"
                                        className="w-full py-2 px-2"
                                        name="password"
                                        value={password}
                                        id="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div onClick={() => togglePassword(1)} className="px-3">
                                            {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                                        </div>
                                    </div>
                                    {
                                        formik.touched.password && formik.errors.password ? <p className='text-red-500'>{formik.errors.password}</p> : null
                                    }
                                </div>
                                <div className="mt-6 w-full">
                                    <div className="flex justify-between">
                                        <label>
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="flex mt-2 items-center border-gray-400 rounded border">
                                    <input
                                        type={passwordType}
                                        placeholder="confirm password"
                                        className="w-full py-2 px-2"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        id="confirmPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div onClick={() => togglePassword(2)} className="px-3">
                                            {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                                        </div>
                                    </div>
                                    {
                                        formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='text-red-500'>{formik.errors.confirmPassword}</p> : null
                                    }
                                </div>
                                <div className="mt-6 w-full flex">
                                    {
                                        loading ? <Spinner /> :
                                            <button type="submit" className="w-full text-lg text-white bg-primary py-2 rounded fw-600">
                                                Create Password
                                            </button>
                                    }
                                </div>
                                {
                                    error ? <p className="text-lg text-center mt-3 fw-700 text-red-600">{error}</p> : null
                                }
                            </form>
                            <div className="mt-8 text-center">
                                Don't have an account yet? <span className="text-secondary fs-500 fw-600"><Link to="/signup">Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}