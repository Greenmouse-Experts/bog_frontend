import { Avatar, Breadcrumbs, Progress } from "@material-tailwind/react";
import axios from "axios";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import useFetchHook from "../../../../hooks/useFetchHook";
import { formatNumber, getProjectCategory, getUserType } from "../../../../services/helper";
import { Loader } from "../../../layouts/Spinner";
import toast from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";
// import PostImageItem from "./Blog/PostImageItem";

export default function ProjectDetails() {
    const { search } = useLocation();
    const projectId = new URLSearchParams(search).get("projectId");
    const { loading, data: project } = useFetchHook(`/projects/v2/view-project/${projectId}`);
    const [cost, setCost] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sum, setSum] = useState(false)

    const CloseModal = () => {
        setCost(false)
    }
    const getCostSummary = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem("auth_token")
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_URL }/projects/installments/${project.id}/view`, config)
        setSum(res.data.data)
    }
    useEffect(() => {
        if(project){
            getCostSummary()
        }// eslint-disable-next-line 
    },[project])
    const handleSubmit = async (values) => {
        try{
            setIsLoading(true)
            console.log(values);
            const paylaod = {
                ...values,
                project_slug: project.projectSlug

            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.post(`${process.env.REACT_APP_URL }/projects/installments/create`, paylaod, config )
            setIsLoading(false)
            CloseModal()
            getCostSummary()
            toast.success(
                response.data.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: 'green', color: 'white' },
                }
            );
            return response
        }catch(error){
            console.log(error)
            setIsLoading(false)
            alert(error.response.data.message)
        }
    }
    const formik = useFormik({
        initialValues: {
          title: "",
          amount: "",
        },
        onSubmit: handleSubmit,
      });
      const { title, amount} = formik.values;
    if (loading) {
        return (
            <center><Loader /></center>
        )
    }
    

    const returnColor = (value) => {
        if ((value >= 0) && (value < 30)) {
            return 'red'
        }
        else if ((value >= 30) && (value < 70)) {
            return 'yellow'
        }
        else if (value >= 70) {
            return 'green'
        }
    }


    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4">
                    <p className="text-2xl fw-600 lg:flex items-center">Project ID: <span className="text-primary px-3">{project?.projectSlug}</span> <span className="text-xs text-blue-500 bg-light px-2">{project?.status.toUpperCase()}</span></p>
                    <p className="fs-400 text-gray-600 mt-2">View project details</p>
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
                        <Link to="" className="opacity-60">
                            <span>project</span>
                        </Link>
                        <Link to="" className="">
                            <span>Project Details</span>
                        </Link>
                    </Breadcrumbs>
                </div> 
                {/* order details */}
                <div className="lg:p-5 px-2 py-4">
                    <div className="lg:grid-83">
                        <div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Project Details</p>
                                    <p className="text-primary"><BiEdit/></p>
                                </div>
                                <div className="py-6 border-gray-300 border-dashed">
                                    <div className="lg:flex justify-between items-center">
                                        <div className="flex">
                                            <div>
                                                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667899753/BOG/sands_cy9q3x.png" alt="order" className="w-16 h-16 lg:h-20 lg:w-20 rounded-lg" />
                                            </div>
                                            <div className="grid content-between  pl-4 fw-500">
                                                <p><span className="text-gray-600 fs-400">Project Name:</span> {project?.title}</p>
                                                <p><span className="text-gray-600 fs-400">Service Required:</span>  {getProjectCategory(project?.projectTypes)} </p>
                                                <p><span className="text-gray-600 fs-400">Start Date:</span> {dayjs(project?.createdAt).format("YYYY-MM-DD")} </p>
                                            </div>
                                        </div>
                                        <div className="fw-500 mt-2 lg:mt-0 lg:text-end">
                                            <p><span className="text-gray-600 fs-400">Project Cost:</span> &#8358;{formatNumber(project?.totalCost || 10000)} </p>
                                            <p><span className="text-gray-600 fs-400">Due Date:</span> {dayjs(project?.endDate).format("YYYY-MM-DD")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Cost Summary</p>
                                    <p className="text-primary"><BiEdit onClick={() => setCost(true)}/></p>
                                </div>
                                <div className="fw-500 min-h-56 justify-between pt-6">
                                    {
                                        sum.length > 0? sum.map((item, index) => (
                                            <div className="flex justify-between border-b py-2" key={index}>
                                                <p>{item?.title}</p>
                                                <p>{item.amount? "NGN" + formatNumber(item?.amount) : ""}</p>
                                            </div>
                                        )):
                                        <p>No costing yet</p>
                                    }
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Transaction</p>
                                </div>
                                {/*<div className="lg:flex fw-500 justify-between pt-6">
                                    <div>
                                        <p>1st Installment Payment</p>
                                        <p className="text-gray-600">Via Paypal</p>
                                    </div>
                                    <div>
                                        <p>20-11-2022</p>
                                    </div>
                                    <div className="mt-2 lg:mt-0">
                                        <p>NGN 1,320, 000</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Project Completion Rate</p>
                                    <p className="text-primary"><BiEdit/></p>
                                </div>
                                <div className="flex flex-col mt-6">
                                    <Progress value={project?.progress ? project?.progress : 0} color={returnColor(project?.progress ? project?.progress : 0)} />
                                    <div className="grid fs-400 content-between pl-4 fw-500 my-3">
                                        <p>{project?.progress ? project?.progress : 0}% completed</p>
                                    </div>
                                </div>
                                {/*<div className="flex mt-6">
                                    <div>
                                        <Avatar src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" variant="circular" alt="order"  />
                                    </div>
                                    <div className="grid fs-400 content-between pl-4 fw-500">
                                        <p>BOG Surveyor</p>
                                        <p className="text-gray-600">updated the due date for land survey</p>
                                        <p className="text-gray-500 text-xs"> 6 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex mt-3">
                                    <div>
                                        <Avatar src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" variant="circular" alt="order"  />
                                    </div>
                                    <div className="grid fs-400 content-between pl-4 fw-500">
                                        <p>BOG Surveyor</p>
                                        <p className="text-gray-600">updated the due date for land survey</p>
                                        <p className="text-gray-500 text-xs"> 9 hours ago</p>
                                    </div>
                                </div> */}
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Service Partner Info</p>
                                    <p className="text-primary"><BiEdit/></p>
                                </div>
                                <div className="flex mt-6">
                                    <div>
                                        <Avatar src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" variant="circular" alt="order"  />
                                    </div>
                                    <div className="grid fs-400 content-between pl-4 fw-500">
                                        <p>{project?.serviceProvider?.company_name}</p>
                                        <p className="text-gray-600">Service Partner</p>
                                    </div>
                                </div>
                                <div className="fs-400 fw-500 mt-4">
                                    <div className="flex">
                                        <p className="text-gray-600">Phone:</p>
                                        <p className="pl-3">{project?.serviceProvider?.service_user?.phone}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600">Email:</p>
                                        <p className="pl-3">{project?.serviceProvider?.service_user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between pb-4">
                                    <p className="fw-600">Client Review</p>
                                    <p className="text-primary"><BiEdit/></p>
                                </div>
                                <div className="fs-400 mt-4">
                                    {project?.reviews.length > 0 ? project.reviews.map((review, index) => (
                                        <div className="flex mt-6" key={index}>
                                            <div>
                                                <Avatar src={review.client.photo} variant="circular" alt="order" />
                                            </div>
                                            <div className="grid fs-400 content-between pl-4 fw-500">
                                                <p>{ review.client.name }</p>
                                                <p className="text-gray-600">{ review.review }</p>
                                                <p className="text-gray-500 text-xs">
                                                    <ReactStars
                                                        count={5}
                                                        size={25}
                                                        color2={'#ffd700'}
                                                        value={review?.star}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Client Info</p>
                                    <p className="text-primary"><BiEdit/></p>
                                </div>
                                <div className="flex mt-6">
                                            <div>
                                                <Avatar src={project?.client?.photo} variant="circular" alt="order"  />
                                            </div>
                                            <div className="grid fs-400 content-between pl-4 fw-500">
                                                <p>{project?.client?.name}</p>
                                                <p className="text-gray-600">{getUserType(project?.client?.userType)}</p>
                                            </div>
                                        </div>
                                <div className="fs-400 fw-500 mt-4">
                                    <div className="flex">
                                        <p className="text-gray-600">Phone:</p>
                                        <p className="pl-3">{project?.client?.phone}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600">Email:</p>
                                        <p className="pl-3">{project?.client?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                cost && (
                    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
                        <div className="bg-white lg:w-5/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                            <p className="fw-600 text-lg mb-6">Update Cost Summary</p>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 rounded border border-gray-400 p-2"
                                        id="name"
                                        name="title"
                                        value={title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                </div>
                                <div className="mt-3">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        className="w-full mt-2 rounded border border-gray-400 p-2"
                                        id="name"
                                        name="amount"
                                        value={amount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                </div>
                                <div className="text-end mt-6">
                                    <button className="btn-primary" onClick={formik.handleSubmit}>
                                       {isLoading? "Updating..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                            <FaTimes className="absolute top-5 right-5" onClick={CloseModal}/>
                        </div>
                    </div>
                )
            }
        </div>
        )
}