/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";


export const SupplyCat = ({
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
  const [formData, setFormData] = useState({
    categories: [],
    others: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const gotoPrev = () => {
    handleOpen(tab - 1);
  };
  const user = useSelector((state) => state.auth.user);
  const [formScore, setFormScore] = useState({
    categories: { score: 0, total: 1 },
    others: { score: 0, total: 1 },
  });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { categories } = formData;
    if (checked) {
      setFormData({
        categories: [...categories, value],
      });
    } else {
      setFormData({
        categories: categories.filter((x) => x !== value),
      });
    }
    setIsSaving(true);
  };

  const dataLoader = () => {
    const url = "/kyc-supply-category/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData);
  };
  const DataSaver = async () => {
    const url = "/kyc-supply-category/create";
    const newData = { ...formData, categories: formData.categories.toString() };
    
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
        formData: newData,
        user,
        setFormData,
        setFeetback,
        hasFile: false,
      });
    } else {
      handleOpen(tab + 1);
    }
  };
  let newValue = {};
  const updateValue = (newVal, variable) => {
    variable === "others" && (newValue = { others: newVal });
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
      let score_ = 0; let total_ = 1;
      if (_data === "categories") {
        if (formData[_data].length > 0) {
          score_ = 1;
        } else {
          score_ = 0;
        }
      } else {
        if (formData[_data] !== "" && formData[_data] !== null) {
          score_ = 1;
        } else {
          score_ = 0;
        }
      }

      if(_data === 'others'){
        total_ = 0;
      }
      
      __formScore = {
        ...__formScore,
        [_data]: {
          score: score_,
          total: total_,
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
    setKycTotal({ ...kycTotal, SupplyCat: auto.total });
    setKycScore({ ...kycScore, SupplyCat: auto.score });
  };

  useEffect(() => {
    !isLoaded && dataLoader();
    setDataLoaded(true);
    loadData__();
  }, [formData]);
  return (
    <div className="lg:px-4 scale-ani">
      <p className="fw-500 pb-4">Check the categories of supply you offer</p>
      <div className="lg:flex">
        <div className="lg:w-6/12">
          <div>
            <input
              value="Marine"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Marine")}
              type="checkbox"
              className="mr-2"
            />
            <label>Marine</label>
          </div>
          <div>
            <input
              value="Mechanical"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Mechanical")}
              type="checkbox"
              className="mr-2"
            />
            <label>Mechanical</label>
          </div>
          <div>
            <input
              value="Electrical"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Electrical")}
              type="checkbox"
              className="mr-2"
            />
            <label>Electrical / Instrumentation</label>
          </div>
          <div>
            <input
              value="Plumbing"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Plumbing")}
              type="checkbox"
              className="mr-2"
            />
            <label>Plumbing</label>
          </div>
          <div>
            <input
              value="Carpentry"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Carpentry")}
              type="checkbox"
              className="mr-2"
            />
            <label>Carpentry</label>
          </div>
          <div>
            <input
              value="Electronics"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Electronics")}
              type="checkbox"
              className="mr-2"
            />
            <label>Electronics / Household Materials</label>
          </div>
          <div>
            <input
              value="HSE"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("HSE")}
              type="checkbox"
              className="mr-2"
            />
            <label>HSE</label>
          </div>
        </div>
        <div className="lg:w-6/12">
          <div>
            <input
              value="Stationeries"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Stationeries")}
              type="checkbox"
              className="mr-2"
            />
            <label>Stationeries / Consumables</label>
          </div>
          <div>
            <input
              value="Techanicals"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Techanicals")}
              type="checkbox"
              className="mr-2"
            />
            <label>Techanicals</label>
          </div>
          <div>
            <input
              value="ICT"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("ICT")}
              type="checkbox"
              className="mr-2"
            />
            <label>ICT</label>
          </div>
          <div>
            <input
              value="Paints"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Paints")}
              type="checkbox"
              className="mr-2"
            />
            <label>Paints</label>
          </div>
          <div>
            <input
              value="Building"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Building")}
              type="checkbox"
              className="mr-2"
            />
            <label>Building Materials</label>
          </div>
          <div>
            <input
              value="Special"
              onChange={(e) => handleChange(e)}
              checked={formData.categories.includes("Special")}
              type="checkbox"
              className="mr-2"
            />
            <label>Special Services (show evidence)</label>
          </div>
          <div>
            <input
              value="Others"
              onChange={(e) => handleChange(e)}
              // checked={formData.categories.includes("Others")}
              type="checkbox"
              className="mr-2"
            />
            <label>Others (Specify below)</label>
          </div>
        </div>
      </div>
      <div>
        <input
          value={formData.others}
          onChange={(e) => updateValue(e.target.value, "others")}
          type="text"
          placeholder="Specify Others"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
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
