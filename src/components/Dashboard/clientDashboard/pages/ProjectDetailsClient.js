import { Breadcrumbs,Avatar, Progress } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../../../config/config";
import { Loader } from "../../../layouts/Spinner";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { formatNumber, getUserType } from "../../../../services/helper";
import { ClientReview } from "./projects/clientReview";
import * as moment from 'moment'
import axios from "axios";
import { InstallPayment } from "./projects/InstallPayment";

export default function ProjectDetailsClient() {
    const { search } = useLocation();
    const projectId = new URLSearchParams(search).get("projectId");
    const [project, setProjects] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(false)
    const [install, setInstall] = useState([])
    const [update, setUpdate] = useState([])
    const [total, setTotal] = useState(0)
    const auth = useSelector(state => state.auth.user);

    console.log(auth);

    const getProjectDetail = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    authorization: localStorage.getItem("auth_token"),
                },
            };
            setLoading(true);
            const url = `${process.env.REACT_APP_URL}/projects/v2/view-project/${projectId}`
            const response = await Axios.get(url, config);
            const { data } = response;
            setProjects(data)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    const getCostSummary = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem("auth_token")
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_URL }/projects/installments/${project.id}/view?type=cost`, config)
        setSum(res.data.data)
    }
    const getInstallSummary = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem("auth_token")
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_URL }/projects/installments/${project.id}/view?type=installment`, config)
        setInstall(res.data.data)
    }
    const getUpdates = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'authorization': localStorage.getItem("auth_token")
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_URL }/projects/notification/${project.id}/view`, config)
        setUpdate(res.data.data)
    }
    const adminUpdate = update.filter(where => where.by === "admin")
    const getTotal = () => {
        if(total === 0){
            setTotal(sum.reduce((sum, r) => sum + r.amount, 0))
            console.log(total);
        }
    }

    useEffect(() => {
        if(project){
            getCostSummary()
            getInstallSummary()
            getUpdates()
        }// eslint-disable-next-line 
    },[project])

    useEffect(() => {
        getProjectDetail();
        // eslint-disable-next-line 
    }, [])
    useEffect(() => {
        if(sum){
            getTotal()
        }// eslint-disable-next-line 
    }, [sum])

    if (loading || !project) {
        return <center>
            <Loader />
        </center>
    }

    const returnColor = (value) => {
        if((value >= 0) && (value < 30)) {
            return 'red'
        }
        else if ((value >= 30) && (value < 70)) {
            return 'yellow'
        }
        else if (value >= 70) {
            return 'green'
        }
    }

    const getUsersReview = (reviews) => {
        let objData;
        reviews.forEach(review => {
            if (review.client.id === auth.id) {
                objData = { review: review.review, star: review.star }
            }
        });

        return objData || null
    }

    return (
        <div>
        {
            project &&
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4">
                    <p className="text-2xl fw-600 lg:flex items-center">Project ID: <span className="text-primary px-3">{project?.projectSlug}</span> <span className="text-xs text-blue-500 bg-light px-2">{project.status}</span></p>
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
                        <Link to="/dashboard/projects" className="opacity-60">
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
                                </div>
                                <div className="py-6 border-gray-300 border-dashed">
                                    <div className="lg:flex justify-between items-center">
                                        <div className="flex">
                                            <div>
                                                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667899753/BOG/sands_cy9q3x.png" alt="order" className="w-16 h-16 lg:h-20 lg:w-20 rounded-lg" />
                                            </div>
                                            <div className="grid content-between  pl-4 fw-500">
                                                        <p><span className="text-gray-600 fs-400">Project Name:</span> {project?.title }</p>
                                                        <p><span className="text-gray-600 fs-400">Service Required:</span> {project?.projectTypes}</p>
                                                        <p><span className="text-gray-600 fs-400">Start Date:</span> {dayjs(project?.createdAt).format('DD/MM/YYYY')}</p>
                                            </div>
                                        </div>
                                        <div className="fw-500 mt-2 lg:mt-0 lg:text-end">
                                                    <p><span className="text-gray-600 fs-400">Project Cost:</span> NGN {project?.totalCost? formatNumber(project?.totalCost) : "0"}</p>
                                                    <p><span className="text-gray-600 fs-400">Due Date:</span> {dayjs(project?.totalEndDate).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Cost Summary</p>
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
                                    <p className="border-t text-end fw-500 text-lg">NGN{total === 0? "" : formatNumber(total)}</p>
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Transaction</p>
                                </div>
                                <div className="">
                                    {
                                        install.length > 0? install.map((item, index) => (
                                            <InstallPayment item={item} index={index} id={project.id}/>
                                        ))
                                        :
                                        <p className="text-center py-4">No Installment yet</p>
                                    }
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Admin Progress Updates</p>
                                </div>
                                <div className="">
                                    {
                                       adminUpdate.length > 0 ?
                                           adminUpdate.map((item,index) => (
                                                <div className="lg:flex justify-between mt-4">
                                                    <div className="flex lg:w-10/12">
                                                            <div className="w-12">
                                                                {/* <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" alt="order" className="w-16 h-16 lg:h-20 lg:w-20 rounded-lg" /> */}
                                                                <Avatar src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" variant="circular" alt="order"  />
                                                            </div>
                                                            <div className="grid w-full fs-400 content-between pl-4 fw-500">
                                                                <p>{item.by === "admin"? "BOG ADMIN" : "BOG Service Partner"}</p>
                                                                <p className="text-gray-600">{item.body}</p>
                                                                <p className="text-gray-500 text-xs">{moment(item.createdAt).fromNow()}</p>
                                                            </div>
                                                    </div>
                                                    <div className="lg:w-2/12 mt-3 lg:mt-0 flex justify-end">
                                                            {
                                                                item?.image?
                                                                <a href={item.image} target="_blank" rel="noreferrer"><Avatar src={item.image} variant="rounded" alt="order"  /></a>
                                                                :
                                                                ''
                                                            }
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <p className="py-2 text-center">No Updates Yet</p>
                                        }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                    <p className="fw-600">Project Completion Rate</p>
                                </div>
                                <div className="flex flex-col mt-6">
                                    <Progress value={project?.progress ? project?.progress : 0} color={returnColor(project?.progress ? project?.progress : 0)} />
                                    <div className="grid fs-400 content-between pl-4 fw-500 my-3">
                                        <p>{project?.progress ? project?.progress : 0}% completed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between pb-4">
                                    <p className="fw-600">Client Review</p>
                                </div>
                                        <div className="fs-400 mt-4">
                                            {((auth.userType === 'private_client') || (auth.userType === 'corporate_client'))
                                                ? 
                                                <ClientReview review={getUsersReview(project?.reviews)} projectId={project?.id} />
                                                :
                                                (
                                                    project?.reviews.length > 0 ? project.reviews.map((review, index) => (
                                                        <div className="flex mt-6" key={index}>
                                                            <div>
                                                                <Avatar src={review.client.photo} variant="circular" alt="order" />
                                                            </div>
                                                            <div className="grid fs-400 content-between pl-4 fw-500">
                                                                <p>{review.client.name}</p>
                                                                <p className="text-gray-600">{review.review}</p>
                                                                <p className="text-gray-500 text-xs"> 6 hours ago</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                        :
                                                        ''
                                                )
                                                }
                                </div>
                            </div>
                            <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                                <div className="flex justify-between border-b border-gray-300 pb-4">
                                            <p className="fw-600">{(auth.userType === 'private_client' || auth.userType === 'corporate_client') ? `My Info` : `Client Info` }</p>
                                </div>
                               <div className="flex mt-6">
                                    <div>
                                        <Avatar src={project?.client?.photo} variant="circular" alt="order" />
                                    </div>
                                    <div className="grid fs-400 content-between pl-4 fw-500">
                                                <p>{project?.client?.fname} { project?.client?.lname }</p>
                                                <p className="text-gray-600">{getUserType(project?.client?.userType)}</p>
                                    </div>
                                </div>
                                <div className="fs-400 fw-500 mt-4">
                                    <div className="flex">
                                        <p className="text-gray-600">Phone:</p>
                                                <p className="pl-3">{ project?.client?.phone }</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-gray-600">Email:</p>
                                                <p className="pl-3">{ project?.client?.email }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
        )
}