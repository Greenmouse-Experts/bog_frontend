import { Avatar, Breadcrumbs, Progress } from "@material-tailwind/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import {
    calculatePercentage,
  formatNgnNumber,
  formatNumber,
  getPercentage,
  getProjectCategory,
  getUserType,
} from "../../../../../services/helper";
import { Loader } from "../../../../layouts/Spinner";
import useFetchHook from "../../../../../hooks/useFetchHook";
import { AdminProgress } from "./Modal/AdminProgress";
import { ProjectMain } from "./Modal/AdminDate";
import Axios, { Instance } from "../../../../../config/config";

export default function GtiProjectDetails() {
  const { search } = useLocation();
  const projectId = new URLSearchParams(search).get("projectId");
  const {
    loading,
    data: project,
    refetch,
  } = useFetchHook(`/projects/v2/view-project/${projectId}`);
  const [form, setForm] = useState();
  const [progressModal, setProgressModal] = useState(false);
  const [projectMain, setProjectMain] = useState(false);
  const getForm = async () => {
    const response = await Instance.get(
      `/projects/geotechnical-investigation/order_details/${projectId}`
    );
    setForm(response.data);
  };
  const CloseModal = () => {
    setProgressModal(false);
    setProjectMain(false);
  };
  useEffect(() => {
    getForm();
  }, []);
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
            <Link to="/dashboard/gtiprojects" className="opacity-60">
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
                        <p>
                          <span className="text-gray-600 fs-400 whitespace-nowrap">
                            Total Cost
                          </span>{" "}
                        </p>
                        <p>
                          <span className="text-gray-600 fs-400">Due Date</span>
                        </p>
                      </div>
                      <div className="ml-4 text-start">
                        <p>
                          <span className="text-gray-600 fs-400"></span> &#8358;
                          {formatNumber(project?.totalCost || "No Price")}{" "}
                        </p>
                        <p className="whitespace-nowrap">
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
                </div>
                <div className="py-2 align-middle inline-block min-w-full ">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead className="thead-light bg-light">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                        >
                          Unit
                        </th>
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b fw-600 border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 text-left">
                          MOBILIZATION AND DEMOBILIZATION
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 py-2 text-left">
                          Mobilise and deliver to site all relevant equipment,
                          personnel and materials necessary for the execution of
                          the works as detailed below.
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                          LS
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                          {form?.order_details?.mobilization_amt &&
                            formatNumber(form?.order_details?.mobilization_amt)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left py-2">
                          Allow for demobilization of ditto.
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                          LS
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                          {form?.order_details.demobilization_amt &&
                            formatNumber(
                              form?.order_details.demobilization_amt
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                          BOREHOLE/SPT
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Set-up and dismantle rig at each test point.
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.setup_dismantle_rig_qty &&
                            form?.order_details.setup_dismantle_rig_qty}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          Nr
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.setup_dismantle_rig_amt &&
                            formatNumber(
                              form?.order_details.setup_dismantle_rig_amt
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          {`Drill each borehole to maximum depth of 30m, taking
                        samples at 1.0m depth and change of strata. Also taking
                        SPT at 1.5m advance into the borehole within
                        cohesionless strata.`}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.drilling_spt_qty &&
                            form?.order_details.drilling_spt_qty}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          Nr
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                         
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.drilling_spt_amt &&
                            formatNumber(form?.order_details.drilling_spt_amt)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                          CONE PENETRATION TEST
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Set-up and dismantle CPT machine at each test point.
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.setup_dismantle_cpt_qty &&
                            form?.order_details.setup_dismantle_cpt_qty}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          Nr
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          
                        </td>
                        <td>
                          {form?.order_details.setup_dismantle_cpt_amt &&
                            formatNumber(
                              form?.order_details.setup_dismantle_cpt_amt
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Dutch Cone Penetrometer test conducted to refusal
                          using 10 Tons Machine.
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.dutch_cpt_qty &&
                            form?.order_details.dutch_cpt_qty}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          Nr
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.dutch_cpt_amt &&
                            formatNumber(form?.order_details.dutch_cpt_amt)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                          CHEMICAL ANALYSIS OF GROUND WATER
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Carry out chemical analysis of ground water retrieved
                          from drilled borehole
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details
                            .chemical_analysis_of_ground_water_qty &&
                            form?.order_details
                              .chemical_analysis_of_ground_water_qty}
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          Nr
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details
                            .chemical_analysis_of_ground_water_amt &&
                            formatNumber(
                              form?.order_details
                                .chemical_analysis_of_ground_water_amt
                            )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                          LABORATORY TEST
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Carry out laboratory tests on recovered soil samples
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          LS
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td>
                          {form?.order_details.lab_test && formatNumber(form?.order_details.lab_test)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                          REPORTS
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                          Prepare geotechnical investigation report and submit 3
                          hard copies of report and 1 electronic copy
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          LS
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {form?.order_details.report && formatNumber(form?.order_details.report)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                          SUBTOTAL
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {/* {formatNgnNumber(tots)} */}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                          VAT
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          7.5%
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {formatNgnNumber(getPercentage(project?.totalCost, 7.5))}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                          TOTAL
                        </td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                        <td className=" text-lg fw-600 border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                          {formatNgnNumber(calculatePercentage(project?.totalCost, 7.5))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
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
              </div> */}
            </div>
            <div>
              <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p className="fw-600">Completion Rate</p>
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
      {progressModal && (
        <AdminProgress
          CloseModal={CloseModal}
          id={project.id}
          refetch={refetch}
        />
      )}
      {projectMain && (
        <ProjectMain
          CloseModal={CloseModal}
          project={project}
          id={project.id}
          refetch={refetch}
          noPrice
        />
      )}
    </div>
  );
}
