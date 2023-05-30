import React, { useState } from "react";
import { SuccessAlert } from "../../../services/endpoint";
import Axios from "../../../config/config";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Spinner from "../../layouts/Spinner";
import { useSelector } from "react-redux";

export const AddProductReview = ({closeModal, productId, fetchReview}) => {

    const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [star, setStar] = useState(0);
  const user = useSelector((state) => state.auth.user)

  const ratingChanged = (newRating) => {
    setStar(newRating);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (message === "" || star === 0) {
        setLoading(false);
        toast.error("Please fill all field", {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
        return;
      }
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const payload = {
        star,
        review: message,
        productId: productId,
        userId: user.id,
      };
      const res = await Axios.post(
        "/review/product/create-product-review",
        payload,
        config
      );
      setLoading(false);
      fetchReview()
      closeModal()
      if (res.success === true) {
        SuccessAlert("Review Done succssfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };

  return (
    <div
      className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40"
      onClick={closeModal}
    >
      <div
        className="bg-white lg:w-5/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="fw-600 text-lg mb-6">Your Review</p>
        <form>
          <div>
            <textarea
              className="h-24 p-2 w-full rounded mt-2 border border-gray-400 "
              onChange={(e) => setMessage(e.target.value)}
              name={message}
            />
          </div>
          <div className="mt-6">
            <p>select a rating</p>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={45}
              color2={"#ffd700"}
            />
          </div>
          <div className="mt-6">
              <>
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="btn-primary w-full"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </>
          </div>
        </form>
        <FaTimes className="absolute top-5 right-5" onClick={closeModal} />
      </div>
    </div>
  );
};
