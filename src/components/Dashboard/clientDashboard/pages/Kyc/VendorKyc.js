import React, { useState, useEffect } from "react";

// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useSelector } from "react-redux";
import { FinanceData } from "./FinanceData";
import { GeneralInfo } from "./generalInfo";
import { JobExecution } from "./jobExecution";
import { OrganisationInfo } from "./organisationInfo";
import { SupplyCat } from "./supplyCat";
import { TaxDetails } from "./taxDetails";
import { UploadDoc } from "./uploadDoc";

import Axios from "../../../../../config/config";


export const VendorKyc = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? value : value);
  };

  const [kycScore, setKycScore] = useState({
    generalInfo: 0,
    orgInfo: 0,
    taxDetails: 0,
    workExperience: 0,
    SupplyCat: 0,
    financialData: 0,
    uploadDocument: 0,
  });

  const [kycTotal, setKycTotal] = useState({
    generalInfo: 7,
    orgInfo: 9,
    taxDetails: 3,
    workExperience: 6,
    SupplyCat: 1,
    financialData: 6,
    uploadDocument: 16,
  });

  // eslint-disable-next-line
  const percentage = () => {
    let score = 0;
    let total = 0;
    Object.keys(kycScore).forEach((kycEl) => {
      score += kycScore[kycEl];
      total += kycTotal[kycEl];
    });
    return Math.round((score / total) * 100);
  };

  const loadKycScoreAndTotal = async () => {

    const authToken = localStorage.getItem("auth_token");

    const response = await Axios.get('/user/me', {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    })
    if (response.user.kycScore !== "" && response.user.kycScore !== null) {
      const _kycScore = JSON.parse(response.user.kycScore);

      
      if (user.userType === "professional") {
        setKycScore({
          ...kycScore,
          ..._kycScore,
          SupplyCat: 1,
        });
      } else {
        setKycScore({
          ...kycScore,
          ..._kycScore,
        });
      }
    }
    if (response.user.kycTotal !== "" && response.user.kycTotal !== null) {
      const _kycTotal = JSON.parse(response.user.kycTotal);
      setKycTotal({
        ...kycTotal,
        ..._kycTotal,
      });
    }
  };// eslint-disable-next-line

  useEffect(() => {
    window.scrollTo({
      top: 40,
      left: 0,
      behavior: "smooth",
    });
    loadKycScoreAndTotal();// eslint-disable-next-line 
  }, []);
  const activeStyle = {
    borderBottom: "4px solid #EC8B20",
    color: "#3F79AD",
  };

  return (
    <div className="w-full">
     
      {/* <div
        className="fixed text-center"
        style={{
          width: 100,
          height: 100,
          zIndex: 1,
          right: 9,
          padding: 10,
          top: "7em",
        }}
      >
        <CircularProgressbar value={percentage()} text={`${percentage()}%`} />
        Your Score
      </div> */}
      <div className="w-full">
        <div className="flex lg:w-full w-full overflow-x-auto fs-500 text-center fw-500">
          <div
            style={open === 1 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(1)}
          >
            General Information
          </div>
          <div
            style={open === 2 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(2)}
          >
            Organisation Information
          </div>
          <div
            style={open === 3 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(3)}
          >
            Tax Details and Permits
          </div>
          <div
            style={open === 4 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(4)}
          >
            Work/Job Execution Experience
          </div>
          {user?.userType === "vendor" ||
          user?.userType === "product_partner" ? (
            <div
              style={open === 5 ? activeStyle : undefined}
              className="px-3 w-36 lg:w-auto cursor-pointer"
              onClick={() => handleOpen(5)}
            >
              Categories of Supply
            </div>
          ) : null}

          <div
            style={open === 6 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(6)}
          >
            Financial Data
          </div>
          <div
            style={open === 7 ? activeStyle : undefined}
            className="px-3 w-36 lg:w-auto cursor-pointer"
            onClick={() => handleOpen(7)}
          >
            Upload Documents
          </div>
        </div>
      </div>
      <div className="mt-6 lg:mt-10">
        {open === 1 ? (
          <GeneralInfo
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 2 ? (
          <OrganisationInfo
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 3 ? (
          <TaxDetails
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 4 ? (
          <JobExecution
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 5 ? (
          <SupplyCat
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 6 ? (
          <FinanceData
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
        {open === 7 ? (
          <UploadDoc
            handleOpen={handleOpen}
            tab={open}
            setKycScore={setKycScore}
            kycScore={kycScore}
            setKycTotal={setKycTotal}
            kycTotal={kycTotal}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
