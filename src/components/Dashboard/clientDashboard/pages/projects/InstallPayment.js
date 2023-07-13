import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Axios from "../../../../../config/config";
import { formatNumber } from "../../../../../services/helper";
import { Spinner2 } from "../../../../layouts/Spinner";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export const InstallPayment = ({ item, index, id, refetch }) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  console.log(item);
  const config = {
    reference: "TR-" + Math.floor(Math.random() * 1000000000 + 1),
    email: user.email,
    amount: item.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_API_KEY,
  };

  const makePayment = async (reference) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const data = {
        amount: item.amount,
        installmentId: item.id,
        reference,
      };
      const response = await Axios.post(
        `${process.env.REACT_APP_URL}/projects/installments/${id}/payment`,
        data,
        config
      );
      setLoading(false);
      refetch()
      return response;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    try {
      setLoading(true);
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
      makePayment(reference.reference);

      Swal.fire({
        title: "Success",
        imageUrl:
          "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
        imageWidth: "75px",
        text: "Payment Successful",
        buttonsStyling: "false",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3F79AD",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Unable to Finish Payment. Please contact administrator",
      });
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  if (loading) {
    return (
      <center>
        <Spinner2 />
      </center>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2 border-b lg:border-0 pb-2 lg:flex fw-500 justify-between pt-6" key={index}>
        <div className="lg:w-3/12">
          <p>{item?.title}</p>
          <p className="text-gray-600">Via Paystack</p>
        </div>
        <div className="lg:w-3/12">
          <p>NGN{formatNumber(item?.amount)}</p>
        </div>
        <div className="lg:w-3/12 mt-6 lg:mt-0">
          {item.paid ? (
            ""
          ) : (
            <button
              className="btn-primary mb-2 px-6  py-1"
              onClick={() => {
                initializePayment(onSuccess, onClose);
              }}
            >
              Pay Now
            </button>
          )}
          <p>
            {item.paid ? (
              <p className="flex text-green-600 fw-500 items-center gap-x-2">
                Paid <BsDatabaseFillCheck className="text-lg" />
              </p>
            ) : (
              <p className="flex text-red-600 fw-500 items-center gap-x-2">
                Not Paid <MdOutlineCancel />
              </p>
            )}
          </p>
        </div>
        <div className="mt-2 lg:mt-0">
          <p className="">Due Date</p>
          <p className="text-primary fw-600">{item.dueDate && item.dueDate}</p>
        </div>
      </div>
    </div>
  );
};
