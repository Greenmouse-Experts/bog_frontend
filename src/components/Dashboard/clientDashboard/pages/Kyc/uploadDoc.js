/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { fetcherForFiles, hasFileDelete, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";

export const UploadDoc = ({
  handleOpen,
  tab,
  setKycScore,
  kycScore,
  setKycTotal,
  kycTotal,
}) => {
  const [loading, setLoading] = useState(false);
  const [, setIsLoading] = useState(true);
  const [isLoaded, setDataLoaded] = useState(false);
  const [feedback, setFeetback] = useState(false);
  const [allDocuments, setAllDocuments] = useState([]);
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.auth.user);
  const [isSaving, setIsSaving] = useState(false);
  const gotoPrev = () => {
    handleOpen(tab - 1);
  };
  const [formScore, setFormScore] = useState({
    Company_Corporate_Profile: { score: 0, total: 1 },
    Organizational_Chart: { score: 0, total: 1 },
    Certificate_of_Registration: { score: 0, total: 1 },
    CAC: { score: 0, total: 1 },
    Memorandum_of_Association: { score: 0, total: 1 },
    HSE_Policies: { score: 0, total: 1 },
    Quality_Management_Procedure: { score: 0, total: 1 },
    TAX_Certificate: { score: 0, total: 1 },
    VAT_Certificate: { score: 0, total: 1 },
    reference_from_bank: { score: 0, total: 1 },
    Company_statement: { score: 0, total: 1 },
    Workmen_Insurance_NSITF: { score: 0, total: 1 },
    passport_of_MD: { score: 0, total: 1 },
    audited_financials: { score: 0, total: 1 },
    photograph_of_operational: { score: 0, total: 1 },
    Passport_of_vendors: { score: 0, total: 1 },
  });

  const DataSaver = async (e) => {
    e.preventDefault();
    const url = "/kyc-documents/create";

    const fd = new FormData();
    const allDocValues = Object.values(formData);
    const allKeys = Object.keys(formData);
    for (let i = 0; i < allDocValues.length; i++) {
      fd.append(allKeys[i], allDocValues[i]);
    }
    fd.append("userType", user.userType);
    if (isSaving) {
      saveData({
        url,
        setLoading,
        formData: fd,
        user,
        setFormData: setAllDocuments,
        setFeetback,
        hasFile: true,
        lastForm: true,
      });

      const authToken = localStorage.getItem("auth_token");
      const kycScore_ = {
        ...kycScore,
        uploadDocument: kycScore.uploadDocument + 1,
      };
      await Axios.patch(
        `/user/update-account`,
        {
          kycScore: JSON.stringify(kycScore_),
          kycTotal: JSON.stringify(kycTotal),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      setFormData({});
    }
  };
  let newValue = {};
  const updateValue = (newVal, variable) => {
    newValue[variable] = newVal;
    setFormData({
      ...formData,
      ...newValue,
    });
    setIsSaving(true);
  };
  const isUploaded = (name) => {
    return allDocuments?.filter((doc) => doc.name === name && doc);
  };
  const openDoc = (url) => {
    window.open(url, "_blank");
  };
  const SelectFile = ({ proposedFileArray, isUploaded }) => {
    const myFiles = proposedFileArray.map((file, i) => {
      const uploaded = isUploaded(file.as);
      if (uploaded.length === 0) {
        return (
          <div className="mt-3" key={i}>
            <label>{file.title}</label>
            <div className="w-full flex items-center mt-2 p-2 border border-gray-400 rounded">
              <input
                type="file"
                name={file.as}
                onChange={(e) => updateValue(e.target.files[0], file.as)}
                className=""
              />
              <p className="text-blue-500">{formData[file.as]?.name}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mt-3" key={i}>
            <label>{file.title}</label>
            <div className="flex justify-between">
              <h5
                onClick={() => openDoc(uploaded[0].file)}
                className="mt-3 cursor-pointer text-blue-600"
              >
                view document
              </h5>
              <button
                onClick={() =>
                  hasFileDelete({
                    url: "kyc-documents",
                    id: uploaded[0].id,
                    user,
                    setLoading,
                    setData: setAllDocuments,
                    setFeetback,
                  })
                }
                className="btn-primary bg-red-600 lg:px-7"
              >
                Delete
              </button>
            </div>
          </div>
        );
      }
    });
    return myFiles;
  };
  const fileList = [
    { title: "Company's Corporate Profile", as: "Company_Corporate_Profile" },
    { title: "Organizational Chart", as: "Organizational_Chart" },
    {
      title: "Certificate of Incorporation / Registration",
      as: "Certificate_of_Registration",
    },
    {
      title:
        "Corporate Affairs Commission Schedule of Directors form (CO7), and Statement of Allotment of Shares form (CO2)",
      as: "CAC",
    },
    {
      title: "Memorandum and Articles of Association",
      as: "Memorandum_of_Association",
    },
    {
      title: "Health, Safety and Environmental (HSE) Policies",
      as: "HSE_Policies",
    },
    {
      title: "Quality Management Procedure",
      as: "Quality_Management_Procedure",
    },
    { title: "Three years TAX Clearance Certificate", as: "TAX_Certificate" },
    { title: "VAT Registration Certificate", as: "VAT_Certificate" },
    {
      title: "A reference letter from the company's bank",
      as: "reference_from_bank",
    },
    {
      title: "Company's six(6) months bank statement",
      as: "Company_statement",
    },
    {
      title: "Workmen's Compensation Insurance (NSITF)",
      as: "Workmen_Insurance_NSITF",
    },
    {
      title:
        "One(1) passport sized photograph of MD/Rep and all other directors",
      as: "passport_of_MD",
    },
    {
      title: "Last three(3) years audited financials of the company ",
      as: "audited_financials",
    },
    {
      title: "Three(3) sided photograph of Operational Area and Main Entrance",
      as: "photograph_of_operational",
    },
  ];

  const formScoreAuto = () => {
    let total = 0;
    let score = 0;
    let index = 0;

    let __formScore = {};
    if (allDocuments.length > 0) {
      Object.keys(formScore).forEach((_data) => {
        let score_ = 0;

        if (allDocuments[index] !== undefined) {
          score_ = 1;
        } else {
          score_ = 0;
        }

        __formScore = {
          ...__formScore,
          [_data]: {
            score: score_,
            total: 1,
          },
        };
        index += 1;

        setFormScore(__formScore);
      });

      Object.keys(__formScore).forEach((_data) => {
        score += __formScore[_data].score;
        total += __formScore[_data].total;
      });
    }
    return { total, score };
  };

  const loadData__ = async () => {
    const auto = formScoreAuto();
    setKycTotal({ ...kycTotal, uploadDocument: auto.total });
    setKycScore({ ...kycScore, uploadDocument: auto.score });
    const authToken = localStorage.getItem("auth_token");


    await Axios.patch(
      `/user/update-account`,
      {
        kycScore: JSON.stringify({...kycScore, uploadDocument: auto.score}),
        kycTotal: JSON.stringify({ ...kycTotal, uploadDocument: auto.total }),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );
    
  };

  useEffect(() => {
    !isLoaded &&
      fetcherForFiles({
        url: "kyc-documents",
        user,
        setData: setAllDocuments,
      });
    setIsLoading(false);
    loadData__();
    setDataLoaded(true);
  }, [allDocuments]);

  return (
    <form className="lg:px-4 scale-ani">
      {allDocuments ? (
        <SelectFile isUploaded={isUploaded} proposedFileArray={fileList} />
      ) : (
        <Spinner />
      )}
      <div className="">
        {!loading ? (
          <div className="pt-8 flex justify-between lg:justify-end">
            <button
              onClick={gotoPrev}
              className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600 lg:mr-10"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={DataSaver}
              className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600"
            >
              Submit
            </button>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      {feedback && (
        <ActionFeedBack
          closeFeedBack={() => setFeetback(false)}
          title={feedback.title}
          icon={feedback.icon}
          info={feedback.info}
          status={feedback.status}
        />
      )}
    </form>
  );
};
