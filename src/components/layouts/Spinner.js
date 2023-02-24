import React from "react";
import { ColorRing } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <center>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </center>
  );
};

export default Spinner;

export const Spinner2 = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1676023431/BOG/spinner2-unscreen_1_yqjgi9.gif' className="w-4/12 mx-auto" alt='spinner'/>
    </div>
  )
}

export const Loader = () => {
  return (
    <div className="loading-screen h-full">
      <div className="loading-animation">
        <img
          className="text-flame logo lg:w-40"
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1669563824/BOG/logo_1_1_ubgtnr.png"
          alt="Logo"
      />
        <div className="loading-bar" />
      </div>
    </div>
  )
}