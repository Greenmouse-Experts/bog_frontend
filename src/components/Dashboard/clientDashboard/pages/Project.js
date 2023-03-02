// import React from "react";
import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Breadcrumbs, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import ProjectChart from "../../assets/ProjectChart";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import ProjectTable from "../../assets/Tables/ProjectTable";
import { getMyProject } from '../../../../redux/actions/ProjectAction';
import { useDispatch } from "react-redux";
import { getProjectCategory } from "../../../../services/helper";
import dayjs from "dayjs";
import { Loader } from "../../../layouts/Spinner";

export default function Projects() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        if (auth.user) {
            setLoading(true);
            dispatch(getMyProject(auth.user.userType, navigate, stopLoading));
        }
    }, [dispatch, auth, navigate])
    let projects = null;

    if (auth?.user?.userType === "private_client") {
        projects = <ClientProject isLoading={ loading } />
    } else if (auth?.user?.userType === "corporate_client") {
        projects = <ClientProject isLoading={loading} />
    } else if (auth?.user?.userType === "professional") {
        projects = <ServiceProject isLoading={loading} />
    } else if (auth?.user?.userType === "admin") {
        projects = <ServiceProject isLoading={loading} />
    }
    return projects;
}

export function ClientProject({isLoading}) {

    // const navigate = useNavigate();

    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                {/* header */}
                <div className="w-full py-8 bg-white px-4">
                    <p className="text-2xl fw-600">My Projects</p>
                    <p className="fs-400 text-gray-600 mt-2">Monitor your project progress</p>
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
                            <span>Projects</span>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* content */}
                {isLoading ? <Loader size />
                    :
                <div className="lg:p-5 px-3 py-5 mt-6">
                    {/* project analysis and calendar*/}
                    <div className="">
                        <div className="lg:p-5 px-2 py-5 bg-white rounded-md">
                            <p className="lg:text-lg fw-600 fs-600">My Projects</p>
                            <div className="mt-4 lg:mt-10">
                                <Tabs>
                                    <TabList className="flex fs-300 lg:fs-600">
                                        <Tab>All Projects</Tab>
                                        <Tab>Pending</Tab>
                                        <Tab>Ongoing</Tab>
                                        <Tab>Completed</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <ProjectTable isLoader={isLoading} />

                                    </TabPanel>
                                    <TabPanel>
                                        <ProjectTable status={"pending"} isLoader={isLoading} />
                                    </TabPanel>
                                    <TabPanel>
                                        <ProjectTable status={"approved"} isLoader={isLoading} />
                                    </TabPanel>
                                    <TabPanel>
                                        <ProjectTable status={"completed"} isLoader={isLoading} />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <div className="lg:grid-74 mt-6 lg:mt-10">
                        <div className="bg-white lg:p-6 p-3 rounded-md">
                            <div className="mb-5">
                                <p className="text-lg fw-600">Project Analysis</p>
                            </div>
                            <ProjectChart />
                        </div>

                        <div className="bg-white rounded-md mt-6 lg:mt-0">
                            <div className="bg-primary text-white rounded-t-md">
                                <p className="py-6 fw-600 ml-7 lg:text-lg">Calender</p>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export function ServiceProject({isLoading}) {
    const { projects } = useSelector((state) => state.projects);

    const navigate = useNavigate();

    const [displayModal, setModal] = useState(false);
    const [targetItem, setTargetItem] = useState('');

    const updateModal = (id) => {
        setTargetItem(id);
        setModal(true);
    }

    const CloseModal = () => {
        setModal(false);
    }

    const submitData = () => { console.log(targetItem)}

    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                {/* header */}
                <div className="w-full py-8 bg-white px-4">
                    <p className="text-2xl fw-600">My Projects</p>
                    <p className="fs-400 text-gray-600 mt-2">Monitor your project progress</p>
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
                            <span>Projects</span>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* content */}
                <div className="lg:p-5 px-3 py-5 mt-6">
                    {/* project analysis for my projects*/}
                    <div className="mt-2">
                        <div className=" fw-600 fs-500 bg-white pt-6 rounded">
                            <div className="flex px-5 justify-between">
                                <div>
                                    <p className="fw-600 fs-600 lg:text-lg mb-6 lg:mb-0">My Projects</p>
                                </div>
                            </div>
                            {isLoading ? <Loader size />
                                :
                            <div className="px-5 mt-6">
                                <div className="overflow-x-auto">
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead className="thead-light bg-light">
                                            <tr>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    S/N
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Project ID
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Project Category
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Location
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Date
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Status
                                                </th>
                                                <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                projects.length > 0 && projects.filter(where => where.status === "ongoing").map((item, index) => (
                                                    <tr>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {index +1 }
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {item.projectSlug}
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {getProjectCategory(item.projectTypes)}
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {item.projectData?.propertyLocation}
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {dayjs(item.createdAt).format("YYYY-MM-DD")}
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            {item.status.toUpperCase()}
                                                        </td>
                                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                            <div className="flex text-xl">
                                                                <Menu>
                                                                    <MenuHandler>
                                                                        <Button>View</Button>
                                                                    </MenuHandler>
                                                                    <MenuList>
                                                                        <MenuItem onClick={() => (navigate(`/dashboard/myprojectdetails/?projectId=${item.id}`))}>View Details</MenuItem>
                                                                        <MenuItem onClick={() => updateModal(item.id)}>Update Details</MenuItem>
                                                                    </MenuList>
                                                                </Menu>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                {displayModal && (
                    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
                        <div className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                            <div className="flex lg:px-6 px-5">
                                <form>
                                    <p className='fs-700'>Give update on the progress of the assigned project</p>
                                    <div className='flex items-center mt-5'>
                                        <p>Percentage Completion</p>
                                        <div className='flex items-center border rounded ml-4 w-24'>
                                            <input type='number' value={0} className='w-10/12 p-1' />
                                            <p className='p-1 fw-600'>%</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                                <Button variant="outlined" ripple={true} onClick={CloseModal}>Cancel</Button>
                                <Button className='bg-primary ml-4' onClick={submitData}>Submit</Button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}