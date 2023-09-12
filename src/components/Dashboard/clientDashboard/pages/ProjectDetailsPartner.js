import {
  Breadcrumbs,
  Avatar,
  Progress,
  Popover,
  PopoverHandler,
  Button,
  PopoverContent,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../../../config/config";
import { Loader } from "../../../layouts/Spinner";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { PartnerProgress } from "./projects/Modal/PartnerProgress";
import * as moment from "moment";
import { PartnerUpdates } from "./projects/Modal/PartnerUpdates";
import { formatNumber } from "../../../../services/helper";
import { BsInfoCircle } from "react-icons/bs";

export default function ProjectDetailsPartner() {
  const { search } = useLocation();
  const projectId = new URLSearchParams(search).get("projectId");
  const [project, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [update, setUpdate] = useState([]);

  const getProjectDetail = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      setLoading(true);
      const url = `${process.env.REACT_APP_URL}/projects/v2/view-project/${projectId}`;
      const response = await Axios.get(url, config);
      const { data } = response;
      setProjects(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const getUpdates = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("auth_token"),
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/projects/notification/${project.id}/view`,
      config
    );
    setUpdate(res.data.data);
  };
  const serviceUpdate = update.filter(
    (where) => where.by === "service_partner"
  );
  const CloseModal = () => {
    setProgressModal(false);
    setUpdateModal(false);
  };

  useEffect(() => {
    if (project) {
      getUpdates();
    } // eslint-disable-next-line
  }, [project]);

  useEffect(() => {
    getProjectDetail();
    // eslint-disable-next-line
  }, []);

  if (loading || !project) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  const returnColor = (value) => {
    if (value >= 0 && value < 30) {
      return "red";
    } else if (value >= 30 && value < 70) {
      return "yellow";
    } else if (value >= 70) {
      return "green";
    }
  };

  return (
    <div>
      {project && (
        <div className="min-h-screen fs-500 relative">
          <div className="w-full py-8 bg-white px-4">
            <p className="text-2xl fw-600 lg:flex items-center">
              Project ID:{" "}
              <span className="text-primary px-3">{project?.projectSlug}</span>{" "}
              <span className="text-xs text-blue-500 bg-light px-2">
                {project.status}
              </span>
            </p>
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
                  </div>
                  <div className="py-6 border-gray-300 border-dashed">
                    <div className="lg:flex justify-between items-center">
                      <div className="flex">
                        <div>
                          <img
                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667899753/BOG/sands_cy9q3x.png"
                            alt="order"
                            className="w-16 h-16 lg:h-20 lg:w-20 rounded-lg"
                          />
                        </div>
                        <div className="grid content-between  pl-4 fw-500">
                          <p>
                            <span className="text-gray-600 fs-400">
                              Project Name:
                            </span>{" "}
                            {project?.title}
                          </p>
                          <p>
                            <span className="text-gray-600 fs-400">
                              Service Required:
                            </span>{" "}
                            {project?.projectTypes}
                          </p>
                          <p>
                            <span className="text-gray-600 fs-400">
                              Start Date:
                            </span>{" "}
                            {dayjs(project?.createdAt).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <div className="fw-500 mt-2 lg:mt-0 lg:text-end">
                        <p>
                          <span className="text-gray-600 fs-400">
                            Project Cost:
                          </span>{" "}
                          NGN {project?.totalCost}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400">
                            Due Date:
                          </span>{" "}
                          {dayjs(project?.endDate).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <p className="fw-600">Project Updates</p>
                    <div className="flex items-center gap-x-4">
                      <BiEdit
                        onClick={() => setUpdateModal(true)}
                        className="text-primary"
                      />
                      <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        placement="bottom"
                      >
                        <PopoverHandler>
                          <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none">
                            <BsInfoCircle className="text-primary" />
                          </Button>
                        </PopoverHandler>
                        <PopoverContent>
                          Click on the edit icon to enter updates on this
                          project.
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div>
                    {serviceUpdate.length > 0 ? (
                      serviceUpdate.map((item, index) => (
                        <div className="flex justify-between mt-4">
                          <div className="flex w-10/12">
                            <div className="w-12">
                              <Avatar
                                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png"
                                variant="circular"
                                alt="order"
                              />
                            </div>
                            <div className="grid w-full fs-400 content-between pl-4 fw-500">
                              <p>
                                {item.by === "admin"
                                  ? "BOG ADMIN"
                                  : "BOG Service Partner"}
                              </p>
                              <p className="text-gray-600">{item.body}</p>
                              <p className="text-gray-500 text-xs">
                                {moment(item.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                          <div className="w-2/12 flex justify-end">
                            {item?.image ? (
                              <a
                                href={item.image}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Avatar
                                  src={item.image}
                                  variant="rounded"
                                  alt="order"
                                />
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="py-2 text-center">No Updates Yet</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <p className="fw-600">Project Completion Rate</p>
                    <div className="flex items-center gap-x-2">
                      <BiEdit
                        onClick={() => setProgressModal(true)}
                        className="text-primary"
                      />
                      <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        placement="bottom"
                      >
                        <PopoverHandler>
                          <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none">
                            <BsInfoCircle className="text-primary" />
                          </Button>
                        </PopoverHandler>
                        <PopoverContent>
                          Click on the edit icon to update progress rate of this
                          project.
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6">
                    <Progress
                      value={
                        project?.service_partner_progress
                          ? project?.service_partner_progress
                          : 0
                      }
                      color={returnColor(
                        project?.service_partner_progress
                          ? project?.service_partner_progress
                          : 0
                      )}
                    />
                    <div className="grid fs-400 content-between pl-4 fw-500 my-3">
                      <p>
                        {project?.service_partner_progress
                          ? project?.service_partner_progress
                          : 0}
                        % completed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md mt-7">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <p className="fw-600">Paymet Status</p>
                  </div>
                  <div className="mb-6 mt-3">
                    <div className="flex flex-col">
                      {project?.transactions?.payouts?.length > 0 ? (
                        project?.transactions?.payouts.map((item, index) => (
                          <div
                            className="fw-500 border-b mt-3 pb-3"
                            key={index}
                          >
                            <div className="flex items-center">
                              <p className="text-gray-500">Amount:</p>
                              <p className="pl-3">
                                {"NGN" +
                                  formatNumber(item?.amount || "No Price")}
                              </p>
                            </div>
                            <div className=" mt-2 flex items-center">
                              <p className="text-gray-500">Date:</p>
                              <p className="pl-3">
                                {dayjs(item.createdAt).format("DD-MMM-YYYY")}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Payment made yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {progressModal && (
        <PartnerProgress
          CloseModal={CloseModal}
          getProjectDetail={getProjectDetail}
          project={project}
          id={project.id}
        />
      )}
      {updateModal && (
        <PartnerUpdates
          CloseModal={CloseModal}
          getUpdates={getUpdates}
          project={project}
        />
      )}
    </div>
  );
}
