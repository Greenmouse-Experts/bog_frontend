import React, { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../../redux/actions/authAction";
import { updateAccount, SuccessAlert } from "../../../../services/endpoint";
import Spinner from "../../../layouts/Spinner";
import { UserAvatar } from "../../assets/Avatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// const BASE_URL = process.env.REACT_APP_IMAGE_URL;

const PersonalData = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [phoneNo, setPhoneNo] = useState(user?.phone ? user?.phone : "");
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const { fname, lname, phone, address, city, state } = userData;

  useEffect(() => {
    if (user) {
      setUserData({
        fname: user?.fname ? user?.fname : "",
        lname: user?.lname ? user?.lname : "",
        phone: user?.phone ? user?.phone : "",
        address: user?.address ? user?.address : "",
        city: user?.city ? user?.city : "",
        state: user?.state ? user?.state : "",
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhoneChange = (formattedValue) => {
    setUserData({
      ...userData,
      phone: formattedValue,
    });
    setPhoneNo(`+${formattedValue}`);
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("fname", fname);
      fd.append("lname", lname);
      fd.append("phone", phoneNo);
      fd.append("address", address);
      fd.append("city", city);
      fd.append("state", state);
      if (photo && photo !== "") {
        fd.append("photo", photo);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const result = await updateAccount(fd, config);
      if (result.success === true) {
        dispatch(getMe());
        setShow(true);
        SuccessAlert("Account data updated successfully!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fs-400 lg:fs-600">
        <div className="mt-6 lg:mt-0 py-6 px-2 lg:px-8 rounded-lg">
          <form onSubmit={submitHandler}>
            <div className="flex items-center lg:my-6">
              <div>
                {user?.photo ? (
                  <Avatar src={user.photo} className="w-20 h-20" />
                ) : (
                  <UserAvatar />
                )}
              </div>
              <div className="lg:fs-400 text-xs pl-2 lg:pl-6 w-6/12">
                <p className="mb-2">Update Profile Picture</p>
                <input
                  type="file"
                  accept="image"
                  name="photo"
                  onChange={handleFileChange}
                  class="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100
                            "
                />
              </div>
              <div>
                {user.userType === "professional" && user.profile ? (
                  <label className="block mb-1 border-black">
                    <small>
                      <b>Service Title:</b>
                    </small>
                    <br />
                    {user.profile.service_category
                      ? user.profile.service_category.title
                      : ""}
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="lg:grid-2 justify-between">
              <div className="pt-5">
                <label className="block mb-1 fw-500">First Name</label>
                <input
                  type="text"
                  className="w-10/12 lg:w-full placeholder-black py-2 px-3 rounded-lg bg-light border border-gray-600"
                  name="fname"
                  id="fname"
                  value={fname}
                  onChange={handleUserDetailsChange}
                />
              </div>
              <div className=" pt-5">
                <label className="block mb-1 fw-500">Last Name</label>
                <input
                  type="text"
                  className="w-10/12 lg:w-full placeholder-black py-2 px-3 rounded-lg bg-light border border-gray-600"
                  name="lname"
                  id="lname"
                  value={lname}
                  onChange={handleUserDetailsChange}
                />
              </div>
            </div>
            <div className="lg:grid-2 justify-between lg:mt-4">
              <div className="mt-3 ">
                <label className="block mb-1 fw-500">Email</label>
                <input
                  type="text"
                  className="w-10/12 lg:w-full py-2 placeholder-black px-3 rounded-lg bg-light border border-gray-600"
                  name="email"
                  value={user?.email ? user?.email : ""}
                  readOnly
                />
              </div>
              <div className="w-full mt-3">
                <label className="block">Phone Number</label>
                <PhoneInput
                  country={"ng"}
                  name="phone"
                  value={phone || ""}
                  onChange={(phone) => handlePhoneChange(phone)}
                  className="mt-1 w-full rounded bg-white border border-gray-700"
                  inputStyle={{
                    width: "100%",
                    border: "none",
                    paddingTop: "19px",
                    paddingBottom: "19px",
                  }}
                  rules={{ required: true }}
                />
              </div>
            </div>
            <div className="mt-3 lg:mt-4">
              <label className="block mb-1 fw-500">Address</label>
              <input
                type="text"
                className="w-10/12 lg:w-full py-2 placeholder-black px-3 rounded-lg bg-light border border-gray-600"
                name="address"
                value={address}
                onChange={handleUserDetailsChange}
              />
            </div>
            <div className="lg:grid-2 justify-between lg:mt-4">
              <div className="mt-3 ">
                <label className="block mb-1 fw-500">City</label>
                <input
                  type="text"
                  className="w-10/12 lg:w-full py-2 placeholder-black px-3 rounded-lg bg-light border border-gray-600"
                  name="city"
                  value={city}
                  onChange={handleUserDetailsChange}
                />
              </div>
              <div className="mt-3">
                <label className="block mb-1 fw-500">State</label>
                <input
                  type="text"
                  className="w-10/12 lg:w-full py-2 px-3 placeholder-black rounded-lg bg-light border border-gray-600"
                  name="state"
                  id="state"
                  value={state}
                  onChange={handleUserDetailsChange}
                />
              </div>
            </div>
            <div className="mt-10 lg:flex justify-between items-center">
              {loading ? (
                <Spinner />
              ) : (
                <button
                  type="button"
                  onClick={submitHandler}
                  className="btn-primary lg:w-4/12"
                >
                  Update Profile
                </button>
              )}
              {show ? (
                <p className="flex items-center fw-500 mt-4 lg:mt-0 text-primary">
                  <BiCheckCircle />
                  <span className="pl-1">All Changes are saved</span>
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
