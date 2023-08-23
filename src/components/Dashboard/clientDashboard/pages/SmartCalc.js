import { Breadcrumbs } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SmartCalc = () => {
  const [upload, setUpload] = useState(false);
  // eslint-disable-next-line
  const [uploadType, setUploadType] = useState("");
  const [name, setName] = useState("");
  const [loadingModal, setLoadingModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  function CloseModal() {
    setUpload(false);
    setSuccessModal(false)
  }

  // const OpenUpload = (type) => {
  //   setUpload(true);
  //   setUploadType(type);
  // };

  const openLoading = (type) => {
    setUpload(false);
    setLoadingModal(true)
    console.log(uploadType);
    setTimeout(() => {
      setLoadingModal(false)
      setSuccessModal(true)
    }, 4000);
  };

  const changeHandler = (e) => {
    if (e.target.files.length > 0) {
      let filename = e.target.files[0].name;
      setName(filename)
     }
  }

  return (
    <div className="min-h-screen fs-500">
      <div className="w-full py-6 bg-white px-4 lg:flex items-center justify-between">
        <div className="">
          <p className="text-2xl fw-600"> Smart Calculator</p>
          <p className="fs-400 text-gray-600 mt-2">
            Calculate and get the estimate in naira to start and complete your
            building(s).
          </p>
          <Breadcrumbs className="bg-white pl-0 mt-4">
            <Link to="/" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link to="/dashboard" className="opacity-60">
              <span>Dashboard</span>
            </Link>
            <Link to="" className="">
              <span>Smart Calc</span>
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      {/* <div className="lg:p-5 px-3">
        <div>
          <p className="text-center my-12 fw-600 text-2xl">
            Choose Upload Type
          </p>
        </div>
        <div className="md:flex gap-x-10 lg:gap-x-24 justify-center">
          <div
            className="rounded-lg shadow-md bg-white w-11/12 mx-auto lg:mx-0 md:w-80 lg:w-96 cursor-pointer hover:scale-105 duration-100"
            onClick={() => OpenUpload("excel")}
          >
            <div className="h-44 lg:h-52 px-4 lg:px-8 grid items-center bg-excel rounded-t-lg">
              <div>
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1681988642/BOG/Rectangle_19417_rgmizt.png"
                  alt="excel"
                  className="w-12"
                />
                <p className="text-white mt-6 fw-600 lg:text-2xl">
                  Upload Excel File
                </p>
              </div>
            </div>
            <div className="md:h-40 px-4 py-6 lg:px-8 lg:pt-8">
              <p className="">
                Upload an excel file containing the parameters extracted from
                your building plan and get the estimated cost to setup the
                project.
              </p>
            </div>
          </div>
          <div
            className="rounded-lg mt-6 md:mt-0 bg-white shadow-md w-11/12 mx-auto lg:mx-0 md:w-80 lg:w-96 cursor-pointer hover:scale-105 duration-100"
            onClick={() => OpenUpload("image")}
          >
            <div className="h-44 lg:h-52 px-4 lg:px-8 grid items-center  bg-image rounded-t-lg">
              <div>
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1681988642/BOG/Rectangle_19418_z02zyd.png"
                  alt="excel"
                  className="w-12"
                />
                <p className="text-white mt-6 fw-600 lg:text-2xl">
                  Upload Image File
                </p>
              </div>
            </div>
            <div className="md:h-40 py-6 px-4 lg:px-8 lg:pt-8">
              <p className="">
                Upload all the building plan diagrams in PDF, PNG or JPG and get
                the estimated cost within 3days of submission.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1692713239/BOG/coming-removebg-preview_ska41u.png" alt="smart" className="w-10/12 mx-auto lg:w-5/12" />
      </div>
      {upload && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-white px-4 lg:w-5/12 rounded-md max-h-700 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Upload a file</p>
            <div className="mt-5">
              <p className="font-extralight">Attach the file below</p>
              <div className="mt-2 relative border-pri bg-primary-op rounded-lg h-44 grid place-content-center">
                <input 
                  type="file" 
                  multiple
                  onChange={(e) => changeHandler(e)}
                  className="w-full absolute opacity-0 h-44  border border-gray-700"
                  />
                <div>
                  <img 
                    src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1682071642/BOG/Rectangle_19407_jzjt77.png'
                    alt='file'
                    className="mx-auto"
                    />
                  <p className="text-primary mt-2 fw-500">{name === "" ? `Select ${uploadType} file to upload` : name }</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p>Import from URL</p>
              <div className="mt-2 border border-gray-500 rounded-md relative">
                <input 
                  type="text" 
                  placeholder="Add file URL"
                  className="w-full p-2 rounded-md"
                  />
                <p className="text-primary absolute top-2 right-4">Upload</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button className="w-5/12 border-pri rounded-lg text-primary shadow" onClick={CloseModal}>Cancel</button>
              <button className="btn-primary w-5/12" onClick={() => openLoading(name)}>Send</button>
            </div>
          </div>
        </div>
      )}
      {loadingModal && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-gray-50 px-4 lg:w-5/12 rounded-md max-h-700 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center ">
              <p className="fw-600 text-xl">Uploading your file</p>
              <p className="mt-5">This may take a few seconds, please wait</p>
            </div>
            <div className="mt-10">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1682076850/BOG/loadingani_wywdj0.gif"
                alt="loader"
                className="w-full bg-blend-lighten"
                />
            </div>
          </div>
        </div>
      )}
      {successModal && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-white px-4 lg:w-5/12 rounded-md max-h-700 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            {
              uploadType === "image" ?
              <div className="text-center ">
                <img
                  src='https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif'
                  alt='success'
                  className="mx-auto w-48"
                  />
                <p className="fw-600 text-xl">Proccess Completed</p>
                <p className="mt-2">Your file has been received by BOG and is awaiting review. Your estimated building cost will be sent to you in 3-4 working days via the email provided by you upon sign up. Thanks for using BOG Smart Calculator.</p>
                <button className="btn-primary lg:px-16 mt-10" onClick={CloseModal}>Continue</button>
              </div>
              :
              <div className="text-center ">
                <img
                  src='https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif'
                  alt='success'
                  className="mx-auto w-48"
                  />
                <p className="fw-600 text-xl">Result is Ready</p>
                <button className="btn-primary lg:px-16 mt-10">View Result</button>
            </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};
