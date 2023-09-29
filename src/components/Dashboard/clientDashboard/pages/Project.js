// import React from "react";
import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Breadcrumbs, Button, Popover, PopoverContent, PopoverHandler, Progress } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProjectTable from "../../assets/Tables/ProjectTable";
import { getMyProject } from "../../../../redux/actions/ProjectAction";
import { useDispatch } from "react-redux";
import { getProjectCategory, getStatus } from "../../../../services/helper";
import dayjs from "dayjs";
import { Loader } from "../../../layouts/Spinner";
import MyProjectChart from "../../assets/myProjectChart";
import EmptyData from "../../assets/UI/EmptyData";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";

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
  }, [dispatch, auth, navigate]);

  let projects = null;

  if (auth?.user?.userType === "private_client") {
    projects = <ClientProject isLoading={loading} />;
  } else if (auth?.user?.userType === "corporate_client") {
    projects = <ClientProject isLoading={loading} />;
  } else if (auth?.user?.userType === "professional") {
    projects = <ServiceProject isLoading={loading} />;
  } else if (auth?.user?.userType === "admin") {
    projects = <ServiceProject isLoading={loading} />;
  }
  return projects;
}

export function ClientProject({ isLoading }) {
  // const navigate = useNavigate();
  let myProjects = useSelector((state) => state.projects.projects);

  const ongoingProjects = myProjects.filter(
    (project) => project.status === "ongoing"
  );

  const completedProjects = myProjects.filter(
    (project) => project.status === "approved"
  );

  const pendingProjects = myProjects.filter(
    (project) => project.status === "pending"
  );

  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        {/* header */}
        <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
          <div>
          <p className="text-2xl fw-600">My Projects</p>
          <p className="fs-400 text-gray-600 mt-2">
            Monitor your project progress
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
              <span>Projects</span>
            </Link>
          </Breadcrumbs>
          </div>
          <div className="mt-3 lg:mt-0">
            <Link to={'/services'} className="flex gap-x-3 bg-secondary text-white fw-600 px-5 py-2 rounded-lg hover:scale-105 duration-100"><MdOutlineDesignServices className="text-2xl"/>Request Service</Link>
          </div>
        </div>
        {/* content */}
        {isLoading ? (
          <Loader size />
        ) : (
          <div className="lg:p-5 px-3 py-5 mt-6">
            {/* project analysis and calendar*/}
            <div className="">
              <div className="lg:p-5 px-2 py-5 bg-white rounded-md">
                <div className="flex justify-between items-center ">
                <p className="lg:text-lg fw-600 fs-600">My Projects</p>
                <Popover
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    placement="bottom"
                  >
                    <PopoverHandler>
                      <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none">
                        <BsInfoCircle className="text-primary text-2xl" />
                      </Button>
                    </PopoverHandler>
                    <PopoverContent className="w-48 lg:w-66 xl:w-96">
                      After application, please pay your commencement fee to enable the admin approve your project. After approval a service provider is assigned to your project, cost summary and project end date is also added to the project details.
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-4 lg:mt-10">
                  <Tabs>
                    <TabList className="flex fs-300 lg:fs-600">
                      <Tab>All Projects</Tab>
                      <Tab>Pending</Tab>
                      <Tab>Ongoing</Tab>
                      <Tab>Completed</Tab>
                      <Tab>Overdue</Tab>
                    </TabList>
                    <TabPanel>
                      <ProjectTable isLoader={isLoading} />
                    </TabPanel>
                    <TabPanel>
                      <ProjectTable status={"pending"} isLoader={isLoading} />
                    </TabPanel>
                    <TabPanel>
                      <ProjectTable status={"ongoing"} isLoader={isLoading} />
                    </TabPanel>
                    <TabPanel>
                      <ProjectTable status={"completed"} isLoader={isLoading} />
                    </TabPanel>
                    <TabPanel>
                      <ProjectTable status={"overdue"} isLoader={isLoading} />
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-10">
              <div className="bg-white lg:p-6 p-3 rounded-md w-full">
                <div className="mb-5">
                  <p className="text-lg fw-600">Project Analysis</p>
                </div>
                {
                  <MyProjectChart
                    ongoing={ongoingProjects}
                    completed={completedProjects}
                    pending={pendingProjects}
                  />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ServiceProject({ isLoading }) {
  const { projects } = useSelector((state) => state.projects);

  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        {/* header */}
        <div className="w-full py-8 bg-white px-4">
          <p className="text-2xl fw-600">My Projects</p>
          <p className="fs-400 text-gray-600 mt-2">
            Monitor your project progress
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
                <div className=" w-full flex gap-x-3 items-center justify-between">
                  <p className="fw-600 fs-600 lg:text-lg mb-6 lg:mb-0">
                    My Projects
                  </p>
                  <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  placement="bottom"
                >
                  <PopoverHandler>
                    <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none">
                      <BsInfoCircle className="text-xl text-primary" />
                    </Button>
                  </PopoverHandler>
                  <PopoverContent >
                    View the list of projects assigned to you.
                  </PopoverContent>
                </Popover>
                </div>
              </div>
              {isLoading ? (
                <Loader size />
              ) : (
                <div className="px-5 mt-6">
                  <div className="overflow-x-auto relative min-h-[250px]">
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
                            Project Type
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Project Title
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Date
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Progress
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Status
                          </th>
                          <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      {projects && !projects.length && (
                        <div className="w-full absolute top-20">
                          <EmptyData message="No Project assigned to you yet" />
                        </div>
                      )}
                      {projects && !!projects.length && (
                        <tbody>
                          {projects.map((item, index) => (
                            <tr>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {index + 1}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {item.projectSlug}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {getProjectCategory(item.projectTypes)}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {item.title}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {dayjs(item.createdAt).format("YYYY-MM-DD")}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                              <Progress value={item.service_partner_progress} size="xl" />
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                {getStatus(item.status)}
                              </td>
                              <td className="border-b border-gray-200 align-middle fw-400 whitespace-nowrap px-2 py-4 text-left">
                                <div className="flex text-xl">
                                  <Button
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/projectpartnerdetails/?projectId=${item.id}`
                                      )
                                    }
                                  >
                                    View
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
