import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, CardBody, Progress } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProductOwnerOrders } from "../../../redux/actions/OrderAction";
import { getUserProducts } from "../../../redux/actions/ProductAction";
import dayjs from "dayjs";
import { formatNumber, getStatus, paidStatus } from "../../../services/helper";
import { ProductAnalysis } from "../assets/ProductAnalysis";
import { OrderAnalysis } from "../assets/OrderAnalysis";
import { Loader } from "../Spinner";
import EmptyData from "../../Dashboard/assets/UI/EmptyData";
import { MdVerified } from "react-icons/md";
// import ProjectChart from "../assets/ProjectChart";

export default function ProductDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const stopLoading = () => setLoading(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserProducts(stopLoading));
    dispatch(getProductOwnerOrders(stopLoading));
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.products.userProducts);
  const orders = useSelector((state) => state.orders.orderRequests);

  const storeProducts = product.filter((where) => where.showInShop === true);
  const completedOrders = orders.filter(
    (where) => where.order.status === "completed"
  );
  const ongoingOrders = orders.filter(
    (where) => where.order.status === "ongoing"
  );
  const pendingOrders = orders.filter(
    (where) => where.order.status === "pending"
  );
  const approvedProduct = product.filter(
    (where) => where.status === "approved"
  );
  const reviewProduct = product.filter((where) => where.status === "in_review");
  const disapprovedProduct = product.filter(
    (where) => where.status === "disapproved"
  );

  const total = completedOrders.reduce((sum, r) => sum + r.amount, 0);

  if (loading) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full py-10 pb-8 lg:px-8 bg-white px-4 lg:flex justify-between items-center">
        <div>
          <div className="text-2xl fw-600 flex items-center">
            <p className="">Welcome, {user?.name}</p>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="pl-3 text-secondary"
            />
          </div>
          <p className="mt-3 fs-500">
            Enjoy full control of your construction projects
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
            <div className="bg-white px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="products"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl fw-600 pb-2 text-xl">
                    {product ? product.length : 0}
                  </p>
                  <p className="text-gray-600">Total Producs</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/request.png")}
                    alt="project"
                    className=" relative w-16"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-white  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="products"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl fw-600 pb-2">
                    {storeProducts ? storeProducts.length : 0}
                  </p>
                  <p className="text-gray-600">Products in Store</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/complete.png")}
                    alt="ongoing"
                    className=" left-2 relative w-20"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-white mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="order-request"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="text-xxl pb-2 fw-600">
                    {orders ? orders.length : 0}
                  </p>
                  <p className="text-gray-600">Order Request</p>
                </div>
                <div className="">
                  <img
                    src={require("../images/pending.png")}
                    alt=""
                    className=" relative w-16 mt-2"
                  />
                </div>
              </Link>
            </div>
            <div className="bg-white  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
              <Link
                to="order-request"
                className="flex justify-between items-center w-full"
              >
                <div>
                  <p className="fw-600 text-xxl pb-2">
                    {completedOrders ? completedOrders.length : 0}
                  </p>
                  <p className="text-gray-600">Completed Deliveries</p>
                </div>
                <div className="relative">
                  <img
                    src={require("../images/deliver.png")}
                    alt="cart"
                    className=" relative w-16"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* product requests*/}
        <div>
          <div className="mt-7">
            <div className=" fw-600 fs-500 bg-white pt-6 rounded">
              <div className="flex px-5 justify-between">
                <div>
                  <p className="fw-600 fs-600 lg:text-lg mb-6 lg:mb-0">
                    Order Request
                  </p>
                </div>
                <div>
                  <Link to="order-request">
                    <p className="lg:px-6 px-2 fs-400 lg:fs-600py-1 border border-orange-800 text-secondary rounded-lg fs-400">
                      All Items
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
                            Order ID
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Product Name
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Quantity
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Date
                          </th>
                          <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                            Order Status
                          </th>
                          <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                            Payment Status
                          </th>
                        </tr>
                      </thead>
                      {orders && !orders.length && (
                        <div className="w-full absolute top-20">
                          <EmptyData message="No Orders Yet" />
                        </div>
                      )}
                      {orders && !!orders.length && (
                        <tbody className="fw-400">
                          {orders.slice(0, 6).map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {index + 1}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.order.orderSlug}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.product.name}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {item?.quantity}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {dayjs(item?.createdAt).format("DD-MMM-YYYY")}
                                </td>
                                <td className="border-b text-blue-600 border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {getStatus(item?.order.status)}
                                </td>
                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                  {paidStatus(item?.status)}
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
        {/* project analysis and ongoing project*/}
        <div className="lg:grid-3 justify-between lg:mt-8">
          {/* overview */}
          <div className="bg-white mt-6 rounded-lg ">
            <p className="fw-600 fs-700 bg-primary rounded-t-lg text-white p-4">
              Overview
            </p>
            <div className="mt-5 fs-400 px-4 py-6">
              <div className="mb-3">
                <div className="flex justify-between">
                  <p className="mb-2">Total Revenue</p>
                  <p className="text-green-600 fw-600">
                    NGN {formatNumber(total)}
                  </p>
                </div>
                <Progress color="green" value="95" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between">
                  <p className="mb-2">Expenses</p>
                  <p className="text-red-600">NGN 0</p>
                </div>
                <Progress color="red" value="0" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between">
                  <p className="mb-2">Profit</p>
                  <p className="text-green-600">NGN {formatNumber(total)}</p>
                </div>
                <Progress color="green" value="95" />
              </div>
            </div>
          </div>
          {/* request analysis */}
          <div className="bg-white mt-6 rounded-lg ">
            <div>
              <p className="fw-600 fs-700 bg-primary rounded-t-lg text-white p-4">
                Product Analysis
              </p>
            </div>
            <div className="mt-4 px-4 py-6">
              <ProductAnalysis
                approvedProduct={approvedProduct}
                disapprovedProduct={disapprovedProduct}
                reviewProduct={reviewProduct}
              />
            </div>
          </div>
          {/* ivoices */}
          <div className="bg-white mt-6 rounded-lg ">
            <div className="flex justify-between bg-primary rounded-t-lg text-white p-4">
              <p className="fw-600 fs-700 ">Order Analysis</p>
            </div>
            <div className="px-4 py-6">
              <OrderAnalysis
                ongoingOrders={ongoingOrders}
                completedOrders={completedOrders}
                pendingOrders={pendingOrders}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
