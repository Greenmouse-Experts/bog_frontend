import React from "react";


const EmptyData = ({ message }) => {
  return (
    <div className="w-full  mt-5 grid place-content-center">
      <div>
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1682595472/BOG/empty_e8h1y5.jpg"
          alt="empty"
          className="w-28 mx-auto"
        />
        <p className="text-center fw-500">{message || "No Data Available"}</p>
      </div>
    </div>
  );
};

export default EmptyData;