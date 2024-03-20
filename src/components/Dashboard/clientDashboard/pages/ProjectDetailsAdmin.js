import { Avatar, Breadcrumbs, Progress } from "@material-tailwind/react";
import axios from "axios";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import useFetchHook from "../../../../hooks/useFetchHook";
import {
  formatNumber,
  getProjectCategory,
  getUserType,
} from "../../../../services/helper";
import { Loader } from "../../../layouts/Spinner";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { AdminProgress } from "./projects/Modal/AdminProgress";
import { AdminUpdates } from "./projects/Modal/AdminUpdates";
import * as moment from "moment";
import { ProjectMain } from "./projects/Modal/AdminDate";
import { PartnerPayment } from "./projects/Modal/PartnerPayment";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export default function ProjectDetails() {
  const { search } = useLocation();
  const projectId = new URLSearchParams(search).get("projectId");
  const {
    loading,
    data: project,
    refetch,
  } = useFetchHook(`/projects/v2/view-project/${projectId}`);
  const [cost, setCost] = useState(false);
  const [installment, setInstallment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sum, setSum] = useState(false);
  const [install, setInstall] = useState([]);
  const [update, setUpdate] = useState([]);
  const [progressModal, setProgressModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [projectMain, setProjectMain] = useState(false);
  const [partnerPaymentModal, setPartnerPaymentModal] = useState(false);
  const [total, setTotal] = useState(0);

  const CloseModal = () => {
    setCost(false);
    setInstallment(false);
    setProgressModal(false);
    setUpdateModal(false);
    setProjectMain(false);
    setPartnerPaymentModal(false);
  };

  // get the cost summary
  const getCostSummary = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("auth_token"),
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/projects/installments/${project?.id}/view?type=cost`,
      config
    );
    setSum(res.data.data);
  };
  const getInstallSummary = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("auth_token"),
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/projects/installments/${project?.id}/view?type=installment`,
      config
    );
    setInstall(res.data.data);
  };
  const getUpdates = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("auth_token"),
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/projects/notification/${project?.id}/view`,
      config
    );
    setUpdate(res.data.data);
  };
  const getTotal = async () => {
    if(sum){
    setTotal(sum.reduce((sum, r) => sum + r.amount, 0));}
  };

  // sort installment
  const sortedInstall = install?.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt, undefined, { numeric: true })
  );

  useEffect(() => {
    if (project) {
      getCostSummary();
      getInstallSummary();
      getUpdates();
      getTotal();
    }
    // eslint-disable-next-line
  }, [project]);

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line
  }, [sum]);

  // cost summary post request
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const paylaod = {
        ...values,
        project_slug: project.projectSlug,
        type: title.includes("Installment") === true ? "installment" : "cost",
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/projects/installments/create`,
        paylaod,
        config
      );
      setIsLoading(false);
      CloseModal();
      refetch();
      toast.success(response.data.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "green", color: "white" },
      });
      return response;
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      dueDate: "",
    },
    onSubmit: handleSubmit,
  });
  const { title, amount, dueDate } = formik.values;
  if (loading) {
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
      <div className="min-h-screen fs-500 relative">
        <div className="w-full py-8 bg-white px-4">
          <p className="text-2xl fw-600 lg:flex items-center">
            Project ID:{" "}
            <span className="text-primary px-3">{project?.projectSlug}</span>{" "}
            <span className="text-xs text-blue-500 bg-light px-2">
              {project?.status.toUpperCase()}
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
            <Link to="/dashboard/projectsadmin" className="opacity-60">
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
                  <p className="text-primary">
                    <BiEdit
                      onClick={() => setProjectMain(true)}
                      className="cursor-pointer"
                    />
                  </p>
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
                          {getProjectCategory(project?.projectTypes)}{" "}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400">
                            Request Date:
                          </span>{" "}
                          {dayjs(project?.createdAt).format("YYYY-MM-DD")}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="fw-500 flex mt-6 lg:mt-0 lg:text-end">
                      <div>
                        <p className="block opacity-0">l</p>
                        <p>
                          <span className="text-gray-600 fs-400">
                            Total Cost
                          </span>{" "}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400">Due Date</span>
                        </p>
                      </div>
                      <div className="ml-4 text-primary">
                        <p>Service Partner</p>
                        <p>
                          <span className="text-gray-600 fs-400"></span> &#8358;
                          {formatNumber(
                            project?.estimatedCost || "No Price"
                          )}{" "}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400"></span>{" "}
                          {project?.endDate
                            ? dayjs(project?.endDate).format("YYYY-MM-DD")
                            : "No date"}
                        </p>
                      </div>
                      <div className="ml-4 text-start">
                        <p className="text-start">BOG</p>
                        <p>
                          <span className="text-gray-600 fs-400"></span> &#8358;
                          {formatNumber(project?.totalCost || "No Price")}{" "}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400"></span>{" "}
                          {project?.totalEndDate
                            ? dayjs(project?.totalEndDate).format("YYYY-MM-DD")
                            : "No date"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Cost Summary</p>
                  <p className="text-primary">
                    <BiEdit
                      className="cursor-pointer"
                      onClick={() => setCost(true)}
                    />
                  </p>
                </div>
                <div className="fw-500 min-h-56 justify-between pt-6">
                  {sum.length > 0 ? (
                    sum.map((item, index) => (
                      <div
                        className="flex justify-between border-b py-2"
                        key={index}
                      >
                        <p>{item?.title}</p>
                        <p>
                          {item.amount
                            ? "NGN" + formatNumber(item?.amount)
                            : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No costing yet</p>
                  )}
                  <p className="border-t text-end fw-500 text-lg">
                    NGN{total === 0 ? "" : formatNumber(total)}
                  </p>
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Transaction</p>
                  <p className="text-primary">
                    <BiEdit
                      className="cursor-pointer"
                      onClick={() => setInstallment(true)}
                    />
                  </p>
                </div>
                <div className="">
                  {install.length > 0 ? (
                    sortedInstall.map((item, index) => (
                      <div
                        className="flex items-top fw-500 justify-between pt-6"
                        key={index}
                      >
                        <div className="flex w-10/12">
                          <div className="w-6/12">
                            <p>{item.title}</p>
                            <p className="text-gray-600">Via Paystack</p>
                          </div>
                          <div className="w-6/12">
                            <p>NGN{formatNumber(item.amount)}</p>
                            <p>
                              {item.paid ? (
                                <p className="flex text-green-600 fw-500 items-center gap-x-2">
                                  Paid{" "}
                                  <BsDatabaseFillCheck className="text-lg" />
                                </p>
                              ) : (
                                <p className="flex text-red-600 fw-500 items-center gap-x-2">
                                  Not Paid <MdOutlineCancel />
                                </p>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 lg:mt-0">
                          <p className="">Due Date</p>
                          <p className="text-primary fw-600">
                            {item.dueDate && item.dueDate}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4">No Installment yet</p>
                  )}
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Project Progress Update</p>
                  <p className="text-primary">
                    <BiEdit
                      className="cursor-pointer"
                      onClick={() => setUpdateModal(true)}
                    />
                  </p>
                </div>
                {update.length > 0 ? (
                  update.map((item, index) => (
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
                          <a href={item.image} target="_blank" rel="noreferrer">
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
            <div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Project Partner Payment</p>
                </div>
                <div className="flex flex-col mt-6">
                  {project?.transactions?.payouts?.length > 0 ? (
                    project?.transactions?.payouts.map((item, index) => (
                      <div className="fw-500 border-b pb-3" key={index}>
                        <div className="flex items-center">
                          <p className="text-gray-500">Amount:</p>
                          <p className="pl-3">
                            {"NGN" + formatNumber(item?.amount || "No Price")}
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
                <div className="text-center mt-10">
                  <button
                    className="btn-primary py-2 px-16"
                    onClick={() => setPartnerPaymentModal(true)}
                  >
                    Initalize Payment
                  </button>
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Partner Completion Rate</p>
                </div>
                <div className="flex flex-col mt-6">
                  <Progress
                    value={
                      project?.service_partner_progress
                        ? project?.service_partner_progress
                        : 0
                    }
                    color={returnColor(
                      project?.progress ? project?.progress : 0
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
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Admin Completion Rate</p>
                  <p className="text-primary cursor-pointer">
                    <BiEdit onClick={() => setProgressModal(true)} />
                  </p>
                </div>
                <div className="flex flex-col mt-6">
                  <Progress
                    value={project?.progress ? project?.progress : 0}
                    color={returnColor(
                      project?.progress ? project?.progress : 0
                    )}
                  />
                  <div className="grid fs-400 content-between pl-4 fw-500 my-3">
                    <p>
                      {project?.progress ? project?.progress : 0}% completed
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Service Partner Info</p>
                </div>
                <div className="flex mt-6">
                  <div>
                    <Avatar
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png"
                      variant="circular"
                      alt="order"
                    />
                  </div>
                  <div className="grid fs-400 content-between pl-4 fw-500">
                    <p>{project?.serviceProvider?.company_name}</p>
                    <p className="text-gray-600">Service Partner</p>
                  </div>
                </div>
                <div className="fs-400 fw-500 mt-4">
                  <div className="flex">
                    <p className="text-gray-600">Phone:</p>
                    <p className="pl-3">
                      {project?.serviceProvider?.details?.phone}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-600">Email:</p>
                    <p className="pl-3">
                      {project?.serviceProvider?.details?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between pb-4">
                  <p className="fw-600">Client Review</p>
                </div>
                <div className="fs-400 mt-4">
                  {project?.reviews.length > 0
                    ? project.reviews.map((review, index) => (
                        <div className="flex mt-6" key={index}>
                          <div>
                            {review.client.photo ? (
                              <Avatar
                                src={review.client.photo}
                                variant="circular"
                                alt="order"
                              />
                            ) : (
                              <Avatar
                                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png"
                                variant="circular"
                                alt="order"
                              />
                            )}
                          </div>
                          <div className="grid fs-400 content-between pl-4 fw-500">
                            <p>{review.client.name}</p>
                            <p className="text-gray-600">{review.review}</p>
                            <p className="text-gray-500 text-xs">
                              <ReactStars
                                count={5}
                                size={25}
                                color2={"#ffd700"}
                                value={review?.star}
                              />
                            </p>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Client Info</p>
                </div>
                <div className="flex mt-6">
                  <div>
                    {project?.client?.photo ? (
                      <Avatar
                        src={project?.client?.photo}
                        variant="circular"
                        alt="order"
                      />
                    ) : (
                      <Avatar
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png"
                        variant="circular"
                        alt="order"
                      />
                    )}
                  </div>
                  <div className="grid fs-400 content-between pl-4 fw-500">
                    <p>{project?.client?.name}</p>
                    <p className="text-gray-600">
                      {getUserType(project?.client?.userType)}
                    </p>
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
      {cost && (
        <div
          className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-white lg:w-5/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
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
                  {isLoading ? "Updating..." : "Submit"}
                </button>
              </div>
            </form>
            <FaTimes className="absolute top-5 right-5" onClick={CloseModal} />
          </div>
        </div>
      )}
      {installment && (
        <div
          className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-white lg:w-5/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="fw-600 text-lg mb-6">Set Installmental Cost</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Installment</label>
                <select
                  className="w-full mt-2 rounded border border-gray-400 p-2"
                  id="name"
                  name="title"
                  value={title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Installment</option>
                  <option value="First Installment">First Installment</option>
                  <option value="Second Installment">Second Installment</option>
                  <option value="Third Installment">Third Installment</option>
                  <option value="Fourth Installment">Fourth Installment</option>
                </select>
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
              <div className="mt-3">
                <label>Due Date</label>
                <input
                  type="date"
                  className="w-full mt-2 rounded border border-gray-400 p-2"
                  id="name"
                  name="dueDate"
                  value={dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="text-end mt-6">
                <button className="btn-primary" onClick={formik.handleSubmit}>
                  {isLoading ? "Updating..." : "Submit"}
                </button>
              </div>
            </form>
            <FaTimes className="absolute top-5 right-5" onClick={CloseModal} />
          </div>
        </div>
      )}
      {progressModal && (
        <AdminProgress
          CloseModal={CloseModal}
          id={project.id}
          refetch={refetch}
        />
      )}
      {updateModal && (
        <AdminUpdates
          CloseModal={CloseModal}
          getUpdates={getUpdates}
          project={project}
        />
      )}
      {projectMain && (
        <ProjectMain
          CloseModal={CloseModal}
          project={project}
          id={project.id}
          refetch={refetch}
        />
      )}
      {partnerPaymentModal && (
        <PartnerPayment
          CloseModal={CloseModal}
          project={project}
          id={project.id}
        />
      )}
    </div>
  );
}
