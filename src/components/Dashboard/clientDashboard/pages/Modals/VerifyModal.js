import { Button } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Axios from "../../../../../config/config";

export const VerifyModal = ({ setVerify, client, reload, average }) => {
  const CloseModal = () => {
    setVerify(false);
  };
  const [loading, setLoading] = useState(false);
  const [point, setPoint] = useState(average);

  const changePoint = (e) => {
    setPoint(e.target.value);
  };

  const verifyUser = async () => {
    if (Number(point) > 100) {
      return toast.error("Invalid KYC point submitted", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
    try {
      setLoading(true);
      const payload = {
        verificationStatus: true,
        userType: client.userType,
        userId: client.id,
        kycPoint: point,
      };
      const config = {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const res = await Axios.post("/kyc/admin-approval", payload, config);
      setLoading(false);
      Swal.fire({
        title: "Success",
        imageUrl:
          "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
        imageWidth: "75px",
        text: "Partner verified successfully",
        buttonsStyling: "false",
        confirmButtonText: "continue",
        confirmButtonColor: "#3F79AD",
      });
      CloseModal();
      reload();
      return res;
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
        return;
      }
      toast.error(error.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  if (loading) {
    return "";
  }

  return (
    <div
      className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40"
      onClick={CloseModal}
    >
      <div
        className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex lg:px-6 px-5">
          <form>
            <p className="fs-700">
              Verify and Rate this partner to render services to clients on this
              platform.
            </p>
            <div className="flex items-center mt-5">
              <p>Admin Rating</p>
              <div className="flex items-center border rounded ml-4 w-24">
                <input
                  type="number"
                  value={point}
                  onChange={changePoint}
                  className="w-10/12 p-1"
                />
                <p className="p-1 fw-600">%</p>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
          <Button variant="outlined" ripple={true} onClick={CloseModal}>
            Cancel
          </Button>
          <Button className="bg-primary ml-4" onClick={verifyUser}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};
