import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceCategory, fetchServiceCategories } from "../../../../redux/actions/ProjectAction";
import CreateCategoryProject from "./projects/Modal/CreateCategory";
import ViewService from "./projects/Modal/ViewService";
import { getAllServiceCategories } from "../../../../redux/actions/ServiceCategoryAction";
import { Loader } from "../../../layouts/Spinner";
import ServiceProvider from "../../assets/Tables/ServiceProvider";
import Swal from "sweetalert2";

export default function ProjectCategory() {
    const dispatch = useDispatch();
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);

    const handleViewOpen = (data) => {
        setSelectedItem(data);
        setOpenViewModal(true)
    }
    const handleCloseView = () => {
        setOpenViewModal(false);
        setSelectedItem(null);
    }

    const [adminAdd, setAdminAdd] = useState(false);
    let categoryArr = useSelector((state) => state.projects.services);

    function CloseModal() {
        setAdminAdd(false)
        setSelectedItem(null);
    }
    function openEdit(data) {
        setSelectedItem(data);
        setAdminAdd(true)
    }

    useEffect(() => {
        setLoading(true);
        dispatch(getAllServiceCategories(stopLoading))
        dispatch(fetchServiceCategories(stopLoading)); // eslint-disable-next-line 
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const deleteService = (id) => {
        Swal.fire({
            title: "Delete Service",
            text: 'Do you want to delete this Service?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4BB543',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete Service',
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.value) {
                
                dispatch(deleteServiceCategory(id))
            }
        });
  }


    return (
        <div className="">
            <div className="min-h-screen fs-500 relative">
                <div className="w-full py-8 bg-white px-4 lg:flex justify-between items-center">
                    <div>
                        <p className="text-2xl fw-600">Manage Service Categories</p>
                        <p className="fs-400 text-gray-600 mt-2">Update, add and edit service categories for service providers</p>
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
                                <span>Category</span>
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <div className="mt-4 lg:mt-0">
                        <button className="px-4 lg:py-2 py-1 rounded border-pri text-primary" onClick={() => setAdminAdd(!adminAdd)}>Add New Category</button>
                    </div>
                </div>
                {/* product contents */}
                <div className="lg:p-5 px-2 py-4">
                    <div className="bg-white lg:p-5 lg:mt-6 mt-6 rounded-lg">
                        {loading ? <Loader size /> :
                            <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
                                <TabList className="">
                                    <Tab>Service Category</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="mt-5">
                                        {categoryArr.length > 0 ? 
                                            <ServiceProvider item={categoryArr} handleViewOpen={handleViewOpen} openEdit={openEdit} deleteService={deleteService}/>
                                            :
                                            <p className="py-6 text-center">No categories yet</p>
                                        }
                                    </div>
                                </TabPanel>
                            </Tabs>
                        }
                    </div>
                </div>
            </div>
            {adminAdd && (
                <CreateCategoryProject CloseModal={CloseModal} item={selectedItem} />
            )}
            {openViewModal && (
                <ViewService item={selectedItem} CloseModal={handleCloseView} />
            )}

        </div>
    )
}