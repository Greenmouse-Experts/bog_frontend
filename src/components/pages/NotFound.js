import React from "react";
import Header from "./home-comp/Header";
import Footer from "./home-comp/Footer";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div>
        <div className="pb-8 lg:section pt-4">
          <div className="box">
            <div className="grid lg:grid-cols-2 items-center">
              <div>
                <img
                  src="https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif"
                  alt="404"
                  className="lg:w-full mx-auto w-11/12"
                />
              </div>
              <div>
                <p className="text-lg lg:text-3xl fw-600 my-6 text-center">Page Not Found</p>
                <div className="flex justify-center gap-x-6">
                    <button className="btn-primary"  onClick={() => navigate(-1)}>Previous Page</button>
                    <button className="btn border border-blue-900 text-primary fw-600"  onClick={() => navigate("/")}>Home Page</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
