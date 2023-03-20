import React, { useState, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from '../../layouts/Spinner';
import { useDispatch} from 'react-redux';
import { register } from "../../../redux/actions/authAction";
import { privateClientSchema } from '../../../services/validation';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import {AiOutlineInfoCircle}  from 'react-icons/ai';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';


const PrivateClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);
    const captchaRef = useRef(null)

    // console.log(process.env.REACT_APP_SITE_KEY)

    const handleSubmit = (values) => {
        try {
            setLoading(true)
        console.log(values);
        const paylaod = {
            ...values,
            userType: "private_client",
            captcha: captchaRef.current.getValue(),
            name: `${values.fname} ${values.lname}`
        }
        dispatch(register(paylaod, navigate, stopLoading));
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const [refTooltip, setRefTooltip] = useState(false)
    const [passTooltip, setPassTooltip] = useState(false)

    const referenceValue = localStorage.getItem("reference");
   

    const formik = useFormik({

        initialValues: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
            aboutUs: "",
            terms: false,
            reference: referenceValue || "",
        },
        validationSchema: privateClientSchema,
        onSubmit: handleSubmit,
    });
    const { fname, lname, email, password, phone, terms, reference, aboutUs,password2 } = formik.values;

    // google signup
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    // const [ googleProfile, setGoogleProfile ] = useState([])

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const fetchData = async (_googleUser) => {
                const payload = {
                  access_token: _googleUser.access_token,
                  user_type: "private_client",
                };
                const response = await axios.post(
                  `${process.env.REACT_APP_URL}/users/auth/google`,
                  payload
                );
            
                if (response.data.token !== undefined) {
                  console.log(response.data);
                  localStorage.setItem('auth_token', response.data.token)
                //   dispatch(login(response));
                  toast.success(
                    response.data.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: 'green', color: 'white' },
                    }
                );
                 setIsLoggedIn(true)
                } else {
                  const response01 = await axios.post(
                    `${process.env.REACT_APP_URL}/users/auth/google`,
                    payload
                  );
                  localStorage.setItem('auth_token', response01.data.token)
                //   dispatch(login(response01));
                toast.success(
                    response.data.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: 'green', color: 'white' },
                    }
                );
                 setIsLoggedIn(true)
                }
              };
            fetchData(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    if(isLoggedIn){
        window.location.href = window.location.protocol + "//" + window.location.host + '/dashboard'
    }

    return (
        <div className="mt-8">
            {
                loading ? <Spinner /> :

                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <label className="block">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={fname}
                                id="fname"
                                name="fname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.fname && formik.errors.fname ? <p className='text-red-500'>{formik.errors.fname}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={lname}
                                id="lname"
                                name="lname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.lname && formik.errors.lname ? <p className='text-red-500'>{formik.errors.lname}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={email}
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.email && formik.errors.email ? <p className='text-red-500'>{formik.errors.email}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Phone Number</label>
                            <PhoneInput
                                country={'us'}
                                value={phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="mt-1 w-full"
                                inputStyle={{ width: '100%' }}
                                id="phone"
                                name="phone"
                            />
                            {
                                formik.touched.phone && formik.errors.phone ? <p className='text-red-500'>{formik.errors.phone}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Password</label>
                            {passTooltip && (
                                <div className='flex scale-ani py-2 px-2 my-2 bg-tool rounded fs-300' onClick={() => setPassTooltip((prev) => !prev)}>
                                    <AiOutlineInfoCircle className="text-lg text-gray-700"/>
                                    <p className='pl-2'>The password must contain minimum of 8 characters, uppercase character and a unique character</p>
                                </div>
                            )}
                            <div className="flex items-center bg-input border border-gray-400 mt-1 rounded">
                                <input
                                    type={passwordType}
                                    placeholder="Enter your desired password"
                                    className="w-full border-0 py-2 px-2 rounded"
                                    value={password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onFocus={() => setPassTooltip(true)}
                                    id="password"
                                    name="password"
                                />
                                <div onClick={togglePassword} className="px-3">
                                    {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                                </div>
                            </div>
                            {
                                formik.touched.password && formik.errors.password ? <p className='text-red-500'>{formik.errors.password}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Confirm Password</label>
                            
                            <div className="flex items-center bg-input border border-gray-400 mt-1 rounded">
                                <input
                                    type={passwordType}
                                    placeholder="Enter your desired password"
                                    className="w-full border-0 py-2 px-2 rounded"
                                    value={password2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onFocus={() => setPassTooltip(true)}
                                    id="password2"
                                    name="password2"
                                />
                                <div onClick={togglePassword} className="px-3">
                                    {passwordType === "password" ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                                </div>
                            </div>
                            {
                                formik.touched.password2 && formik.errors.password2 ? <p className='text-red-500'>{formik.errors.password2}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <div className='flex justify-between pr-2'>
                                <label className='block'>Referral Code (Optional)</label>
                                <AiOutlineInfoCircle className="text-lg text-gray-700" onClick={() => setRefTooltip((prev) => !prev)}/>
                            </div>
                            {refTooltip && (
                                <div className='flex scale-ani py-2 px-2 my-2 bg-tool rounded fs-300'>
                                    <AiOutlineInfoCircle className="text-lg text-gray-700"/>
                                    <p className='pl-2'>Please, only enter the referral. Leave empty if you dont have a referral code.</p>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Enter your referral code"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                id="reference"
                                name="reference"
                                value={reference}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="w-full mt-6">
                            <label className='block'>Where did you hear about us?</label>
                            <select
                                className='mt-2 py-2 px-2 bg-white border border-gray-500 rounded w-full'
                                id="aboutUs"
                                name="aboutUs"
                                defaultValue={aboutUs}
                                onChange={formik.handleChange}
                            >
                                <option disabled >Select an option</option>
                                <option value="apple">Apple App Store</option>
                                <option value="email">Email</option>
                                <option value="facebook">Facebook</option>
                                <option value="google">Google</option>
                                <option value="playstore">Google Play Store</option>
                                <option value="instagram">Instagram</option>
                                <option value="referral">Referral</option>
                                <option value="twitter">Twitter</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>
                        <div className="mt-8 w-11/12 flex">
                            <input
                                type="checkbox"
                                className="p-4 border-gray-400"
                                value={terms}
                                onChange={formik.handleChange}
                                id="terms"
                                name="terms"
                                required
                            />
                            {
                                formik.touched.terms && formik.errors.terms ? <p className='text-red-500'>{formik.errors.terms}</p> : null
                            }
                            <p className="px-2">
                                I agree to the
                                <Link to="/terms"><span className=" pl-2 text-primary hover:text-red-600 cursor-pointer  ">
                                    Terms & Conditions
                                </span></Link>.
                            </p>
                        </div>
                        <div className="mt-8">
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_SITE_KEY}
                                ref={captchaRef}
                            />
                        </div>
                        <div className="mt-6 w-full flex">
                            <button
                                type='submit'
                                onClick={formik.handleSubmit}
                                className="w-full text-lg text-white bg-primary py-2 rounded fw-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
            }
            <div className='w-full mt-12'>
                <div className='relative'>
                    <p className='w-12 text-center mx-auto bg-white relative z-10 text-lg'>OR</p>
                    <p className='border border-gray-500 relative -top-3'></p>
                </div>
                <div className='lg:flex px-8 lg:px-0 mt-8 '>
                       <div className='mt-4 flex lg:text-lg w-full xl:w-7/12 mx-auto cursor-pointer items-center justify-evenly border py-2 rounded-lg shadow' onClick={() => login()}>
                            <FcGoogle className='text-2xl'/><button className=''>Sign Up with Google</button>
                        </div>
                </div>
            </div>
            <div className="mt-10">
                Already have an account?{" "}
                <Link to="/login"><span className="text-primary fw-600 fs-500 pl-2">Login</span></Link>
            </div>
        </div>
    )
}

export default PrivateClient