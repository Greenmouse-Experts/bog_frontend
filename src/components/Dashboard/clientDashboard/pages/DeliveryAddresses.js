/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "../../../../config/config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import Spinner, { Loader } from "../../../layouts/Spinner";
import ActionFeedBack from "./Modals/ActionFeedBack";
import { BsCheck } from "react-icons/bs";
import { fetchAddresses } from "../../../../redux/actions/addressAction";
import { AddressTable } from "../../assets/Tables/AddressTable";
import AddressDeleteModal from "./Modals/AddressDeleteModal";
import AddressInfoModal from "./Modals/AddressInfoModal";
import { Country, State } from "country-state-city";
import NaijaStates from 'naija-state-local-government';

const DeliveryAddresses = () => {
  const [deliveryAddress, setDeliveryAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeetback] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [action, setAction] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedState, setSelectedState] = useState(false);
  const [selectedLga, setSelectedLga] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const user = useSelector((state) => state.auth.user);

  function CloseDelete() {
    setDeliveryAddress(false);
  }
  const openViewModal = (actType, val) => {
    setAction(actType);
    setSelectedAddress(val);
  };

  const stopLoading = () => setLoading(false);

  useEffect(() => {
    const handlefetch = () => {
      setLoading(true);
      if (user) {
        fetchAddresses(stopLoading, setAddresses, user);
      }
      setLoading(false);
    };
    handlefetch();
  }, [user, loading]);

  // const handleProjectChange = (val) => {
  //     const value = val.value;
  //     setSelectedProject(value);
  // }
  const addToAddress = (param) => {
    const oldAddress = [...addresses];
    const newAddress = [param, ...oldAddress];
    setAddresses(newAddress);
  };

  const removeFromAddress = (id) => {
    const newAddress = addresses.filter((x) => x.id !== id);
    setAddresses(newAddress);
  };

  const updateAddressStatus = (param, id) => {
    let updatedAddresses = addresses.map((_address) => {
      let updated = _address;
      if (_address.id === id) {
        updated = { ...updated, param };
      }
      return updated;
    });
    setAddresses(updatedAddresses);
    setLoading(true);
  };

  const getLgas = (param) => {
    return NaijaStates.lgas(param).lgas
  }

  const authToken = localStorage.getItem("auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  // create delivery address
  const createDeliveryAddress = async () => {
    try {
      setLoading(true);
      const url = "/address/create";
      const payload = {
        ...formik.values,
        country: selectedCountry,
        state: selectedState,
        lga: selectedLga,
      };
      const newAddress = await Axios.post(url, payload, config);
      addToAddress(newAddress.data);

      setLoading(false);
      setDeliveryAddress(false);
      setFeetback({
        info: "Delivery Address Created!",
        status: "success",
        icon: <BsCheck />,
      });
    } catch (error) {
      setLoading(false);
      setDeliveryAddress(false);
      setFeetback({
        info: "Error Occured",
        status: "error",
        icon: <FaTimes />,
      });
      toast.error(error.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      address: "",
      delivery_time: "",
      state: "",
      country: "",
      charge: "",
      zipcode: "",
      insurancecharge: "",
    },
    onSubmit: createDeliveryAddress,
  });
  const {
    title,
    address,
    delivery_time,
    charge,
    zipcode,
    insurancecharge,
  } = formik.values;

  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        <div className="w-full py-8 bg-white flex justify-between items-center px-4">
          <div>
            <p className="text-2xl fw-600">Delivery Addresses</p>
            <p className="fs-400 text-gray-600 mt-2">
              Create delivery addresses and add charges
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
                <span>Delivery Addresses</span>
              </Link>
            </Breadcrumbs>
          </div>
          <div>
            <button
              className="text-primary px-3 py-1 rounded border-pri"
              onClick={() => {
                setDeliveryAddress(true);
              }}
            >
              Create Address
            </button>
          </div>
        </div>
        <div className="lg:p-5 px-2">
          <div className="bg-white lg:p-5  mt-6 rounded-lg">
            {loading ? (
              <Loader size />
            ) : (
              <>
                <AddressTable
                  addresses={addresses}
                  openViewModal={openViewModal}
                  updateAddressStatus={updateAddressStatus}
                />
              </>
            )}
          </div>
        </div>
        {deliveryAddress && (
          <div
            className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
            onClick={CloseDelete}
          >
            <div
              className="bg-white px-4 lg:w-5/12 rounded-md h-700 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between">
                  <p className="lg:text-lg fw-600">Create Address</p>
                  <FaTimes onClick={CloseDelete} />
                </div>

                <div className="mt-5">
                  <label className="block">Title</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter Title"
                      value={title}
                      onChange={formik.handleChange}
                      className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block">Country</label>
                  <select
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full mt-1 py-2 px-2 border-gray-400 rounded border"
                  >
                    <option>Select an option</option>
                    <option value="NG">Nigeria</option>
                    {Country.getAllCountries().map((item, index) => (
                      <option value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="block">State</label>
                  <select
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full mt-1 py-2 px-2 border-gray-400 rounded border"
                  >
                    <option>Select an option</option>
                    {selectedCountry &&
                      State.getStatesOfCountry(selectedCountry).map(
                        (item, index) => (
                          <option value={item.name} key={index}>{item.name}</option>
                        )
                      )}
                  </select>
                </div>
                <div className="mt-5">
                  <label className="block">Local Government</label>
                  <select
                    onChange={(e) => setSelectedLga(e.target.value)}
                    className="w-full mt-1 py-2 px-2 border-gray-400 rounded border"
                  >
                    <option>Select an option</option>
                    {selectedState &&
                      getLgas(selectedState).map(
                        (item, index) => (
                          <option value={item} key={index}>{item}</option>
                        )
                      )}
                  </select>
                </div>
                <div className="mt-5">
                  <label className="block">Delivery Time</label>
                  <input
                    type="text"
                    name="delivery_time"
                    id="delivery_time"
                    value={delivery_time}
                    placeholder="Enter Delivery time"
                    onChange={formik.handleChange}
                    className="w-full border border-gray-400 rounded mt-2 p-2"
                    required
                  />
                  e.g: 2 working days
                </div>

                <div className="mt-5">
                  <label className="block">Zipcode</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="Enter Zipcode"
                      value={zipcode}
                      onChange={formik.handleChange}
                      className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block">Charge</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="charge"
                      id="charge"
                      placeholder="Enter Charge"
                      value={charge}
                      onChange={formik.handleChange}
                      className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block">Insurance Charge</label>
                  <div className="flex">
                    <input
                      type="number"
                      name="insurancecharge"
                      id="insurancecharge"
                      placeholder="Enter Insurance Charge"
                      value={insurancecharge}
                      onChange={formik.handleChange}
                      required
                      className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    className="btn bg-red-500 lg:px-7 text-white"
                    onClick={CloseDelete}
                  >
                    Cancel
                  </button>{" "}
                  &nbsp;
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button className="btn-primary lg:px-7">
                      Create Address
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {feedback && (
        <ActionFeedBack
          closeFeedBack={() => setFeetback(false)}
          title={feedback.title}
          icon={feedback.icon}
          info={feedback.info}
          status={feedback.status}
        />
      )}
      {action === "view" && (
        <AddressInfoModal
          CloseModal={() => setAction("")}
          setFeetback={setFeetback}
          address={selectedAddress}
          updateAddressStatus={updateAddressStatus}
        />
      )}
      {action === "decline" && (
        <AddressDeleteModal
          addressId={selectedAddress}
          CloseDelete={() => setAction("")}
          setFeetback={setFeetback}
          removeAddress={removeFromAddress}
          updateAddressStatus={updateAddressStatus}
        />
      )}
    </div>
  );
};

export default DeliveryAddresses;
