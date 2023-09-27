/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dayjs from "dayjs";

export const OrganisationInfo = ({
  handleOpen,
  tab,
  setKycScore,
  kycScore,
  setKycTotal,
  kycTotal,
}) => {
  const [isFetching, setIsFetching] = useState(false)
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
  const hect = [
    "1 - 10 Acres",
    "10 - 20 Acres",
    "20 - 50 Acres",
    "Over 50 Acres",
    "Roads, Bridges etc",
  ];
  const costs = [
    "Less than 50 million",
    "50-100 million",
    "200-500 million",
    "Over 500 million",
  ];
  const gotoPrev = () => {
    handleOpen(tab - 1);
  };
  const user = useSelector((state) => state.auth.user);
  const prof = useSelector((state) => state.auth.user.userType);
  const roleInfo = useSelector((state) => state.projects.serviceRole)
  const [showOthers, setShowOthers] = useState(false)

  const dataLoader = () => {
    const url = "/kyc-organisation-info/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData, setIsFetching);
  };
  const checkField = () => {
    if (
      formData.Incorporation_date === " " ||
      formData.complexity_of_projects_completed === " " ||
      formData.cost_of_projects_completed === " " ||
      formData.director_designation === " " ||
      formData.director_email  === " " ||
      formData.director_fullname  === " " ||
      formData.director_phone  === " " ||
      formData.no_of_staff  === " " ||
      formData.organisation_type  === " " ||
      formData.id 
    ) {
      return false;
    } else return true;
  };
  const DataSaver = async () => {
    if (checkField()) {
      toast.error("Please fill the required field", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
      return;
    }
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
      handleOpen(tab + 1);
    } else {
      handleOpen(tab + 1);
    }
  };
  useEffect(() => {
    if(isFetching){
      setPhoneNo(String(formData.director_phone))
      setPhoneNo2(String(formData.contact_phone))
    }
  }, [isFetching])
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
  const handleOrganType = (e) => {
    e.preventDefault()
    if(e.target.value === "Others"){
      updateValue(e.target.value, "organisation_type")
      setShowOthers(true)
    }else{
      setShowOthers(false)
      updateValue(e.target.value, "organisation_type")
    }
  }
  const [phoneNo, setPhoneNo] = useState();
  const handlePhoneChange = (data) => {
    setPhoneNo(data);
    setFormData({
      ...formData,
      director_phone: `+${phoneNo}`,
    })
  };
  const [phoneNo2, setPhoneNo2] = useState();
  const handlePhoneChange2 = (data) => {
    setPhoneNo2(data);
    setFormData({
      ...formData,
      contact_phone: `+${phoneNo2}`
    })
  };
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
    // if (variable === "director_phone") {
    //   newValue = { director_phone: newVal };
    // }
    if (variable === "director_email") {
      newValue = { director_email: newVal };
    }
    // if (variable === "contact_phone") {
    //   newValue = { contact_phone: newVal };
    // }
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
  useEffect(() => {
    if(formData.others){
      setShowOthers(true)
    }
  }, [formData])

  return (
    <div className="lg:px-4 scale-ani">
      <div className="">
        <label>Type of organisation</label>
        <select
          value={formData.organisation_type}
          onChange={handleOrganType}
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        >
          <option value={''}>Select an Option</option>
          <option value={'Sole Proprietorship'}>Sole Proprietorship</option>
          <option value={'Partnership'}>Partnership</option>
          <option value={'Joint Venture'}>Joint Venture</option>
          <option value={'Limited Liability'}>Limited Liability</option>
          <option value={'Others'}>Others(Specify below)</option>
        </select>
      </div>
      {
        showOthers && <div className="mt-3 scale-ani">
        <label>Others(Specify)</label>
        <input
          value={formData.others}
          onChange={(e) => updateValue(e.target.value, "others")}
          type="text"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      }
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
                staffs.map((item, i) => (
                  <option value={item} key={i}>{item}</option>
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
                costs.map((item, i) => (
                  <option value={item} key={i}>{item}</option>
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
                roleInfo === "surveyor"?
                hect.map((item) => (
                  <option value={item}>{item}</option>
                ))
                :
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
          max={dayjs(new Date()).format('YYYY-MM-DD')}
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
        {/* <input
          value={formData.director_phone}
          onChange={(e) => updateValue(e.target.value, "director_phone")}
          type="number"
          placeholder="Phone number"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        /> */}
         <PhoneInput
          country={"ng"}
          name="phone"
          value={phoneNo}
          onChange={(phone) => handlePhoneChange(phone)}
          className="mt-2 w-full rounded bg-white border border-gray-700"
          inputStyle={{
            width: "100%",
            border: "none",
            paddingTop: "19px",
            paddingBottom: "19px",
          }}
          rules={{ required: true }}
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
        {/* <input
          value={formData.contact_phone}
          onChange={(e) => updateValue(e.target.value, "contact_phone")}
          type="number"
          placeholder="Phone number"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        /> */}
        <PhoneInput
          country={"ng"}
          name="phone"
          value={phoneNo2}
          onChange={(phone) => handlePhoneChange2(phone)}
          className="mt-2 w-full rounded bg-white border border-gray-700"
          inputStyle={{
            width: "100%",
            border: "none",
            paddingTop: "19px",
            paddingBottom: "19px",
          }}
          rules={{ required: true }}
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
