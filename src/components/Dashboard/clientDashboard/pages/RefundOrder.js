import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Breadcrumbs} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getAdminOrders } from '../../../../redux/actions/OrderAction';
import { useDispatch } from "react-redux";
import OrderTable from "../../assets/Tables/OrderTable";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RefundOrders() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getAdminOrders(stopLoading));
        // dispatch(getCategories());
    }, [dispatch])

    const markRefunded = async(id) => {
        try {
            setLoading(true);
              const config = {
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': localStorage.getItem("auth_token")
                  },
              }
              const response = await axios.get(`${process.env.REACT_APP_URL }/orders/refund/${id}`, config);
              setLoading(false);
              toast.success(
                  response.data.message,
                  {
                      duration: 4000,
                      position: "top-center",
                      style: { background: 'green', color: 'white' },
                  }
              );
              return response
          } catch (error) {
              setLoading(false);
          }
    }
  

    return (
        <div className="">
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
                    <div>
                        <p className="text-2xl fw-600">Manage Cancelled Orders</p>
                        <p className="fs-400 text-gray-600 mt-2">Assign, monitor and review all orders by clients.</p>
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
                </div>  
                {/* product contents */}
                <div className="lg:p-5 px-2 py-4">
                    <div className="bg-white lg:p-5 lg:mt-6 mt-6 rounded-lg">
                        <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
                            <TabList className="">
                                <Tab>Refund Request</Tab>
                                <Tab>Refunded</Tab>
                            </TabList>
                             <TabPanel>
                                <OrderTable  refund={"request refund"} markRefund={markRefunded} loader={loading} />
                            </TabPanel>
                            <TabPanel>
                                <OrderTable  refund={"refunded"} loader={loading} />
                            </TabPanel>
                            
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        )
}