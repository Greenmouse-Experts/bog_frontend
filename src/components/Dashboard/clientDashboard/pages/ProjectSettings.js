import { Breadcrumbs } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import GIDisplay from "./projects/Settings/GIDisplay";

const ProjectSettings = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
          <div className="flex-grow">
            <p className="text-2xl fw-600">Project Settings</p>
            <p className="fs-400 text-gray-600 mt-2">
              View and manage all different service parameters and pricing.
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
                <span>Project Request</span>
              </Link>
            </Breadcrumbs>
          </div>
        </div>
        <div className="lg:p-5 px-2 py-4">
                    <div className="bg-white lg:p-5 lg:mt-6 mt-6 rounded-lg">
                        <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
                            <TabList className="">
                                <Tab>GI Service</Tab>
                            </TabList>
                            <TabPanel>
                                <GIDisplay/>
                                {/* <ProjectsTable status={"approved"} loader={loading} /> */}
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
      </div>
    </>
  );
};

export default ProjectSettings;
