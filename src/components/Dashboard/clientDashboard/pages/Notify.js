import { Breadcrumbs } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { fetchAllAdminNotifications } from "../../../../redux/actions/notifications";
import { Loader } from "../../../layouts/Spinner";
// import Spinner from "../../../layouts/Spinner";
import NotificationItem from "./Notification/NotificationItem";

export default function Notify() {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.adminNotifications);
    const [loading, setLoading] = useState(false);
    const [seeMores, setSeeMores] = useState(10);
    const stopLoading = () => { setLoading(false);}

    useEffect(() => {
        setLoading(true)
        dispatch(fetchAllAdminNotifications(stopLoading))
    }, [dispatch]);

    const setReload = () => {
        dispatch(fetchAllAdminNotifications(stopLoading))
    }

    const seeMore = () => {
        setSeeMores(seeMores + 20)
    }

    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4">
                    <p className="text-2xl fw-600">Notifications</p>
                    <p className="fs-400 text-gray-600 mt-2">See latest system updates and notifications</p>
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
                            <span>Notifications</span>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* notifications */}
                <div className="lg:p-5 px-2 py-4">
                    <div className="lg:w-8/12 xl:w-7/12 mx-auto lg:py-8 py-4 lg:px-6 bg-white rounded-md">
                        {loading ? <Loader size />
                            :
                            <Tabs>
                                <TabList>
                                    <Tab>Recent</Tab>
                                    <Tab>All Notifications</Tab>
                                    <Tab>Unread</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="mt-10 px-3 pb-5">
                                        {
                                            notifications.length > 0 &&
                                            notifications.filter(where => !where.isRead).slice(0,20).map(item => (
                                                <NotificationItem key={item.id} item={item} isAdmin seeMore={seeMore} reload={setReload}/>
                                            ))
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-10 px-3 lg:px--0 lg:pb-0 pb-5">
                                        {
                                            notifications &&
                                            notifications.slice(0,seeMores).map(item => (
                                               <div>
                                                 <NotificationItem key={item.id} item={item} reload={setReload} isAdmin/>
                                               </div>
                                            ))
                                        }
                                        <p className="fw-500 text-center my-5 text-secondary underline" onClick={seeMore}>See More</p>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-10 pb-8 px-3">
                                        {
                                            notifications &&
                                            notifications.filter(where => !where.isRead).slice(0,20).map(item => (
                                                <NotificationItem key={item.id} item={item} isAdmin reload={setReload}/>
                                            ))
                                        }
                                    </div>
                                </TabPanel>
                            </Tabs>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}