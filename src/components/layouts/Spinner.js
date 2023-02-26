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

export const Loader = ({size}) => {
  return (
    <div className="loading-screen h-full flex justify-center" style={{minHeight : size ? '30vh' : '75vh'}}>
      <div className="wrapper flex relative" style={{top : size ? '15vh' : '35vh'}}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}
