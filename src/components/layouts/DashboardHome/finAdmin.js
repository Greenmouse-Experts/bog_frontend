import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import useFetchHook from '../../../hooks/useFetchHook';
import { Loader } from '../Spinner';

export const FinanceAdmin = () => {

    const { loading, data: transactions } = useFetchHook("/transactions");
    
    
    const user = useSelector((state) => state.auth.user);
   
    // if(transactions){
    //     const ProjectTran = transactions.filter(where => where.type === "Projects")
    //     const ProductTran = transactions.filter(where => where.type === "Products")
    //     const SubTran = transactions.filter(where => where.type === "Subscription") 
    // }
    if (loading){
        return <center><Loader /></center>
      } 
    console.log(transactions); 
       

  return (
    <div className='min-h-screen'>
        <div className="w-full py-6 lg:px-8 bg-white px-4">
            <div className="text-2xl fw-600 flex items-center">
            <p className="">Welcome, {user?.name}</p>
            {/* <FontAwesomeIcon icon={faThumbsUp} className="pl-3 text-secondary" /> */}
            </div>
            <p className="mt-3 fs-500">
                Provide solution to projects and users worldwide
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
        <div className='p-5'>
            <div className="mt-3">
            <div className="lg:grid-2 gap-x-16 gap-16 justify-between fs-500 fw-600">
                <div className="bg-[#e0e7ff] px-4 py-3 rounded flex justify-between items-center shades">
                <Link to="projectsadmin" className="flex justify-between items-center w-full">
                    <div>
                    {/* {transactions? transactions.length : 0} */}
                        <p className="text-xxl fw-600 pb-2 text-xl">{transactions? transactions.length : 0}</p>
                        <p className="text-gray-600">Total Transactions</p>
                    </div>
                    <div className="">
                        <img
                        src={require("../images/users.png")}
                        alt="project"
                        className="-bottom-3 relative w-20"
                        />
                    </div>
                </Link>
                </div>
                <div className="bg-orange-100 mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
                <Link to="client" className="flex justify-between items-center w-full">
                    <div>
                    {/* {ProductTran? ProductTran.length : 0} */}
                        <p className="text-xxl pb-2 fw-600"></p>
                        <p className="text-gray-600">Product Transaction</p>
                    </div>
                    <div className="">
                        <img
                        src={require("../images/client.png")}
                        alt="orders"
                        className="w-16 lg:mt-2"
                        />
                    </div>
                </Link>
                </div>
                <div className="bg-blue-100  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
                <Link to="servicepartner" className="flex justify-between items-center w-full">
                    <div>
                    {/* {ProjectTran? ProjectTran.length : 0} */}
                        <p className="fw-600 text-xxl pb-2"></p>
                        <p className="text-gray-600">Project Transaction</p>
                    </div>
                    <div className="relative">
                        <img
                        src={require("../images/sp.png")}
                        alt="cart"
                        className="w-16 lg:mt-3"
                        />
                    </div>
                </Link>
                </div>
                <div className="bg-green-100  mt-4 lg:mt-0 px-4 py-3 rounded flex justify-between items-center shades">
                <Link to="productpartner" className="flex justify-between items-center w-full">
                    <div>
                    {/* {SubTran? SubTran.length : 0} */}
                        <p className="text-xxl fw-600 pb-2"></p>
                        <p className="text-gray-600">Subscriptions</p>
                    </div>
                    <div className="">
                        <img
                        src={require("../images/pp.png")}
                        alt="ongoing"
                        className=" w-16"
                        />
                    </div>
                </Link>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
