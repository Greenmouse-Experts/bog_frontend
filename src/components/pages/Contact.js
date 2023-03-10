import React,  {useRef, useState } from "react";
import Footer from "./home-comp/Footer";
import Header from "./home-comp/Header";
import ReCAPTCHA from "react-google-recaptcha";
import SimpleMap from "./home-comp/Map";
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
import { useFormik } from "formik";



export default function Contact(){

    const captchaRef = useRef(null)

    // const [successful, setSuccessful] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);

    const handleSubmit = async (values) => {
        try{
            console.log(values);
            const paylaod = {
                ...values,
                captcha: captchaRef.current.getValue(),
            }
            const response = await axios.post(`${process.env.REACT_APP_URL }/user/contact-admin`, paylaod )
            setDisableBtn(true)
            return response
        }catch(error){
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: "",
        },
        onSubmit: handleSubmit,
    });
    const { first_name, last_name, email, phone, message } = formik.values;

    return(
        <div>
            <div>
                <Header/>
                <div className="bg-contact bg-cover bg-center text-white h-44 lg:h-80 flex items-center">
                    <div className="box">
                        <p className="lg:text-4xl text-2xl fw-700 mb-2">Contact Us</p>
                        <p>Reach out to us to concerning informations, feedbacks and inquiry</p>
                    </div>
                </div>
                <div className="section">
                    <div className="box">
                        <div className="lg:bg-light py-4  lg:flex justify-around mt-8">
                            <div className="lg:w-3/12 text-center relative pt-8">
                                <div className="w-20 m-auto bg-white py-3 shadow-xl rounded flex justify-center absolute -top-12 x-center"><img src={require("../assets/images/call.png")} alt="call" className="w-10" /></div>
                                <p className="fw-600 fs-700 mb-2">Phone Lines</p>
                                <p>0800 000 0000</p>
                                <p>0900 000 0000</p>
                            </div>
                            <div className="lg:w-3/12 text-center relative pt-8 mt-20 lg:mt-0">
                                <div className="w-20 m-auto bg-white py-3 shadow-xl rounded flex justify-center absolute -top-12 x-center"><img src={require("../assets/images/phone.png")} alt="phone" className="w-10" /></div>
                                <p className="fw-600 fs-700 mb-2">Email Support</p>
                                <p>support@bog.com</p>
                                <p>info@bog.com</p>
                            </div>
                            <div className="lg:w-3/12 text-center relative pt-8 mt-20 lg:mt-0">
                                <div className="w-20 m-auto bg-white py-3 shadow-xl rounded flex justify-center absolute -top-12 x-center"><img src={require("../assets/images/address.png")} alt="address" className="w-10" /></div>
                                <p className="fw-600 fs-700 mb-2">Office Address</p>
                                <p className="w-8/12 m-auto">7, Street name, estate name, state, country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="box">
                        <div className="lg:flex justify-between">
                            <div className="lg:w-6/12">
                                <p className="mb-8 fs-800 fw-600">Leave Us A Message</p>
                                <div className="shadow-lg lg:py-16 py-8 px-8 rounded">
                                    <form onSubmit={handleSubmit}>
                                        <div className="lg:flex">
                                            <div className="lg:mr-3">
                                                <label>First Name</label>
                                                <input type="text" name="first_name" value={first_name} onChange={formik.handleChange}  className="w-full border rounded border-gray-500 py-1 px-2 mt-2 " />
                                            </div>
                                            <div className="lg:ml-3 mt-6 lg:mt-0">
                                                <label>Last Name</label>
                                                <input type="text" name="last_name" value={last_name} onChange={formik.handleChange} className="w-full border rounded border-gray-500 py-1 px-2 mt-2" />
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <label className="block mb-2">Phone Number</label>
                                            <input type="tel" name="phone" value={phone} onChange={formik.handleChange} className="w-full border rounded border-gray-500 py-1 px-2 mt-2" />
                                        </div>
                                        <div className="mt-6">
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={email} onChange={formik.handleChange}  className="w-full border rounded border-gray-500 py-1 px-2 mt-2" />
                                        </div>
                                        <div className="mt-6">
                                            <label>Message</label>
                                            <textarea name="message" value={message} onChange={formik.handleChange} className="w-full border rounded border-gray-500 mt-2 px-2 py-2" rows={5}/>
                                        </div>
                                        <div className="mt-8 w-full overflow-hidden">
                                            <ReCAPTCHA
                                                sitekey={process.env.REACT_APP_SITE_KEY}
                                                ref={captchaRef}
                                            />
                                        </div>
                                        <div className="mt-10">
                                            <button onClick={formik.handleSubmit} className="btn-primary w-full" disabled={disableBtn}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:w-5/12 mt-16 lg:mt-0">
                                <p className="mb-8 fs-800 fw-600 lg:text-end">Location Map</p>
                                <div className="lg:h-3/4 h-96 rounded overflow-hidden">
                                    <SimpleMap/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-32">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}