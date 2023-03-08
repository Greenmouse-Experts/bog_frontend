import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumbs } from "@material-tailwind/react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Email() {

    const email = useRef(null);
    const navigate = useNavigate()

    return (
        <div>
            <div className="min-h-screen fs-500 relative">
                {/* header */}
                <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
                    <div>
                        <p className="text-2xl fw-600">Emails</p>
                        <p className="fs-400 text-gray-600 mt-2">Vew and manage all emails</p>
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
                                <span>Email</span>
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <div className="text-end">
                        <button className="btn py-1 lg:py-2 mt-2 lg:mt-0 border-pri text-primary" onClick={() => navigate("/dashboard/createmail")} >Create Email</button>
                    </div>
                </div>
                {/* content */}
                <div className="lg:p-5 px-3 py-5 mt-6">
                    <div className="bg-white lg:p-5  rounded-lg">
                        <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
                            <TabList className="">
                                <Tab>All Emails</Tab>
                                <Tab>Sent</Tab>
                                <Tab>Draft</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="mt-10">
                                    <div className="flex items-center">
                                        <div class="flex text-gray-600">
                                            <input
                                                className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-5 rounded-l-lg text-sm focus:outline-none"
                                                type="search"
                                                name="search order by name"
                                                placeholder="Search"
                                            />
                                            <button
                                                type="submit"
                                                className=" bg-primary right-0 top-0 py-2 px-4 rounded-r-lg"
                                            >
                                                <FontAwesomeIcon icon={faSearch} className="text-white" />
                                            </button>
                                        </div>
                                        <DownloadTableExcel
                                            filename="All product partners"
                                            sheet="users"
                                            currentTableRef={email.current}
                                        >
                                            <button className="bg-light mx-4 p-2 text-2xl text-primary"><HiOutlineDocumentDownload className="text-primary" /> </button>
                                        </DownloadTableExcel>
                                    </div>
                                </div>
                                <div className="overflow-x-auto mt-6">
                                    <table className="items-center w-full bg-transparent border-collapse" ref={email}>
                                        <tbody>
                                            <tr className="thead-light bg-light">
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    S/N
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Email Tittle
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Recipient(s)
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Date
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Status
                                                </th>
                                                <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                                                    Action
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    1
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    BOG Weekly
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Users
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    20-11-12
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Sent
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100" onClick={() => navigate("/dashboard")}><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    2
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Onboarding Update
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Land Surveyors
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    21-11-22
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Sent
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    3
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    BOG Black Friday
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Service Partners
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    21-11-2022
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Draft
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    4
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Product approval in 3 steps
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Product Partners
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    24-11-22
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Draft
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-10">
                                    <div className="flex items-center">
                                        <div class="flex text-gray-600">
                                            <input
                                                className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-5 rounded-l-lg text-sm focus:outline-none"
                                                type="search"
                                                name="search order by name"
                                                placeholder="Search"
                                            />
                                            <button
                                                type="submit"
                                                className=" bg-primary right-0 top-0 py-2 px-4 rounded-r-lg"
                                            >
                                                <FontAwesomeIcon icon={faSearch} className="text-white" />
                                            </button>
                                        </div>
                                        <DownloadTableExcel
                                            filename="All product partners"
                                            sheet="users"
                                            currentTableRef={email.current}
                                        >
                                            <button className="bg-light mx-4 p-2 text-2xl text-primary"><HiOutlineDocumentDownload className="text-primary" /> </button>
                                        </DownloadTableExcel>
                                    </div>
                                </div>
                                <div className="overflow-x-auto mt-6">
                                    <table className="items-center w-full bg-transparent border-collapse" ref={email}>
                                        <tbody>
                                            <tr className="thead-light bg-light">
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    S/N
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Email Title
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Recipient(s)
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Date
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Status
                                                </th>
                                                <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                                                    Action
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    1
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    BOG Weekly
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Users
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    20-11-12
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Sent
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100" onClick={() => navigate("/dashboard/")}><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    2
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Onboarding Update
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Land Surveyors
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    21-11-22
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Sent
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-10">
                                    <div className="flex items-center">
                                        <div class="flex text-gray-600">
                                            <input
                                                className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-5 rounded-l-lg text-sm focus:outline-none"
                                                type="search"
                                                name="search order by name"
                                                placeholder="Search"
                                            />
                                            <button
                                                type="submit"
                                                className=" bg-primary right-0 top-0 py-2 px-4 rounded-r-lg"
                                            >
                                                <FontAwesomeIcon icon={faSearch} className="text-white" />
                                            </button>
                                        </div>
                                        <DownloadTableExcel
                                            filename="All product partners"
                                            sheet="users"
                                            currentTableRef={email.current}
                                        >
                                            <button className="bg-light mx-4 p-2 text-2xl text-primary"><HiOutlineDocumentDownload className="text-primary" /> </button>
                                        </DownloadTableExcel>
                                    </div>
                                </div>
                                <div className="overflow-x-auto mt-6">
                                    <table className="items-center w-full bg-transparent border-collapse" ref={email}>
                                        <tbody>
                                            <tr className="thead-light bg-light">
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    S/N
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Email Tittle
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Recipient(s)
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Date
                                                </th>
                                                <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                                                    Status
                                                </th>
                                                <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                                                    Action
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    1
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    BOG Black Friday
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Service Partners
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    21-11-2022
                                                </td>
                                                <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Draft
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    2
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Product approval in 3 steps
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    All Product Partners
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    24-11-22
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    Draft
                                                </td>
                                                <td className="border-b border-gray-200 align-middle text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <div className="flex text-xl">
                                                        <p className="bg-orange-100"><BsThreeDotsVertical /></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}