/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/actions/authAction'
import { useFormik } from 'formik';
import { loginValidation } from '../../services/validation'
import Spinner from "../layouts/Spinner";
import { Alert } from "@material-tailwind/react";
import { BiUserCircle } from "react-icons/bi";
import { BsFileLock } from 'react-icons/bs'


export default function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(false);
    const [errorShow, setError] = useState(false);
    let errorCatch = useSelector((state) => state.auth.error);

    const stopLoading = () => setLoading(false);
    const displayError = () => setError(true);

    const handleSubmit = (values) => {
        setLoading(true)
        dispatch(loginAdmin(values, navigate, stopLoading, displayError));
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidation,
        onSubmit: handleSubmit,
    });
    const { email, password } = formik.values;
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/dashboard");
        }
    }, []);

    if (isAuthenticated === true) {
        return <Navigate to="/dashboard" replace />
    }

    return (

        <div className="min-h-screen bg-primary text-black font-primary">
            <div className="flex lg:pt-16 text-sm h-screen items-center justify-center">
                <div className="lg:w-4/12 w-11/12 pt-5 pb-8">

                    <div className="lg:px-8 bg-white py-8 px-5 shadow-lg ">
                        <div className="text-center">
                            <Link to='/'>
                                <img src={require("../assets/images/logo.png")} alt="adminlogo" className="w-28 m-auto pb-5 lg:w-36" />
                            </Link>
                        </div>
                        <div className="text-center">
                            <p className="text-lg fw-600">ADMIN LOGIN</p>
                        </div>

                        <Alert show={errorShow}
                            dismissible={{
                                onClose: () => setError(false),
                            }}
                            color="red" className="mt-5"
                        >{errorCatch}</Alert>

                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="w-full mt-8">
                                    <label className="block fw-600">
                                        Username
                                    </label>
                                    <div className="flex items-center w-full mt-2 py-1 px-2 border-gray-400 rounded border">
                                        <BiUserCircle className="text-3xl text-gray-600"/>
                                        <input
                                            type="text"
                                            placeholder="enter your username"
                                            className="w-full py-2 px-2 outline-none"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 w-full">
                                    <label className="block fw-600">
                                        Password
                                    </label>
                                    <div className="flex items-center w-full mt-2 py-1 px-2 border-gray-400 rounded border">
                                        <BsFileLock className='text-3xl text-gray-600'/>
                                        <input
                                            type="password"
                                            placeholder="enter your password"
                                            className="w-full py-2 px-2 outline-none"
                                            name="password"
                                            value={password}
                                            id="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-8 w-full text-center">
                                    {
                                        loading ? <Spinner /> : <button type="submit" className="w-full bg-primary py-3 rounded text-xl text-white fw-600">
                                            Login
                                        </button>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}