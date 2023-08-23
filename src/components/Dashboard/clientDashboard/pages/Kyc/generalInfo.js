/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const GeneralInfo = ({
  handleOpen,
  tab,
  setKycScore,
  kycScore,
  setKycTotal,
  kycTotal,
}) => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setDataLoaded] = useState(false);
  const [feedback, setFeetback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const users = useSelector((state) => state.auth.user)
  
  const [formData, setFormData] = useState({
    organisation_name: users?.profile?.company_name,
    email_address: users.email,
    contact_number: null,
    reg_type: null,
    registration_number: null,
    business_address: null,
    operational_address: null,
  });
  const user = useSelector((state) => state.auth.user);


  const dataLoader = () => {
    const url = "/kyc-general-info/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData);
  };
  const DataSaver = async () => {
    const url = "/kyc-general-info/create";

    const authToken = localStorage.getItem("auth_token");
    await Axios.patch(`/user/update-account`, {kycScore: JSON.stringify(kycScore), kycTotal: JSON.stringify(kycTotal)}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });

    if (isSaving) {
      setIsSaving(false);

      saveData({
        url,
        setLoading,
        formData,
        user,
        setFormData,
        setFeetback,
        hasFile: false,
      });
    } else {
      handleOpen(tab + 1);
    }
  };

  // const [phoneNo, setPhoneNo] = useState(String(formData?.contact_number));
  // console.log(formData?.contact_number)
  
  const [formScore, setFormScore] = useState({
    organisation_name: { score: 0, total: 1 },
    email_address: { score: 0, total: 1 },
    contact_number: { score: 0, total: 1 },
    reg_type: { score: 0, total: 1 },
    registration_number: { score: 0, total: 1 },
    business_address: { score: 0, total: 1 },
    operational_address: { score: 0, total: 1 },
  });

  // const handlePhoneChange = (formattedValue) => {
  //   setPhoneNo(`+${formattedValue}`);
  // };

  let newValue = {};
  const updateValue = (newVal, variable) => {
    setIsSaving(true);
    if (variable === "organisation_name") {
      newValue = { organisation_name: newVal };
    }
    if (variable === "email_address") {
      newValue = { email_address: newVal };
    }
    if (variable === "contact_number") {
      newValue = { contact_number: newVal };
    }
    if (variable === "reg_type") {
      newValue = { reg_type: newVal };
    }
    if (variable === "registration_number") {
      newValue = { registration_number: newVal };
    }
    if (variable === "business_address") {
      newValue = { business_address: newVal };
    }
    if (variable === "operational_address") {
      newValue = { operational_address: newVal };
    }

    setFormData({
      ...formData,
      ...newValue,
    });
  };

  const formScoreAuto = () => {
    let total = 0;
    let score = 0;

    let __formScore = {};
    Object.keys(formScore).forEach((_data) => {
      let score_ = 0;
      if (formData[_data] !== "" && formData[_data] !== null) {
        score_ = 1;
      } else if (formData[_data] === "") {
        score_ = 0;
      }

      __formScore = {
        ...__formScore,
        [_data]: {
          score: score_,
          total: 1,
        },
      };

      setFormScore(__formScore);
    });

    Object.keys(__formScore).forEach((_data) => {
      score += __formScore[_data].score;
      total += __formScore[_data].total;
    });
    return { total, score };
  };

  console.log({ kycScore, kycTotal });

  const loadData__ = () => {
    const auto = formScoreAuto();
    setKycTotal({ ...kycTotal, generalInfo: auto.total });
    setKycScore({ ...kycScore, generalInfo: auto.score });
  };

  useEffect(() => {
    !isLoaded && dataLoader();
    setDataLoaded(true);
    loadData__();
  }, [formData]);

  return (
    <div className="lg:px-4 scale-ani">
      <div>
        <label>Name of Organisation</label>
        <input
          value={formData.organisation_name}
          onChange={(e) => updateValue(e.target.value, "organisation_name")}
          type="text"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
          disabled
        />
      </div>
      <div className="mt-3">
        <label>Email Address</label>
        <input
          value={formData.email_address}
          onChange={(e) => updateValue(e.target.value, "email_address")}
          type="email"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
          disabled
        />
      </div>
      <div className="mt-3">
        <label>Office Telephone / Contact No</label>
        <input
          value={formData.contact_number}
          onChange={(e) => updateValue(e.target.value, "contact_number")}
          type="number"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
        />
        {/* <PhoneInput
                  country={"ng"}
                  name="phone"
                  // value={String(formData?.contact_number)}
                  onChange={(phone) => updateValue(setPhoneNo(phone), "contact_number")}
                  className="mt-1 w-full rounded bg-white border border-gray-700"
                  inputStyle={{
                    width: "100%",
                    border: "none",
                    paddingTop: "19px",
                    paddingBottom: "19px",
                  }}
                  rules={{ required: true }}
                /> */}
      </div>
      <div className="mt-3">
        <label className="">Type of Registration</label>
        <div className="flex items-center mt-2">
          <input
            value="Incorporation"
            checked={formData.reg_type === "Incorporation"}
            onChange={(e) => updateValue(e.target.value, "reg_type")}
            type="radio"
            name="tor"
            className=""
          />
          <label className="ml-2">Incorporation</label>
        </div>
        <div className="flex items-center">
          <input
            value="Registered Business Name"
            checked={formData.reg_type === "Registered Business Name"}
            onChange={(e) => updateValue(e.target.value, "reg_type")}
            type="radio"
            name="tor"
            className=""
          />
          <label className="ml-2">Registered Business Name</label>
        </div>
      </div>
      <div className="mt-3">
        <label>Incorporation / Registration No</label>
        <input
          value={formData.registration_number}
          onChange={(e) => updateValue(e.target.value, "registration_number")}
          type="number"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-3">
        <label>Business Address</label>
        <textarea
          value={formData.business_address}
          onChange={(e) => updateValue(e.target.value, "business_address")}
          className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
        />
      </div>
      <div className="mt-3">
        <label>
          Address of other significant operational base (including
          Email/Telephone)
        </label>
        <textarea
          value={formData.operational_address}
          onChange={(e) => updateValue(e.target.value, "operational_address")}
          className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="pt-8 flex justify-end">
          <button
            onClick={DataSaver}
            className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600"
          >
            Save & Continue
          </button>
        </div>
      )}
      {feedback && (
        <ActionFeedBack
          closeFeedBack={() => setFeetback(false)}
          title={feedback.title}
          icon={feedback.icon}
          info={feedback.info}
          status={feedback.status}
        />
      )}
    </div>
  );
};
