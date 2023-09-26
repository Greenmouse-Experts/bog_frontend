/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../layouts/Spinner";
import ActionFeedBack from "../Modals/ActionFeedBack";
import { loadData, saveData } from "./DataHandler";
import Axios from "../../../../../config/config";
import toast from "react-hot-toast";

export const FinanceData = ({
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
  const [banks, setBanks] = useState([]);
  const [bankLoader, setVerifyLoader] = useState(false);
  const [bankError, setBankError] = useState("");
  const [overShow, setOverShow] = useState(false)

  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    account_type: "",
    overdraft_facility: "",
    banker_address: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const gotoPrev = () => {
    handleOpen(
      user.userType === "vendor"
        ? tab - 1
        : user.userType === "professional"
        ? tab - 2
        : tab - 1
    );
  };
  const user = useSelector((state) => state.auth.user);

  const [formScore, setFormScore] = useState({
    bank_name: { score: 0, total: 1 },
    account_name: { score: 0, total: 1 },
    account_number: { score: 0, total: 1 },
    account_type: { score: 0, total: 1 },
    overdraft_facility: { score: 0, total: 1 },
    banker_address: { score: 0, total: 1 },
  });

  const dataLoader = () => {
    const url = "/kyc-financial-data/fetch?userType=" + user.userType;
    loadData(url, formData, setFormData);
  };
  const checkField = () => {
    if (
      formData.bank_name === "" ||
      formData.account_number === "" ||
      formData.account_type === "" || 
      formData.bank_name === ""
    ) {
      return true;
    } else return false;
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
    const url = "/kyc-financial-data/create";

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

  let newValue = {};
  let bankCode = "";

  const updateValue = (newVal, variable) => {
    variable === "bank_name" && (newValue = { bank_name: newVal });
    variable === "account_name" && (newValue = { account_name: newVal });
    variable === "account_number" && (newValue = { account_number: newVal });
    variable === "account_type" && (newValue = { account_type: newVal });
    variable === "overdraft_facility" &&
      (newValue = { overdraft_facility: newVal });
    variable === "banker_address" && (newValue = { banker_address: newVal });

    setFormData({
      ...formData,
      ...newValue,
    });

    banks.forEach((bank) => {
      if (bank.name === formData.bank_name) {
        bankCode = bank.code;
      }
    });

    const authToken = localStorage.getItem("auth_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    const payload = {
      account_number: newVal,
      bank_code: bankCode,
    };

    if (variable === "account_number") {
      setFormData({
        bank_name: formData.bank_name,
        account_name: "",
        account_number: newVal,
        account_type: formData.account_type,
        overdraft_facility: formData.overdraft_facility,
        banker_address: formData.banker_address,
      });
      setBankError("");

      if (newVal.length === 10) {
        setVerifyLoader(true);
        axios
          .post(
            `https://api.buildonthego.com/api/bank/verify-account`,
            payload,
            config
          )
          .then((response) => {
            setVerifyLoader(false);
            setBankError("");
            setFormData({
              bank_name: formData.bank_name,
              account_name: response.data.data.account_name,
              account_number: newVal,
              account_type: formData.account_type,
              overdraft_facility: formData.overdraft_facility,
              banker_address: formData.banker_address,
            });
          })
          .catch((err) => {
            setVerifyLoader(false);
            setBankError(err.response.data.message);
          });
      }
    }

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
    setKycTotal({ ...kycTotal, financialData: auto.total });
    setKycScore({ ...kycScore, financialData: auto.score });
  };

  useEffect(() => {
    !isLoaded && dataLoader();
    setDataLoaded(true);
    fetch(`https://nigerianbanks.xyz`)
      .then((response) => response.json())
      .then((data) => setBanks(data));
    loadData__();
  }, [formData]);
  useEffect(() => {
    if(formData.account_type === "current"){
      setOverShow(true)
    }else setOverShow(false)
  }, [formData])

  return (
    <div className="lg:px-4 scale-ani">
      <div>
        <label>Bank Name</label>
        <select
          name="bank_name"
          id="bank_name"
          value={formData.bank_name}
          onChange={(e) => {
            updateValue(e.target.value, "bank_name");
          }}
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        >
          <option value={''}>Select an option</option>
          {banks.map((bank, index) => (
            <option value={bank.name} key={index}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        <label>Bank Account Number</label>
        <input
          name="account_number"
          id="account_number"
          value={formData.account_number}
          onChange={(e) => {
            updateValue(e.target.value, "account_number");
          }}
          type="number"
          className="w-full upndown mt-2 p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="mt-5 mb-8">
        <label>Bank Account Holder Name</label>
        <input
          name="account_name"
          id="account_name"
          value={formData.account_name}
          onChange={(e) => {
            updateValue(e.target.value, "account_name");
          }}
          type="text"
          disabled={true}
          className="w-full mt-2 p-2 border border-gray-400 rounded"
        />
        {bankLoader && (
          <span
            className="font-semibold italic text-xs mt-1"
            style={{ float: "right", color: "green" }}
          >
            Verifying account ...
          </span>
        )}
        {bankError !== "" && (
          <span
            className="font-semibold text-xs mt-1"
            style={{ float: "right", color: "red" }}
          >
            {bankError}
          </span>
        )}
      </div>
      <div className="mt-5">
        <label>
          Name and address of banker(s) from whom references can be obtained, if
          necessary
        </label>
        <textarea
          name="banker_address"
          id="banker_address"
          value={formData.banker_address}
          onChange={(e) => {
            updateValue(e.target.value, "banker_address");
          }}
          className="w-full p-2 mt-2 border border-gray-400 rounded h-24"
        />
      </div>
      <div className="mt-5">
        <label>Type of Account</label>
        <div className="flex items-center mt-3">
          <input
            checked={formData.account_type === "current"}
            name="account_type"
            value="current"
            onChange={(e) => {
              updateValue(e.target.value, "account_type");
            }}
            type="radio"
            className="mr-2"
          />
          <label>Current Account</label>
        </div>
        <div className="flex items-center">
          <input
            checked={formData.account_type === "savings"}
            name="account_type"
            value="savings"
            onChange={(e) => {
              updateValue(e.target.value, "account_type");
            }}
            type="radio"
            className="mr-2"
          />
          <label>Savings Account</label>
        </div>
        {overShow && <div className="mt-5 scale-ani">
          <label>Level of current overdraft facility</label>
          <input
            name="overdraft_facility"
            id="overdraft_facility"
            value={formData.overdraft_facility}
            onChange={(e) => {
              updateValue(e.target.value, "overdraft_facility");
            }}
            type="text"
            className="w-full mt-2 p-2 border border-gray-400 rounded"
          />
        </div>}
        {loading ? (
          <Spinner />
        ) : (
          <div className="pt-8 flex justify-between lg:justify-end">
            <button
              onClick={gotoPrev}
              className="w-36 rounded-lg py-3 text-center bg-primary mr-10 text-white fw-600"
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
