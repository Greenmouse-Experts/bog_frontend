import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ProjectChart from "../../Dashboard/assets/ProjectChart";
import {
  getDispatchedProjects,
  getServicePartnerProjects,
} from "../../../redux/actions/ProjectAction";
import dayjs from "dayjs";
import { Loader } from "../Spinner";
import axios from "axios";
import EmptyData from "../../Dashboard/assets/UI/EmptyData";
import { getStatus } from "../../../services/helper";
import { MdVerified } from "react-icons/md";
// import ProjectChart from "../assets/ProjectChart";

export default function ServiceDashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [filteredProjects, setFilterProjects] = useState([]);

  const stopLoading = () => setLoading(false);

  const dispatchedProjects = useSelector(
    (state) => state.projects.dispatchedProjects
  );
  const assignedProjects = useSelector(
    (state) => state.projects.assignedProjects
  );

  const ongoingProject = assignedProjects?.filter(
    (where) => where.status === "ongoing"
  );
  const completedProject = assignedProjects?.filter(
    (where) => where.status === "completed"
  );
  const avilableProject = dispatchedProjects.filter(
    (where) => where.project.status === "dispatched"
  );

  const currentYear = new Date().getFullYear();
  const [clientYear] = useState(currentYear);
  const allYears = [];

  for (var i = 0; i <= 2; i++) {
    allYears.push(currentYear - i);
  }

  const authToken = localStorage.getItem("auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch(getDispatchedProjects(user.profile.id, stopLoading));
      dispatch(getServicePartnerProjects(user.profile.id, stopLoading));
      axios
        .get(
          `${process.env.REACT_APP_URL}/projects/service-partner-analyze?y=${clientYear}`,
          config
        )
        .then((res) => {
          setFilterProjects(res.data.projects);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  const changeSelect = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/projects/service-partner-analyze?y=${e.target.value}`,
        config
      )
      .then((res) => {
        setFilterProjects(res.data.projects);
      });
  };

  const ongoingFilterProject = filteredProjects?.filter(
    (where) => where.status === "ongoing"
  );
  const completedFilterProject = filteredProjects?.filter(
    (where) => where.status === "completed"
  );

  if (loading) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full py-10 lg:px-8 bg-white px-4 lg:flex justify-between items-center">
        <div>
        <div className="text-2xl fw-600 flex items-center">
          <p className="">Welcome, {user?.name}</p>
          <FontAwesomeIcon icon={faThumbsUp} className="pl-3 text-secondary" />
        </div>
        <p className="mt-3 fs-500">
          Render professional service solutions to users.
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
        <div>
          {user?.profile?.isVerified ? (
            <div>
              <div className="text-center fs-400 fw-500 text-secondary">
                <p>Verified</p>
                <MdVerified className="text-2xl lg:text-5xl text-secondary mx-auto" />
                <p className="fw-600 text-primary">
                  {user?.profile?.kycPoint} KYC Point
                </p>
                <div>
                  <p><span className="fw-600 text-[21px]">{user?.profile?.rating}</span> /5 <span className="text-gray-600">Score Ratings</span></p>
                </div>
              </div>
              <div>
                {user?.profile?.hasActiveSubscription && (
                  <div className="flex items-center gap-x-1">
                    <span className="w-4 h-4 circle bg-secondary block"></span>
                    <span className="fw-600 fs-400">Active Subscription</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center fs-400 fw-500 text-secondary">
                <p>Unverified</p>
                <MdVerified className="text-2xl lg:text-5xl text-gray-400 mx-auto" />
              </div>
              <p></p>
            </div>
          )}
        </div>
      </div>
      <div className=" p-5">
        <div className="mt-3">
          <div className="lg:grid-4 justify-between fs-500 fw-600">
            <div className="px-4 bg-purple-50 py-3 rounded flex justify-between items-center shades">
              <Link
                to="projects"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl fw-600 pb-2 text-xl">
                    {assignedProjects ? assignedProjects.length : 0}{" "}
                  </p>
                  <p className="text-gray-600">Assigned Projects</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/TC.png")}
                    alt="project"
                    className=" relative w-16"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-yellow-50 mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="allprojects"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl pb-2 fw-600">
                    {avilableProject ? avilableProject.length : 0}
                  </p>
                  <p className="text-gray-600">Available Projects</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/PR.png")}
                    alt=""
                    className=" relative w-16 mt-2"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-blue-50 mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="projects"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="fw-600 text-xxl pb-2">
                    {ongoingProject ? ongoingProject.length : 0}
                  </p>
                  <p className="text-gray-600">Ongoing Projects</p>
                </div>
                <div className="relative">
                  <img
                    src={require("../images/TP.png")}
                    alt="cart"
                    className=" relative w-16"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-green-50 mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="projects"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl fw-600 pb-2">
                    {completedProject ? completedProject.length : 0}
                  </p>
                  <p className="text-gray-600">Completed Projects</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/pp.png")}
                    alt="ongoing"
                    className=" left-2 relative w-20"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* project analysis and ongoing project*/}
        <div className="lg:grid-83 justify-between">
          {/* overview */}
          <div className="bg-white mt-6 rounded-lg ">
            <div className="flex w-full bg-primary rounded-t-lg">
              <p className="fw-600 fs-700 flex flex-grow text-white p-4">
                Overview
              </p>
              <select
                className="bg-gray-100 text-sm px-2 h-8 mr-4 mt-3"
                onChange={(e) => changeSelect(e)}
              >
                {allYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-4 py-6">
              <ProjectChart
                ongoing={ongoingFilterProject}
                completed={completedFilterProject}
              />
            </div>
          </div>
          {/* request analysis */}
          <div className="bg-white mt-6 rounded-lg ">
            <div className="flex justify-between fw-600 fs-700 bg-primary rounded-t-lg text-white p-4">
              <p className="fw-600 fs-700">Recent Requests</p>{" "}
              <Link to="allprojects">
                <p className="border-secondary text-black bg-light fs-400 rounded fw-500 px-2 py-1">
                  View All
                </p>
              </Link>
            </div>
            {dispatchedProjects && !dispatchedProjects.length && (
              <EmptyData message="No roject currently" />
            )}
            {dispatchedProjects &&
              !!dispatchedProjects.length &&
              dispatchedProjects.slice(0, 4).map((item, index) => {
                return (
                  <div className="flex mt-8 px-4" key={index}>
                    <div className="lg:w-2/12">
                      <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png"
                        alt=""
                        className="w-12 circle"
                      />
                    </div>
                    <div className="lg:w-10/12 fs-500">
                      <p className="fw-500">{item?.project?.title}</p>
                      <p className="text-secondary fs-400 fw-500">
                        {dayjs(item?.createdAt).format("DD-MMM-YYYY")}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* product requests*/}
        <div>
          <div className="mt-7">
            <div className=" fw-600 fs-500 bg-white rounded">
              <div className="flex justify-between fw-600 fs-700 bg-primary rounded-t-lg text-white p-4">
                <div>
                  <p className="fw-600 fs-600 lg:text-lg mb-6 lg:mb-0">
                    My Projects
                  </p>
                </div>
                <div>
                  <Link to="projects">
                    <p className="border-secondary text-black bg-light fs-400 rounded fw-500 px-2 py-1">
                      View All
                    </p>
                  </Link>
                </div>
              </div>
              <div>
                <CardBody>
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
                        </tr>
                      </thead>
                      {assignedProjects && !assignedProjects.length && (
                        <div className="w-full absolute top-20">
                          <EmptyData message="No projects available" />
                        </div>
                      )}
                      {assignedProjects && !!assignedProjects.length && (
                        <tbody className="fw-400">
                          {assignedProjects.slice(0, 6).map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {index + 1}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.projectSlug}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.projectTypes}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.projectLocation
                                    ? item.projectLocation
                                    : "---"}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {dayjs(item?.createdAt).format("DD-MMM-YYYY")}
                                </td>
                                <td className="border-b text-blue-600 border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {getStatus(item?.status)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </CardBody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
