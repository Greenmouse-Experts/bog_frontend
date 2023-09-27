/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { saveRole } from "../../../../../redux/actions/ProjectAction";
import PhoneInput from "react-phone-input-2";

export const GeneralInfo = ({
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
  const users = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const services = [
    {
      name: "Quantity Surveyor",
      value: "quantity_surveyor",
      cert: [
        "HND, MNIQS, RQS",
        "PGD, MNIQS, RQS",
        "B.Sc, MNIQS, RQS",
        "M.Sc, MNIQS, RQS",
        "Ph.D, MNIQS, RQS",
      ],
    },
    {
      name: "Structural Engineer",
      value: "structural_engineer",
      cert: [
        "HND, COREN",
        "PGD, COREN",
        "B.Sc, COREN",
        "M.Sc, COREN",
        "Ph.D, COREN",
      ],
    },
    {
      name: "Architects",
      value: "architects",
      cert: [
        "HND, ATECH",
        "PGD, ATECH",
        "B.Sc, G.M.NIA",
        "M.Sc, A.M.NIA,/MNIA",
        "Ph.D, MNIA",
      ],
    },
    {
      name: "Mechanical Engineer",
      value: "mechanical_engineer",
      cert: [
        "HND, PGD, B.Sc, M.Sc, Ph.D",
        "PGD, MNIMECHE",
        "B.Sc, MNIMECHE",
        "M.Sc, MNIMECHE",
        "Ph.D, MNIMECHE",
      ],
    },
    {
      name: "Electrical Engineer",
      value: "electrical_engineer",
      cert: [
        "HND, COREN",
        "PGD, COREN",
        "B.Sc, COREN",
        "M.Sc, COREN",
        "Ph.D, COREN",
      ],
    },
    {
      name: "Surveyor",
      value: "surveyor",
      cert: [
        "HND, MNIS",
        "PGD, MNIS",
        "B.Sc, MNIS",
        "M.Sc, MNIS",
        "Ph.D, MNIS",
      ],
    },
    {
      name: "Civil Engineer",
      value: "civil_engineer",
      cert: [
        "HND, COREN",
        "PGD, COREN",
        "B.Sc, COREN",
        "M.Sc, COREN",
        "Ph.D, COREN",
      ],
    },
  ];
  const years = ["3-5", "6-10", "11-15", "16-20", "Over 20"];

  const getCert = (val) => {
    if (val) {
      const filter = services.filter((where) => where.value === val);
      return filter;
    } else return [];
  };
  const [formData, setFormData] = useState({
    organisation_name: users?.profile?.company_name,
    email_address: users.email,
    contact_number: null,
    contact_number_2: null,
    reg_type: null,
    registration_number: null,
    business_address: null,
    operational_address: null,
    role: null,
    years_of_experience: null,
    certification_of_personnel: null,
    operational_email_tel: null,
  });
  const user = useSelector((state) => state.auth.user);
  const prof = useSelector((state) => state.auth.user.userType);

  const dataLoader = () => {
    const url = "/kyc-general-info/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData, setIsFetching);
  };
  useEffect(() => {
    if(isFetching){
      setPhoneNo(formData.contact_number)
      setPhoneNo2(formData.contact_number_2)
    }
  }, [isFetching])
  const checkField = () => {
    if (
      formData.role === "" ||
      formData.reg_type === "" ||
      formData.registration_number === "" ||
      formData.business_address ||
      formData.years_of_experience ||
      formData.certification_of_personnel
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
    const url = "/kyc-general-info/create";

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
        formData,
        user,
        setFormData,
        setFeetback,
        hasFile: false,
      });
      handleOpen(tab + 1);
    } else {
      handleOpen(tab + 1);
    }
  };
  const [formScore, setFormScore] = useState({
    organisation_name: { score: 0, total: 1 },
    email_address: { score: 0, total: 1 },
    contact_number: { score: 0, total: 1 },
    reg_type: { score: 0, total: 1 },
    registration_number: { score: 0, total: 1 },
    business_address: { score: 0, total: 1 },
    operational_address: { score: 0, total: 1 },
  });
  const [phoneNo, setPhoneNo] = useState(formData?.contact_number);
  const handlePhoneChange = (data) => {
    setPhoneNo(data);
    setFormData({
      ...formData,
      contact_number: `+${phoneNo}`,
    });
  };
  const [phoneNo2, setPhoneNo2] = useState(formData?.contact_number_2);
  const handlePhoneChange2 = (data) => {
    setPhoneNo2(data);
    setFormData({
      ...formData,
      contact_number_2: `+${phoneNo2}`,
    });
  };

  let newValue = {};
  const updateValue = (newVal, variable) => {
    setIsSaving(true);
    if (variable === "organisation_name") {
      newValue = { organisation_name: newVal };
    }
    if (variable === "email_address") {
      newValue = { email_address: newVal };
    }
    if (variable === "operational_email_tel") {
      newValue = { operational_email_tel: newVal };
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
    if (variable === "role") {
      newValue = { role: newVal };
    }
    if (variable === "years_of_experience") {
      newValue = { years_of_experience: newVal };
    }
    if (variable === "certification_of_personnel") {
      newValue = { certification_of_personnel: newVal };
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

  const loadData__ = () => {
    const auto = formScoreAuto();
    setKycTotal({ ...kycTotal, generalInfo: auto.total });
    setKycScore({ ...kycScore, generalInfo: auto.score });
  };

  useEffect(() => {
    !isLoaded && dataLoader();
    setDataLoaded(true);
    loadData__();
    dispatch(saveRole(formData.role));
  }, [formData]);

  return (
    <div className="lg:px-4 scale-ani">
      <div>
        <label>
          Name of Organisation <span className="text-red-500 fw-500">*</span>
        </label>
        <input
          value={formData.organisation_name}
          onChange={(e) => updateValue(e.target.value, "organisation_name")}
          type="text"
          className="w-full mt-2 p-2 border border-gray-400 rounded"
          disabled
        />
      </div>
      <div className="mt-3">
        <label>
          Email Address <span className="text-red-500 fw-500">*</span>
        </label>
        <input
          value={formData.email_address}
          onChange={(e) => updateValue(e.target.value, "email_address")}
          type="email"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
          disabled
        />
      </div>
      <div className="mt-3">
        <label>
          Office Telephone / Contact No{" "}
          <span className="text-red-500 fw-500">*</span>
        </label>
        <PhoneInput
          country={"ng"}
          name="phone"
          value={users?.phone}
          className="mt-1 w-full rounded bg-white border border-gray-700"
          inputStyle={{
            width: "100%",
            border: "none",
            paddingTop: "19px",
            paddingBottom: "19px",
          }}
          disabled
        />
      </div>
      <div className="mt-3">
        <label>Optional Telephone</label>
        {/* <input
          value={formData.contact_number}
          onChange={(e) => updateValue(e.target.value, "contact_number")}
          type="number"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
        /> */}
        <PhoneInput
          country={"ng"}
          name="phone"
          value={phoneNo}
          onChange={(phone) => handlePhoneChange(phone)}
          className="mt-1 w-full rounded bg-white border border-gray-700"
          inputStyle={{
            width: "100%",
            border: "none",
            paddingTop: "19px",
            paddingBottom: "19px",
          }}
          rules={{ required: true }}
        />
      </div>
      {prof === "professional" && (
        <div>
          <div className="mt-3">
            <label>
              Role <span className="text-red-500 fw-500">*</span>
            </label>
            <select
              className="w-full p-2 mt-2 border border-gray-400 rounded"
              value={formData.role}
              required
              onChange={(e) => updateValue(e.target.value, "role")}
            >
              <option value={''}>Select an Option</option>
              {services.map((item, i) => (
                <option value={item.value} key={i}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 grid lg:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <label>
                Years of Experience{" "}
                <span className="text-red-500 fw-500">*</span>
              </label>
              <select
                className="w-full p-2 mt-2 border border-gray-400 rounded"
                value={formData.years_of_experience}
                required
                onChange={(e) =>
                  updateValue(e.target.value, "years_of_experience")
                }
              >
                <option value={''}>Select an Option</option>
                {years.map((item, i) => (
                  <option value={item} key={i}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label>
                Certification of Personnel{" "}
                <span className="text-red-500 fw-500">*</span>
              </label>
              <select
                className="w-full p-2 mt-2 border border-gray-400 rounded"
                value={formData.certification_of_personnel}
                required
                onChange={(e) =>
                  updateValue(e.target.value, "certification_of_personnel")
                }
              >
                <option value={''}>Select an Option</option>
                {formData.role &&
                  getCert(formData.role)[0].cert.map((item, i) => (
                    <option value={item} key={i}>{item}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="mt-3">
        <label className="">
          Type of Registration <span className="text-red-500 fw-500">*</span>
        </label>
        <div className="flex items-center mt-2">
          <input
            value="Incorporation"
            checked={formData.reg_type === "Incorporation"}
            onChange={(e) => updateValue(e.target.value, "reg_type")}
            type="radio"
            name="tor"
            required
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
        <label>
          Incorporation / Registration No{" "}
          <span className="text-red-500 fw-500">*</span>
        </label>
        <input
          value={formData.registration_number}
          onChange={(e) => updateValue(e.target.value, "registration_number")}
          type="text"
          required
          className="w-full p-2 mt-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-3">
        <label>
          Business Address <span className="text-red-500 fw-500">*</span>
        </label>
        <textarea
          value={formData.business_address}
          required
          onChange={(e) => updateValue(e.target.value, "business_address")}
          className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
        />
      </div>
      <div className="mt-3">
        <label>
          Address of other significant operational base (including
          Email/Telephone)
        </label>
        <div className="grid lg:grid-cols-2 items-top gap-3">
          <textarea
            value={formData.operational_address}
            onChange={(e) => updateValue(e.target.value, "operational_address")}
            className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
          />
          <div className="grid gap-2">
            <input
              type="email"
              value={formData.operational_email_tel}
              onChange={(e) =>
                updateValue(e.target.value, "operational_email_tel")
              }
              placeholder="email"
              className="w-full p-2 mt-2 border border-gray-400 rounded"
            />
            <PhoneInput
          country={"ng"}
          name="phone2"
          value={phoneNo2}
          onChange={(phone) => handlePhoneChange2(phone)}
          className="mt-1 w-full rounded bg-white border border-gray-700"
          inputStyle={{
            width: "100%",
            border: "none",
            paddingTop: "19px",
            paddingBottom: "19px",
          }}
        />
          </div>
        </div>
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
