import { Breadcrumbs } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import GtiProjectTable from "../../../assets/Tables/GtiTable";
import { useDispatch } from "react-redux";
import { getProjects } from "../../../../../redux/actions/ProjectAction";

const GtiProjects = () => {
    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        dispatch(getProjects(stopLoading));
        // dispatch(getCategories());
    }, [dispatch])
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
          <div className="flex-grow">
            <p className="text-2xl fw-600">GTI Projects</p>
            <p className="fs-400 text-gray-600 mt-2">
              View and manage Geotechnical Investigation Project request from
              users.
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
                <span>GTI Request</span>
              </Link>
            </Breadcrumbs>
          </div>
        </div>
        <div className="bg-white lg:p-5 lg:mt-6 mt-6 rounded-lg">
            <GtiProjectTable loader={loading}/>
        </div>
      </div>
    </>
  );
};

export default GtiProjects;
