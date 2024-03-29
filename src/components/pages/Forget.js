import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import Spinner from '../layouts/Spinner';
import { forgetPasswordValidation } from '../../services/validation';
import Axios from "../../config/config";
import Swal from "sweetalert2";
import { Alert } from "@material-tailwind/react";

export default function Forget() {

  const [loading, setLoading] = useState(false);
  const [errorShow, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (values) => {
    setLoading(true)
    const url = `/user/forgot-password?email=${values.email}`
    Axios.get(url).then(response => {
      setLoading(false);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Reset Password link Sent Successfully. Check Your E-mail for reset password link"
      })
    }).catch(error => {
      setLoading(false)
      setError(true)
      setErrorMsg(error.response.data.message)
    })
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordValidation,
    onSubmit: handleSubmit,
  });
  const { email } = formik.values;
  if (loading) {
    return <Spinner />
  }
  return (
    <div className="bg-login min-h-screen bg-cover text-black font-primary">
      <div className="flex lg:pt-16 text-sm h-screen items-center justify-center">
        <div className="lg:w-4/12 w-11/12 pt-5 pb-8">
          <Link to="/"><img src={require('../assets/images/logo.png')} alt="logomain" className="w-28 pb-5 lg:w-44" /></Link>
          <div className="lg:px-12 bg-white py-8 px-5 shadow-lg ">
            <div>
              <p className="text-2xl fw-600">Reset your Password</p>
              <p className="text-md mt-5 fw-400">
                Enter the email address associated with your account and we’ll
                send you a link to reset your password.
              </p>
            </div>
            <Alert show={errorShow}
                dismissible={{
                    onClose: () => setError(false),
                }}
                  color="red" className="mt-5"
            >{errorMsg}</Alert>
            <div className="mt-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <label className="block">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full mt-2 py-2 px-2 border-gray-400 rounded border"
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

                <div className="mt-6 w-full flex">

                  <button className="w-full text-lg text-white bg-primary py-2 rounded fw-600">
                    Get Link
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center font-400">
                <Link to="/login">
                  <span className="text-secondary fw-600 fs-500">
                    Return to Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
