/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumbs, Progress } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { BiEdit } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Axios from "../../../../config/config";
import { Loader } from "../../../layouts/Spinner";
import ItemList from "./Order/ItemList";
import dayjs from "dayjs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { OrderReview } from "./Order/OrderReview";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { BsInfoCircle } from "react-icons/bs";

const orderProgress = [
  {
    status: "pending",
    allowed: ["pending", "approved", "shipped", "completed"],
    percent: 0,
  },
  {
    status: "cancelled",
    allowed: ["cancelled"],
    percent: 0,
  },
  {
    status: "approved",
    allowed: ["approved", "shipped", "completed"],
    percent: 35,
  },
  { status: "shipped", allowed: ["shipped", "completed"], percent: 75 },
  { status: "completed", allowed: ["completed"], percent: 100 },
];

export default function UserOrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progressVal, setProgressVal] = useState({});

  const getOrderDetail = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      setLoading(true);
      const url = `/orders/order-detail/${orderId}`;
      const response = await Axios.get(url, config);
      const { data } = response;
      setOrder(data);
      setLoading(false);
      setStatus(data.status);
      setProgressVal(
        orderProgress.find((progress) => progress.status === data.status)
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  if (loading || !order) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  const getSubTotal = (items) => {
    const total = items.reduce((sum, data) => {
      return sum + data.amount;
    }, 0);
    return total;
  };

  return (
    <div>
      {order && (
        <div className="min-h-screen fs-500 relative">
          <div className="w-full py-8 bg-white px-4">
            <p className="text-2xl fw-600 lg:flex items-center">
              Order ID:{" "}
              <span className="text-primary px-3">{order?.orderSlug}</span>{" "}
              <span className="text-xs text-blue-500 bg-light px-2">
                {order?.status}
              </span>
            </p>
            <p className="fs-400 text-gray-600 mt-2">View order details</p>
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
              <Link to="/dashboard/orders" className="opacity-60">
                <span>Orders</span>
              </Link>
              <Link to="" className="">
                <span>Order Details</span>
              </Link>
            </Breadcrumbs>
          </div>
          {/* order details */}
          <div className="lg:p-5 px-2 py-4">
            <div>
              <p className="fw-600 underline">Order Progress</p>

              <div className="my-6 mb-24 lg:my-10 relative w-11/12">
                <div className="">
                  <Progress value={progressVal.percent} color="amber" />
                </div>
                <div className="absolute -top-2 o-process">
                  <IoMdCheckmarkCircle
                    className={`text-2xl circle bg-white ${
                      orderProgress[0].allowed.filter(
                        (_allowed) => _allowed === status
                      ).length > 0
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                  />
                  <p className={`fw-500 w-8 lg:w-auto fs-400 text-gray-500`}>
                    Order Sent
                  </p>
                </div>
                <div className="absolute -top-2 p-process">
                  <IoMdCheckmarkCircle
                    className={`text-2xl circle bg-white ${
                      orderProgress[2].allowed.filter(
                        (_allowed) => _allowed === status
                      ).length > 0
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`fw-500 fs-400 w-8 lg:w-auto text-gray-500 relative -left-6`}
                  >
                    Confirmed
                  </p>
                </div>
                <div className="absolute -top-2 s-process">
                  <IoMdCheckmarkCircle
                    className={`text-2xl circle bg-white ${
                      orderProgress[3].allowed.filter(
                        (_allowed) => _allowed === status
                      ).length > 0
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`fw-500 fs-400 w-8 lg:w-auto text-gray-500 relative -left-6`}
                  >
                    Shipped
                  </p>
                </div>
                <div className="absolute -top-2 d-process">
                  <IoMdCheckmarkCircle
                    className={`text-2xl circle bg-white ${
                      orderProgress[4].allowed.filter(
                        (_allowed) => _allowed === status
                      ).length > 0
                        ? "text-secondary"
                        : "text-gray-400"
                    }`}
                  />
                  <p className="fw-500 fs-400 text-gray-500 relative -left-6">
                    Delivered
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:grid-83">
              <div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <p className="fw-600">Items ({order.order_items.length})</p>
                    {/* <p className="text-primary"><BiEdit /></p> */}
                  </div>
                  <div className="py-6 border-b border-gray-300 border-dashed">
                    {order.order_items.map((item) => (
                      <ItemList key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="py-6 fw-500 border-b border-gray-300 border-dashed">
                    <div className="text-gray-600 flex justify-between">
                      <p>Subtotal</p>
                      <p className="text-black">
                        &#8358;{formatNumber(getSubTotal(order.order_items))}
                      </p>
                    </div>
                    <div className="text-gray-600 mt-4 flex justify-between">
                      <p>Delivery Fee</p>
                      <p className="text-black">
                        &#8358;{formatNumber(order.deliveryFee)}
                      </p>
                    </div>
                    {
                      order.insuranceFee && <div className="text-gray-600 mt-4 flex justify-between">
                      <p>Insurance Fee</p>
                      <p className="text-black">
                        &#8358;{formatNumber(Number(order?.order_items[0]?.shippingAddress?.deliveryaddress?.insurancecharge))}
                      </p>
                    </div>
                    }
                    <div className="text-gray-600 mt-4 flex justify-between">
                      <p>Discount</p>
                      <p className="text-black">{order.discount} &#37;</p>
                    </div>
                  </div>
                  <div className="py-6 fw-500">
                    <div className="text-gray-600 mt-4 flex justify-between">
                      <p>Order Total</p>
                      <p className="text-black">
                        &#8358;
                        {formatNumber(
                          order.totalAmount
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <p className="fw-600">Transaction</p>
                  </div>
                  <div className="lg:flex grid-2 fw-500 justify-between pt-6">
                    <div>
                      <p>
                        Payment Ref:{" "}
                        {order.order_items[0].paymentInfo.reference}
                      </p>
                      {/* <p className="text-gray-600">{order.order_items[0].paymentInfo.reference}</p> */}
                    </div>
                    <div>
                      <p>{dayjs(order.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
                    <div className="mt-2 lg:mt-0">
                      <p className="text-black">
                        &#8358;
                        {formatNumber(
                          getSubTotal(order.order_items) + order.deliveryFee
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white lg:p-6 p-3 mt-8 rounded-md">
                  <div className="flex items-center justify-between pb-4">
                    <p className="fw-600">Order Review</p>
                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <PopoverHandler>
                        <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none"><BsInfoCircle className="text-xl text-primary"/></Button>
                      </PopoverHandler>
                      <PopoverContent>
                        Please leave a review when your order is completed.
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="fs-400 mt-4">
                    <OrderReview
                      productId={orderId}
                      review={order.orderReview[0]}
                      status={order?.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
