import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Breadcrumbs} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getAdminOrders } from '../../../../redux/actions/OrderAction';
import { useDispatch } from "react-redux";
import OrderTable from "../../assets/Tables/OrderTable";

export default function OrdersAdmin() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getAdminOrders(stopLoading));
        // dispatch(getCategories());
    }, [dispatch])
  

    return (
        <div className="">
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
                    <div>
                        <p className="text-2xl fw-600">Manage Orders</p>
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
                                <Tab>All Orders</Tab>
                                <Tab>Completed</Tab>
                                <Tab>Ongoing</Tab>
                                <Tab>Cancelled</Tab>
                            </TabList>
                            <TabPanel>
                                 <OrderTable loader={loading} />
                            </TabPanel>
                             <TabPanel>
                                <OrderTable status={"completed"} loader={loading} />
                            </TabPanel>
                            <TabPanel>
                                <OrderTable status={"approved"} loader={loading} />
                            </TabPanel>
                            <TabPanel>
                                <OrderTable status={"cancelled"} loader={loading} />
                            </TabPanel>
                            
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        )
}