/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Breadcrumbs} from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserOrders } from "../../../../redux/actions/OrderAction";
import { Loader } from "../../../layouts/Spinner";
import UserOrderTable from "../../assets/Tables/userOrder";
import CancelOrderModal from "./Order/Modals/cancelModal";
import RefundOrderModal from "./Order/Modals/refundModal";
import EmptyData from "../../assets/UI/EmptyData";
import { FaShoppingBasket } from "react-icons/fa";

export default function Orders() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.user.profile.userType)
  let orders = useSelector((state) => state.orders.userOrders);
  const [loading, setLoading] = useState(false);
  const [cancelModal, setCancelModal] = useState()
  const [refundModal, setRefundModal] = useState()
  const [orderId, setOrderId] = useState('')
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserOrders(userType, stopLoading));
  }, [])

  const CloseModal = () => {
    setCancelModal(false)
    setRefundModal(false)
  }

  const RefundOrder = (val) => {
    setRefundModal(true)
    setOrderId(val)
  }

  const cancelOrder = (id) => {
    setCancelModal(true)
    setOrderId(id)
  }
  

  return (
    <div>
      <div className="fs-500 min-h-screen">
        <div className="w-full flex items-center justify-between py-6 bg-white px-4 rounded-lg">
          <div>
            <p className="text-2xl fw-600">Orders</p>
            <p className="fs-400 text-gray-500 pt-4">
              Review and manage all your impending orders.
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
                <span>Orders</span>
              </Link>
            </Breadcrumbs>
          </div>
          <div>
            <Link to={'/shop'} className="flex gap-x-3 bg-secondary text-white fw-600 px-5 py-2 rounded-lg hover:scale-105 duration-100"><FaShoppingBasket className="text-2xl"/>Shop Now</Link>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-white lg:p-5 mt-6 rounded-lg">
            {loading ?  <Loader size />
              :
            <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
              <TabList className="">
                <Tab>All Orders</Tab>
                <Tab>Pending</Tab>
                <Tab>Delivered</Tab>
                <Tab>Cancelled</Tab>
              </TabList>

              {/* All Orders */}
              <TabPanel>
                  <div className="overflow-x-auto">
                    {
                      orders.length > 0 ? <UserOrderTable cancelOrder={cancelOrder} /> : <EmptyData message='No Order Yet'/>
                    }
                  </div>
              </TabPanel>

              {/* Pending Orders */}
              <TabPanel>
                  {
                      orders.length > 0 ? <UserOrderTable cancelOrder={cancelOrder} status="pending"/> : <EmptyData message='No Order Yet'/>
                    }
              </TabPanel>

              {/* Delivered Orders */}
              <TabPanel>
                {
                      orders.length > 0 ? <UserOrderTable status="completed"/> : <EmptyData message='No Order Yet'/>
                    }
              </TabPanel>

              {/* Cancelled Orders */}
              <TabPanel>
                {
                      orders.length > 0 ? <UserOrderTable status="cancelled" refundOrder={RefundOrder} refundTab/> : <EmptyData message='No Order Yet'/>
                    }
              </TabPanel>
            </Tabs>
            }
          </div>
        </div>
      </div>
      {
        cancelModal && (
          <CancelOrderModal CloseModal={CloseModal} id={orderId} getUserOrders={getUserOrders}/>
        ) 
      }
      {
        refundModal && (
          <RefundOrderModal CloseModal={CloseModal} id={orderId} getUserOrders={getUserOrders}/>
        ) 
      }
    </div>
  );
}
