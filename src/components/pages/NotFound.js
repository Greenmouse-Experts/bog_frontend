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
        <div className=" bg-opps section ">
          <div className="box">
            <div className="grid lg:grid-cols-2 items-center">
              <div>
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1681898029/BOG/Untitled_yeipmi.gif"
                  alt="404"
                  className="lg:w-full mx-auto w-11/12"
                />
              </div>
              <div>
                <p className="lg:text-6xl text-3xl text-primary text-center fw-800">Opps! , Something went wrong</p>
                <p className="text-lg lg:text-xl fw-600 my-6 lg:my-8 text-center">We couldn't find the page you were looking for, navigate with the button below</p>
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
