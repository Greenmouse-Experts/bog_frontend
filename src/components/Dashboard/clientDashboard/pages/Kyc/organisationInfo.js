/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";

export const OrganisationInfo = ({
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
  const staffs = ["1-10", "11-50", "51-100", "101-200", "Over 200"];
  const projs = [
    "<2 Storey",
    "2 - 5 Storey",
    "5 - 10 Storey",
    "Over 10 Storey",
    "Roads, Bridges etc",
  ];
  const costs = [
    "Less than 50 million",
    "50-100 million",
    "200-500 million",
    "Over 500 million",
  ];
  const perform = [
    "Over 15% of time",
    "10%-15% of time",
    "5%-10% of time",
    "Less than 5% of time",
    "On/Before time",
  ];
  const gotoPrev = () => {
    handleOpen(tab - 1);
  };
  const user = useSelector((state) => state.auth.user);
  const prof = useSelector((state) => state.auth.user.userType);
  const roleInfo = useSelector((state) => state.projects.serviceRole)

  const dataLoader = () => {
    const url = "/kyc-organisation-info/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData);
  };
  const DataSaver = async () => {
    const url = "/kyc-organisation-info/create";

    const authToken = localStorage.getItem("auth_token");
    await Axios.patch(
      `/user/update-account`,
      {
        kycScore: JSON.stringify(kycScore),
        kycTotal: JSON.stringify(kycTotal),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );

    if (isSaving) {
      setIsSaving(false);
      saveData({ url, setLoading, formData, user, setFormData, setFeetback });
    } else {
      handleOpen(tab + 1);
    }
  };

  const [formData, setFormData] = useState({
    organisation_type: "",
    others: "",
    Incorporation_date: "",
    director_fullname: "",
    director_designation: "",
    director_phone: "",
    director_email: "",
    contact_phone: "",
    contact_email: "",
    others_operations: "",
    no_of_staff: "",
    cost_of_projects_completed: "",
    complexity_of_projects_completed: "",
    role: roleInfo,
    id: user.profile.id
  });

  const [formScore, setFormScore] = useState({
    organisation_type: { score: 0, total: 1 },
    Incorporation_date: { score: 0, total: 1 },
    director_fullname: { score: 0, total: 1 },
    director_designation: { score: 0, total: 1 },
    director_phone: { score: 0, total: 1 },
    director_email: { score: 0, total: 1 },
    contact_phone: { score: 0, total: 1 },
    contact_email: { score: 0, total: 1 },
    others_operations: { score: 0, total: 1 },
  });

  let newValue = {};
  const updateValue = (newVal, variable) => {
    if (variable === "organisation_type") {
      newValue = { organisation_type: newVal };
    }
    if (variable === "others") {
      newValue = { others: newVal };
    }
    if (variable === "Incorporation_date") {
      newValue = { Incorporation_date: newVal };
    }
    if (variable === "director_fullname") {
      newValue = { director_fullname: newVal };
    }
    if (variable === "director_designation") {
      newValue = { director_designation: newVal };
    }
    if (variable === "director_phone") {
      newValue = { director_phone: newVal };
    }
    if (variable === "director_email") {
      newValue = { director_email: newVal };
    }
    if (variable === "contact_phone") {
      newValue = { contact_phone: newVal };
    }
    if (variable === "contact_email") {
      newValue = { contact_email: newVal };
    }
    if (variable === "role") {
      newValue = { role: newVal };
    }
    if (variable === "no_of_staff") {
      newValue = { no_of_staff: newVal };
    }
    if (variable === "others_operations") {
      newValue = { others_operations: newVal };
    }
    if (variable === "cost_of_projects_completed") {
      newValue = { cost_of_projects_completed: newVal };
    }
    if (variable === "complexity_of_projects_completed") {
      newValue = { complexity_of_projects_completed: newVal };
    }
    setFormData({
      ...formData,
      ...newValue,
    });
    setIsSaving(true);
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

  const loadData__ = () => {
    const auto = formScoreAuto();
    setKycTotal({ ...kycTotal, orgInfo: auto.total });
    setKycScore({ ...kycScore, orgInfo: auto.score });
  };

  useEffect(() => {
    !isLoaded && dataLoader();
    setDataLoaded(true);
    loadData__();
  }, [formData]);

  return (
    <div className="lg:px-4 scale-ani">
      <div className="">
        <label>Type of organisation</label>
        <select
          value={formData.organisation_type}
          onChange={(e) => updateValue(e.target.value, "organisation_type")}
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        >
          <option>Sole Proprietorship</option>
          <option>Partnership</option>
          <option>Joint Venture</option>
          <option>Limited Liability</option>
          <option>Others(Specify below)</option>
        </select>
      </div>
      <div className="mt-3">
        <label>Others(Specify)</label>
        <input
          value={formData.others}
          onChange={(e) => updateValue(e.target.value, "others")}
          type="text"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      {
        prof === 'professional' && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-3">
            <div>
            <label>No of Staff(s)</label>
              <select  className="w-full p-2 mt-2 border border-gray-400 rounded" value={formData.no_of_staff} onChange={(e) =>
                  updateValue(e.target.value, "no_of_staff")
                }>
              <option>Select an Option</option>
              {
                staffs.map((item) => (
                  <option value={item}>{item}</option>
                ))
              }
            </select>
            </div>
            <div>
            <label>Cost of Projects Completed</label>
              <select  className="w-full p-2 mt-2 border border-gray-400 rounded" value={formData.cost_of_projects_completed} onChange={(e) =>
                  updateValue(e.target.value, "cost_of_projects_completed")
                }>
              <option>Select an Option</option>
              {
                costs.map((item) => (
                  <option value={item}>{item}</option>
                ))
              }
            </select>
            </div>
            <div>
            <label>Complexity of Projects Completed</label>
              <select  className="w-full p-2 mt-2 border border-gray-400 rounded" value={formData.complexity_of_projects_completed} onChange={(e) =>
                  updateValue(e.target.value, "complexity_of_projects_completed")
                }>
              <option>Select an Option</option>
              {
                projs.map((item) => (
                  <option value={item}>{item}</option>
                ))
              }
            </select>
            </div>
          </div>
        )
      }
      <div className="mt-3">
        <label>Date of Incorporation / Registration</label>
        <input
          value={formData?.Incorporation_date?.split("T")[0]}
          onChange={(e) => updateValue(e.target.value, "Incorporation_date")}
          type="date"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-3">
        <label>Director's Details</label>
        <input
          value={formData.director_fullname}
          onChange={(e) => updateValue(e.target.value, "director_fullname")}
          type="text"
          placeholder="Full Name"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
        <input
          value={formData.director_designation}
          onChange={(e) => updateValue(e.target.value, "director_designation")}
          type="text"
          placeholder="Designation"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
        <input
          value={formData.director_phone}
          onChange={(e) => updateValue(e.target.value, "director_phone")}
          type="number"
          placeholder="Phone number"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
        <input
          value={formData.director_email}
          onChange={(e) => updateValue(e.target.value, "director_email")}
          type="email"
          placeholder="Email"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-3">
        <label>Contact Person</label>
        <input
          value={formData.contact_phone}
          onChange={(e) => updateValue(e.target.value, "contact_phone")}
          type="number"
          placeholder="Phone number"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
        <input
          value={formData.contact_email}
          onChange={(e) => updateValue(e.target.value, "contact_email")}
          type="email"
          placeholder="Email"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-3">
        <label>Please mention other companies operated</label>
        <textarea
          value={formData.others_operations}
          onChange={(e) => updateValue(e.target.value, "others_operations")}
          className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="pt-8 flex justify-between lg:justify-end">
          <button
            onClick={gotoPrev}
            className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600 lg:mr-10"
          >
            Previous
          </button>
          <button
            onClick={DataSaver}
            className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600"
          >
            Save & Continue
          </button>
        </div>
      )}
      {/* <div className='pt-8 flex justify-between'>
            <p className='w-36 rounded-lg py-3 text-center bg-primary text-white fw-600' onClick={() => handleOpen(1)}>Previous</p>
            <p className='w-36 rounded-lg py-3 text-center bg-primary text-white fw-600' onClick={() => handleOpen(3)}>Next</p>
        </div> */}
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
