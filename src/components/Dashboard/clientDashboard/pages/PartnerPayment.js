import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Axios from "../../../../config/config";
import { toast } from "react-hot-toast";
import { PayoutTable } from "../../assets/Tables/PayoutTable";
import { Spinner2 } from "../../../layouts/Spinner";
import Swal from "sweetalert2";
import axios from "axios";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { PayoutTableProduct } from "../../assets/Tables/PayoutTableProduct";

export const PartnerPayment = () => {
  const [loading, setLoading] = useState(false);
  const [payment, setPayments] = useState([]);
  const [pays, setPays] = useState([]);

  const getPayments = async () => {
    try {
      setLoading(true);

      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const res = await Axios.get("/projects/pendingTransfers", config);
      setLoading(false);
      if (res.success === true) {
        setPayments(res.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const getPays = async () => {
    try {
      setLoading(true);

      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const res = await Axios.get("/products/pendingTransfers", config);
      setLoading(false);
      if (res.success === true) {
        setPays(res.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const approvePayment = async (id, type) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        method: "Post",
        url: `${process.env.REACT_APP_URL}/${type}/approveTransfer/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const res = await axios(config);
      Swal.fire({
        title: "Success",
        imageUrl:
          "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
        imageWidth: "75px",
        text: ` ${res?.data?.message}`,
        buttonsStyling: "false",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3F79AD",
      });
      getPayments();
      getPays();
    } catch (error) {
      const err = error.response.data.message || error.message;
      Swal.fire({
        title: "Error",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJeQFiH_3xng2zfS3B10AXUopB57J9cPDE7w&usqp=CAU",
        imageWidth: "75px",
        text: ` ${err}`,
        buttonsStyling: "false",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3F79AD",
      });
    }
  };

  useEffect(() => {
    getPayments();
    getPays()
  }, []);
  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        <div className="w-full py-8 bg-white px-4">
          <p className="text-2xl fw-600">Payment For Partners</p>
          <p className="fs-400 text-gray-600 mt-2">
            Approve and decline partner's payment initiated by the sub-admins.
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
              <span>Partner Payout</span>
            </Link>
          </Breadcrumbs>
        </div>
        <div className="lg:p-5 px-2 py-4">
          <Tabs className="px-2 lg:px-0 py-5 lg:py-0">
            <TabList className="">
              <Tab>Product Payout</Tab>
              <Tab>Project Payout</Tab>
            </TabList>
            <TabPanel>
              <div className="bg-white p-6 rounded">
                {loading && <Spinner2 />}
                {!loading && (
                  <PayoutTableProduct payout={pays} refetch={getPays} adminApprove={approvePayment} />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="bg-white p-6 rounded">
                {loading && <Spinner2 />}
                {!loading && (
                  <PayoutTable payout={payment} refetch={getPayments} adminApprove={approvePayment}/>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
