import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  BsInfoCircle,
  BsInfoCircleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDispatchedProjects } from "../../../../redux/actions/ProjectAction";
import { getProjectCategory, getStatus } from "../../../../services/helper";
import { Loader } from "../../../layouts/Spinner";
import QouteProject from "./projects/Modal/QouteProject";
import EmptyData from "../../assets/UI/EmptyData";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export function AllProject() {
  const { dispatchedProjects: projects, isLoading } = useSelector(
    (state) => state.projects
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    if (user) {
      dispatch(getDispatchedProjects(user.profile.id));
    }
  }, [dispatch, user]);

  const project = projects.filter(
    (where) => where.project.status === "dispatched"
  );

  const navigate = useNavigate();

  const [qoute, setQoute] = useState(false);
  const [decline, setDecline] = useState(false);

  const OpenQoute = (item) => {
    Swal.fire({
      title: "Project Interest Submitted",
      text: "Thank you for picking interest on this project. To complete the process, an interest form is made available where you are expected to analyze the project, prepare the valuation and timeframe required to complete this project. Please note that this form is valid for 24 hours. ",
      imageUrl:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
      imageWidth: "95px",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Fill Now",
      cancelButtonText: "Fill Later",
    }).then((result) => {
      if (result.value) {
        setQoute(true);
      }
    });
    setSelectedProject(item);
    // setTimeout(() => {
    //   setQoute(true);
    // }, 3000);
  };

  const CloseModal = () => {
    setQoute(false);
    setDecline(false);
  };
  const gotoForm = (id) => {
    navigate(`/dashboard/projectfile?projectId=${id}`);
  };

  if (isLoading) {
    return (
      <center>
        <Loader />{" "}
      </center>
    );
  }

  console.log(projects);

  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        {/* header */}
        <div className="w-full py-8 bg-white px-4">
          <p className="text-2xl fw-600">All Projects</p>
          <p className="fs-400 text-gray-600 mt-2">
            Projects available on BOG for service partners.
          </p>
        </div>
        {/* content */}
        <div className="lg:p-5 px-3 py-5 mt-6">
          {/* all projects table*/}
          <div className="mt-2">
            <div className=" fw-600 fs-500 bg-white pt-6 rounded">
              <div className="flex px-5 justify-between">
                <div className="flex justify-between items-center w-full">
                  <p className="fw-600 fs-600 lg:text-lg mb-6 lg:mb-0">
                    Available Projects
                  </p>
                  <Popover
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    placement="bottom"
                  >
                    <PopoverHandler>
                      <Button className="px-0 mx-0 bg-white text-black shadow-none hover:shadow-none">
                        <BsInfoCircle className="text-primary text-2xl" />
                      </Button>
                    </PopoverHandler>
                    <PopoverContent>
                      Projects availbale on BOG for you to make a bid.
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="px-5  my-6">
                <div className="overflow-x-auto  relative min-h-[250px]">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead className="thead-light bg-light">
                      <tr>
                        <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                          S/N
                        </th>
                        <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                          Project ID
                        </th>
                        <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                          Project Category
                        </th>
                        <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                          Date
                        </th>
                        <th className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left">
                          Status
                        </th>
                        <th className="px-2 fw-600 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left w-56">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {project && !project.length && (
                      <div className="w-full absolute top-20">
                        <EmptyData message="No Availabe Projects Yet" />
                      </div>
                    )}
                    {project && !!project.length && (
                      <tbody>
                        {project.map((item, index) => (
                          <tr key={index}>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {index + 1}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {item.project.projectSlug}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {getProjectCategory(item.project.projectTypes)}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {dayjs(item.project.createdAt).format(
                                "YYYY-MM-DD"
                              )}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              {getStatus(item.project.status)}
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <Menu placement="left-start" className="w-16">
                                <MenuHandler>
                                  <Button className="border-none bg-transparent shadow-none hover:shadow-none text-primary px-0">
                                    <p className="lg:text-xl text-primary">
                                      <BsThreeDotsVertical />
                                    </p>
                                  </Button>
                                </MenuHandler>
                                <MenuList className="w-16 bg-gray-100 fw-600 text-black">
                                  <MenuItem
                                    onClick={() => gotoForm(item.projectId)}
                                  >
                                    View Details
                                  </MenuItem>
                                  <MenuItem onClick={() => OpenQoute(item)}>
                                    Accept Project
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {qoute && (
        <QouteProject closeModal={CloseModal} project={selectedProject} />
      )}
      {decline && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={CloseModal}
        >
          <div
            className="bg-white lg:w-5/12 rounded-md overflow-y-auto overscroll-none  w-11/12 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between px-4 py-6">
              <p className="lg:fs-700 fw-500 flex">
                <span className="block mt-1 mr-2 text-red-600">
                  <BsInfoCircleFill />
                </span>
                <span>
                  Are you sure you want to decline this project offer.
                </span>
              </p>
            </div>
            <div className="mt-4 px-4 py-4 bg-light text-end">
              <Button className="bg-secondary" onClick={CloseModal}>
                Cancel
              </Button>
              <Button className="bg-red-600 ml-4" onClick={CloseModal}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
