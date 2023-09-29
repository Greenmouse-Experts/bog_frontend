import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
// import { useFormik } from "formik";
import { BsCheck } from "react-icons/bs";
import Axios from "../../../../../config/config";
import { FaTimes } from "react-icons/fa";
import { Country, State } from "country-state-city";

const AddressInfoModal = ({
  CloseModal,
  setFeetback,
  address,
  updateAddressStatus,
}) => {
  const [, setLoading] = useState(false);

  const updateAddress = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const url = `/address/${address.id}`;

      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const payload = {
        ...addressInfo,
        country: selectedCountry,
        state: selectedState
      }

      await Axios.put(url, payload, config);
      setLoading(false);
      CloseModal();
      updateAddressStatus(payload, address.id);
      setFeetback({
        info: "Address updated!",
        status: "success",
        icon: <BsCheck />,
      });
    } catch (error) {
      setLoading(false);
      CloseModal();
      setFeetback({
        info: "Error Occured",
        status: "error",
        icon: <FaTimes />,
      });
    }
  };


  const [addressInfo, setAddressInfo] = useState(address)
  const [selectedCountry, setSelectedCountry] = useState(address.country);
  const [selectedState, setSelectedState] = useState(address.state);

  return (
    <div
      className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
      onClick={CloseModal}
    >
      <div
        className="bg-white px-4 lg:w-5/12 mt-5 max-h-70 rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={updateAddress}>
          <h3>Address Details</h3>
          <div className="mt-5">
            <label className="block">Title</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.title}
              onChange={e => setAddressInfo({...addressInfo, title: e.target.value})}
            />
          </div>

          <div className="mt-5">
            <label className="block">Address</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.address}
              onChange={e => setAddressInfo({...addressInfo, address: e.target.value})}
            />
          </div>
          <div className="mt-5">
            <label className="block">Zipcode</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.zipcode}
              onChange={e => setAddressInfo({...addressInfo, zipcode: e.target.value})}
            />
          </div>
          <div className="mt-5">
          <label className="block">Country</label>
                  <select
                  value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full mt-1 py-2 px-2 border-gray-400 rounded border"
                  >
                    <option>Select an option</option>
                    <option value="NG">Nigeria</option>
                    {Country.getAllCountries().map((item, index) => (
                      <option value={item.isoCode} key={index}>{item.name}</option>
                    ))}
                  </select>
                  <div className="mt-3">
                  <label className="block">State</label>
                  <select
                   value={selectedState}
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
            {/* <label className="block">Country</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.country}
              onChange={e => setAddressInfo({...addressInfo, country: e.target.value})}
            /> */}
          </div>
          <div className="mt-5">
            <label className="block">Charge</label>
            <input
              type="number"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.charge}
              onChange={e => setAddressInfo({...addressInfo, charge: e.target.value})}
            />
          </div>
          <div className="mt-5">
            <label className="block">Delivery Time</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              value={addressInfo.delivery_time}
              onChange={e => setAddressInfo({...addressInfo, delivery_time: e.target.value})}
            />
            e.g: 2 working days
          </div>

          <div className="mt-5">
          <label className="block">Insurance Charge</label>
                    <input
                      type="number"
                      name="insurancecharge"
                      id="insurancecharge"
                      placeholder="Enter Insurance Charge"
                      value={addressInfo.insurancecharge}
                      onChange={e => setAddressInfo({...addressInfo, insurancecharge: e.target.value})}
                      required
                      className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                    />
                  </div>
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              className="mt-3"
              color="red"
              onClick={CloseModal}
            >
              Close
            </Button>
            &nbsp;
            <Button type="submit" className="mt-3 bg-primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressInfoModal;
