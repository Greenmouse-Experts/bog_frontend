/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction'
import { useFormik } from 'formik';
import { loginValidation } from '../../services/validation'
import Spinner from "../layouts/Spinner";
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Alert } from "@material-tailwind/react";
import { BiUserCircle } from "react-icons/bi";
import { BsFileLock } from "react-icons/bs";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const error = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [loading, setLoading] = useState(false);
    const [errorShow, setError] = useState(false);
    const [checked, setChecked] = useState(false)
    const [logins, setLogins] = useState();

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('bog_login'));
  if (items) {
   setLogins(items);
   setChecked(true)
   formik.setFieldValue('email', items.email)
   formik.setFieldValue('password', items.pass)
  }
}, []);

    let errorCatch = useSelector((state) => state.auth.error);
    const stopLoading = () => setLoading(false);
    const displayError = () => setError(true);

    const handleSubmit = (values) => {
        setLoading(true)
        dispatch(loginUser(values, navigate, stopLoading, displayError));
    }
    const handleRemember = () => {
        setChecked(!checked)
        const login = {
            email: formik.values.email,
            pass: formik.values.password
        }
        if(!checked){
            localStorage.setItem('bog_login', JSON.stringify(login))
        }else localStorage.removeItem('bog_login')
    }
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const formik = useFormik({
        initialValues: {
            email: logins?.email || "",
            password: logins?.pass ||  "",
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
        <div className="bg-login min-h-screen bg-cover text-black font-primary" >
            <div className="flex lg:pt-16 text-sm h-screen items-center justify-center">
                <div className="lg:w-4/12 w-11/12 pt-5 pb-8">
                    <Link to="/">
                        <img src={require('../assets/images/logo.png')} alt="App Logo" className="w-28 pb-5 lg:w-44" />
                    </Link>
                    <div className="lg:px-12 bg-white py-8 px-5 shadow-lg ">
                        <div>

                            <p className="text-xl fw-700">Log into your account</p>

                        </div>

                        <Alert show={errorShow}
                            dismissible={{
                                onClose: () => setError(false),
                            }}
                             color="red" className="mt-5"
                        >{errorCatch}</Alert>

                        <div className="mt-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="w-full">
                                    <label className="block">
                                        Email
                                    </label>
                                    <div className="flex items-center w-full mt-2 py-1 px-2 border-gray-400 rounded border">
                                        <BiUserCircle className="text-2xl text-gray-500"/>
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
                                    {
                                        formik.touched.email && formik.errors.email ? <p className='text-red-500'>{formik.errors.email}</p> : null
                                    }
                                </div>
                                <div className="mt-6 w-full">
                                    <div className="flex justify-between">
                                        <label>
                                            Password
                                        </label>
                                        <Link to="/forget"><p className="text-primary">Forgot Password?</p></Link>
                                    </div>
                                    <div className="flex items-center border border-gray-400 mt-2 rounded">
                                        <div className="flex items-center w-full">
                                            <BsFileLock className='text-3xl text-gray-600 w-10 h-5'/>
                                            <input
                                                type={passwordType}
                                                placeholder="enter your password"
                                                className="w-full py-2 px-2 outline-none"
                                                name="password"
                                                value={password}
                                                id="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {
                                            formik.touched.password && formik.errors.password ? <p className='text-red-500'>{formik.errors.password}</p> : null
                                        }
                                        <div onClick={togglePassword} className="px-3">
                                            {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                                        </div>

                                    </div>
                                </div>
                                <div className="mt-6 w-11/12 flex">
                                    <input type="checkbox" checked={checked} onChange={handleRemember} className="p-4 border-gray-400" />
                                    <p className="px-2">Remember me</p>
                                </div>
                                <div className="mt-6 w-full flex text-center">
                                    {
                                        loading ? <Spinner /> : <button type="submit" className="w-full text-lg text-white bg-primary py-2 rounded fw-600">
                                            Log in
                                        </button>
                                    }


                                </div>
                               
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