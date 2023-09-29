import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Breadcrumbs, CardBody, Progress } from "@material-tailwind/react";
import { ProjectChart } from "../assets/UsersChart";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as moment from 'moment'
import { formatNumber, getProjectCategory } from "../../../services/helper";
import { FaRegHandPointRight } from "react-icons/fa";
import { getProjects } from "../../../redux/actions/ProjectAction";
import { Loader } from "../Spinner";


export default function ProjectAdminDashboard(status) {
    const user = useSelector((state) => state.auth.user)

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const stopLoading = () => setLoading(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getProjects(stopLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  


    const projects = useSelector((state) => state.projects.projects);
    const mainProj = projects.filter(where => where.approvalStatus === "approved")
    const pendingProjects = projects.filter(where => where.status === "pending" || where.status === "Pending")
    const ongoingProjects = projects.filter(where => where.status === "ongoing" ||  where.status === "Ongoing")
    const completedProjects = projects.filter(where => where.status === "completed" || where.status === "Completed")
    const cancelledProjects = projects.filter(where => where.status === "cancelled" || where.status === "Cancelled")



    if (loading) {
        return (
            <center>
                <Loader />
            </center>
        )
    }


  return (
    <div className="min-h-screen">
      <div className="w-full py-6 lg:px-8 bg-white px-4">
        <div className="text-2xl fw-600 flex items-center">
          <p className="">Welcome, {user?.name}</p>
          <FontAwesomeIcon icon={faThumbsUp} className="pl-3 text-secondary" />
        </div>
        <p className="mt-3 fs-500">
             Provide solution to projects and users worldwide
        </p>
        <Breadcrumbs className="bg-white pl-0 mt-5">
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
          <Link to="">
            <span>Dashboard</span>
          </Link>
        </Breadcrumbs>
      </div>
      <div className=" p-5">
        <div className="mt-3">
          <div className="lg:grid-4 justify-between fs-500 fw-600">
            <div className="bg-[#e0e7ff] px-4 py-3 rounded flex justify-between items-center shades">
              <Link to="projectsadmin" className="flex justify-between items-center w-full">
                <div>
                    <p className="text-xxl fw-600 pb-2 text-xl">{mainProj? mainProj.length : 0}</p>
                    <p className="text-gray-600">Total Projects</p>
                </div>
                <div className="">
                    <img
                    src={require("../images/users.png")}
                    alt="project"
                    className="-bottom-3 relative w-20"
                    />
                </div>
              </Link>
            </div>
            <div className="bg-orange-100 mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link to="projectsadmin" className="flex justify-between items-center w-full">
                <div>
                    <p className="text-xxl pb-2 fw-600">{ongoingProjects? ongoingProjects.length : 0}</p>
                    <p className="text-gray-600">Ongoing Projects</p>
                </div>
                <div className="">
                    <img
                    src={require("../images/client.png")}
                    alt="orders"
                    className="w-16 lg:mt-2"
                    />
                </div>
              </Link>
            </div>
            <div className="bg-blue-100  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link to="projectsadmin" className="flex justify-between items-center w-full">
                <div>
                    <p className="fw-600 text-xxl pb-2">{pendingProjects? pendingProjects.length : 0}</p>
                    <p className="text-gray-600">Pending Projects</p>
                </div>
                <div className="relative">
                    <img
                    src={require("../images/sp.png")}
                    alt="cart"
                    className="w-16 lg:mt-3"
                    />
                </div>
              </Link>
            </div>
            <div className="bg-green-100  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link to="projectsadmin" className="flex justify-between items-center w-full">
                <div>
                    <p className="text-xxl fw-600 pb-2">{completedProjects? completedProjects.length : 0}</p>
                    <p className="text-gray-600">Completed Projects</p>
                </div>
                <div className="">
                    <img
                    src={require("../images/pp.png")}
                    alt="ongoing"
                    className=" w-16"
                    />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* recent order and chart */}
        <div className="mt-7 lg:grid-83 justify-between">
        <div className=" fw-600 fs-500 bg-white pt-6 rounded">
                <div className="lg:flex px-5 items-center justify-between">
                    <div>
                        <p className="fw-600 text-lg mb-6 lg:mb-0">Ongoing Projects</p>
                    </div>
                    <div>
                       <Link to="projectsadmin">
                        <button className="flex items-center border-b border-primary px-2 py-1"><span className="pr-1">Goto Projects </span><FaRegHandPointRight className="text-lg text-primary"/></button>
                       </Link>
                    </div>
                </div>
                <div>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                            <thead className="thead-light rounded-lg bg-light">
                                <tr className="rounded-lg">
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        S/N
                                    </th>
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        Project ID
                                    </th>
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        Project Category
                                    </th>
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        Date
                                    </th>
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        Project Cost
                                    </th>
                                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="fw-400">
                                {
                                    ongoingProjects.length > 0 ? ongoingProjects.slice(0, 9).map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {index + 1}                    
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {item.projectSlug}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {getProjectCategory(item.projectTypes)}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {moment(item.createdAt).format("MMMM Do YYYY")}{" "}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    NGN {item.totalCost? formatNumber(item.totalCost) : ""}
                                                </td>
                                                <td className="border-b text-blue-600 border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <Progress value={item.progress? item.progress : 0} color="green"/>
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                            </table>
                        </div>
                    </CardBody>
                </div>
            </div>
            <div className="bg-white mt-6 lg:mt-0 rounded py-6 px-4">
                <div className="flex justify-between border-b-2">
                    <p className="fw-600 text-lg">Project Analysis</p>
                </div>
                <div className="mt-4 lg:mt-16">
                    <div className="">
                        <ProjectChart pendingProjects={pendingProjects} completedProjects={completedProjects} ongoingProjects={ongoingProjects} cancelledProjects={cancelledProjects} />
                    </div>
                </div>
            </div>
        </div>
        {/*order table*/}
        <div className="mt-7">
            
        </div>
      </div>
    </div>
  );
}