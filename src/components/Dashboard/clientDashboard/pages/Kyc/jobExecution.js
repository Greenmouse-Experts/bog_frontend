/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FcDeleteDatabase } from "react-icons/fc";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { hasFileDelete, fetcherForFiles, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export const JobExecution = ({
  handleOpen,
  tab,
  setKycScore,
  kycScore,
  setKycTotal,
  kycTotal,
}) => {
  const [mini, setMini] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLoaded, setDataLoaded] = useState(false);
  const [feedback, setFeetback] = useState(false);
  const [doc, setDoc] = useState();
  const [addWork, setAddWork] = useState(false);
  const [myWorks, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    date: "",
    fileUrl: "",
    company_involvement: "",
    years_of_experience: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const gotoPrev = () => {
    handleOpen(tab - 1);
  };
  const resetForm = () => {
    setFormData({
      name: "",
    value: "",
    date: "",
    fileUrl: "",
    company_involvement: "",
    years_of_experience: "",
    })
  }
  const AddNewWork = () => {
    if(myWorks.length >= 5){
      toast.error('We require a maximum of 5 work experience entries', {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }else setAddWork(true)
  }
  const user = useSelector((state) => state.auth.user);
  const [formScore] = useState({
    name: { score: 0, total: 1 },
    value: { score: 0, total: 1 },
    date: { score: 0, total: 1 },
    fileUrl: { score: 0, total: 1 },
    company_involvement: { score: 0, total: 1 },
    years_of_experience: { score: 0, total: 1 },
  });
  const AddOne = async() => {
    if(!doc){
      return (
        toast.error("Please attach a supporting document", {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        })
      )
    }
    const url = "/kyc-work-experience/create";
    const fd = new FormData();
    fd.append(`document`, doc);
    fd.append("name", formData.name);
    fd.append("value", formData.value);
    fd.append("date", formData.date);
    fd.append("years_of_experience", formData.years_of_experience);
    fd.append("company_involvement", formData.company_involvement);
    fd.append("userType", user.userType);

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
    setIsSaving(false);
      saveData({
        url,
        setLoading,
        formData: fd,
        user,
        setFormData: setWorks,
        setFeetback,
        hasFile: true,
      });
      setAddWork(false)
      resetForm()
  }
  const DataSaver = async () => {
    const url = "/kyc-work-experience/create";
    const fd = new FormData();
    fd.append(`document`, doc);
    fd.append("name", formData.name);
    fd.append("value", formData.value);
    fd.append("date", formData.date);
    fd.append("years_of_experience", formData.years_of_experience);
    fd.append("company_involvement", formData.company_involvement);
    fd.append("userType", user.userType);

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
      saveData({
        url,
        setLoading,
        formData: fd,
        user,
        setFormData: setWorks,
        setFeetback,
        hasFile: true,
      });
    } else {
      handleOpen(
        user.userType === "vendor"
          ? tab + 1
          : user.userType === "professional"
          ? tab + 2
          : tab + 1
      );
    }
    setAddWork(true);
  };
  let newValue = {};
  const updateValue = (newVal, variable) => {
    variable === "name" && (newValue = { name: newVal });
    variable === "value" && (newValue = { value: newVal });
    variable === "date" && (newValue = { date: newVal });
    variable === "document" && (newValue = { document: newVal });
    // variable === "years_of_experience" &&
    //   (newValue = { years_of_experience: newVal });
    variable === "company_involvement" &&
      (newValue = { company_involvement: newVal });

    setFormData({
      ...formData,
      ...newValue,
    });
    setIsSaving(true);
  };

  const formScoreAuto = () => {
    let total = 0;
    let score = 0;

    if (myWorks.length > 0) {
      myWorks.forEach((myWork) => {
        Object.keys(myWork).forEach((work) => {
          if (formScore[work] !== undefined) {
            if (myWork[work] !== "" && myWork[work] !== null) {
              score += 1;
            }
            total += 1;
          }
        });
      });
    }

    return { total, score };
  };

  const loadData__ = () => {
    const auto = formScoreAuto();
    setKycTotal({ ...kycTotal, workExperience: auto.total });
    setKycScore({ ...kycScore, workExperience: auto.score });
  };

  useEffect(() => {
    !isLoaded &&
      fetcherForFiles({ url: "kyc-work-experience", user, setData: setWorks });
    setDataLoaded(true);
    loadData__();
  }, [myWorks]);
  return (
    <div>
      <label>
        List the most relevant jobs by monetary value with other companies and
        date of execution (provide supporting documents if any){" "}
      </label>
      {myWorks.map((element, index) => (
        <div className="form-inline mt-6" key={index}>
          <div className="flex bg-light p-5 rounded-lg justify-between items-center">
            <p className="fw-600 text-lg">Job Entry {index + 1}</p>
            <p className="flex items-center">
              <button
                type="button"
                className="mr-4 text-xxl"
                onClick={() =>
                  hasFileDelete({
                    url: "kyc-work-experience",
                    id: element.id,
                    user,
                    setLoading,
                    setData: setWorks,
                    setFeetback,
                  })
                }
              >
                <FcDeleteDatabase />
              </button>
              {mini === index ? (
                <BsDashCircleFill
                  className="text-primary text-xl"
                  onClick={() => setMini("")}
                />
              ) : (
                <BsPlusCircleFill
                  className="text-primary text-xl"
                  onClick={() => setMini(index)}
                />
              )}
            </p>
          </div>
          {mini === index && (
            <div className="px-5 scale-ani">
              <div className="lg:flex">
                <div className="lg:w-6/12 lg:pr-3 mt-5">
                  <label className="fw-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={element.name || ""}
                    disabled={true}
                    className="w-full mt-2 p-2 border border-gray-400 rounded"
                  />
                </div>
                <div className="lg:w-6/12 lg:pl-3 mt-5">
                  <label className="fw-500">Value (NGN)</label>

                  <input
                    type="text"
                    name="name"
                    value={element.value || ""}
                    disabled={true}
                    className="w-full mt-2 p-2 border border-gray-400 rounded"
                  />
                </div>
              </div>
              <div className="lg:flex">
                <div className="lg:w-6/12 lg:pr-3 mt-5">
                  <label className="fw-500">Date</label>
                  <input
                    type="text"
                    name="name"
                    value={element.date?.split("T")[0]}
                    disabled={true}
                    className="w-full mt-2 p-2 border border-gray-400 rounded"
                  />
                </div>
                <div className="lg:w-6/12 lg:pl-3 mt-5">
                  <label className="fw-500">Provisional Document</label> <br />
                  <br />
                  <a
                    href={element.fileUrl}
                    target="_blank"
                    className="text-blue-600 w-full mt-6 p-2 border border-gray-400 rounded"
                    rel="noreferrer"
                  >
                    view document
                  </a>
                </div>
              </div>
              {/* <div className="mt-5">
                <label className="fw-500">
                  Number of experience(years) as a contractor/sub-contractor
                </label>
                <input
                  type="number"
                  name="name"
                  value={element.years_of_experience}
                  disabled={true}
                  onChange={(e) =>
                    updateValue(e.target.value, "company_involvement")
                  }
                  className="w-full mt-2 p-2 border border-gray-400 rounded"
                />
              </div> */}
              <div className="mt-5">
                <label className="fw-500">
                  If the company is a subsidiary, what involvement, if any, will
                  the parent company have?
                </label>
                <textarea
                  value={element.company_involvement}
                  disabled={true}
                  onChange={(e) =>
                    updateValue(e.target.value, "company_involvement")
                  }
                  className="w-full mt-2 h-24 p-2 border border-gray-400 rounded"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      {addWork && (
        <div className="px-5 scale-ani">
          <div className="lg:flex">
            <div className="lg:w-6/12 lg:pr-3 mt-5">
              <label className="fw-500">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => updateValue(e.target.value, "name")}
                className="w-full mt-2 p-2 border border-gray-400 rounded"
              />
            </div>
            <div className="lg:w-6/12 lg:pl-3 mt-5">
              <label className="fw-500">Value (NGN)</label>
              <input
                type="number"
                name="name"
                value={formData.value}
                onChange={(e) => updateValue(e.target.value, "value")}
                className="w-full mt-2 p-2 border border-gray-400 rounded"
              />
            </div>
          </div>
          <div className="lg:flex">
            <div className="lg:w-6/12 lg:pr-3 mt-5">
              <label className="fw-500">Date</label>
              <input
                type="date"
                name="name"
                value={formData.date}
                onChange={(e) => updateValue(e.target.value, "date")}
                className="w-full mt-2 p-2 border border-gray-400 rounded"
                max={dayjs(new Date()).format("YYYY-MM-DD")}
              />
            </div>
            <div className="lg:w-6/12 lg:pl-3 mt-5">
              <label className="fw-500">Provisional Document</label>
              <input
                type="file"
                name="name"
                onChange={(e) => setDoc(e.target.files[0])}
                className="w-full mt-2 p-2 border border-gray-400 rounded"
              />
            </div>
          </div>
          {/* <div className="mt-5">
            <label className="fw-500">
              Number of experience(years) as a contractor/sub-contractor
            </label>
            <input
              type="number"
              name="name"
              value={formData.years_of_experience}
              onChange={(e) =>
                updateValue(e.target.value, "years_of_experience")
              }
              className="w-full mt-2 p-2 border border-gray-400 rounded"
            />
          </div> */}
          <div className="mt-5">
            <label className="fw-500">
              If the company is a subsidiary, what involvement, if any, will the
              parent company have?
            </label>
            <textarea
              value={formData.company_involvement}
              onChange={(e) =>
                updateValue(e.target.value, "company_involvement")
              }
              className="w-full mt-2 h-24 p-2 border border-gray-400 rounded"
            />
          </div>
        </div>
      )}
      <div className="mt-4 flex gap-x-2">
        {addWork && (
          <div className="flex gap-x-2">
            <button
              type="button"
              onClick={AddOne}
              className="rounded-lg px-2 lg:px-6 py-3 text-center bg-primary text-white fw-600"
            >
              Add This Experience
            </button>
            <button
              type="button"
              onClick={() => addWork(false)}
              className="rounded-lg px-2 lg:px-6 py-3 text-center bg-secondary text-white fw-600"
            >
              Close
            </button>
          </div>
        )}
        {!addWork && <button
          className="rounded-lg px-2 lg:px-6 py-3 text-center bg-secondary text-white fw-600"
          type="button"
          onClick={AddNewWork}
        >
          Add Job Experience
        </button>}
      </div>
      <div className="mt-10 flex justify-between lg:justify-end items-center">
        <button
          onClick={gotoPrev}
          className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600 lg:mr-10"
        >
          Previous
        </button>
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={DataSaver}
            className="w-36 rounded-lg py-3 text-center bg-primary text-white fw-600"
            type="submit"
          >
            Save & Continue
          </button>
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
    </div>
  );
};
