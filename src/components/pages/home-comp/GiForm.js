import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Spinner from "../../layouts/Spinner";
import DisableNumInputScroll from "../../widgets/DisableNumberScroll";
import useFetchHook from "../../../hooks/useFetchHook";
import toast from "react-hot-toast";
import {
  addValues,
  calculatePercentage,
  formatNgnNumber,
  formatNumber,
  getPercentage,
} from "../../../services/helper";
import { updateGIDetails } from "../../../redux/actions/ProjectAction";
import Swal from "sweetalert2";
import Axios from "../../../config/config";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";

const ServiceGIForm = ({ close }) => {
  const user = useSelector((state) => state.auth.user);
  const [Loading, setLoading] = useState();
  const [viewPrice, setViewPrice] = useState(false);
  const [payloads, setPayloads] = useState();
  const [prjRef, setPrjRef] = useState('');
  // pricing state
  const [sptOne, setSptOne] = useState(0);
  const [sptTwo, setSptTwo] = useState(0);
  const [cptOne, setCptOne] = useState(0);
  const [cptTwo, setCptTwo] = useState(0);
  const [chem, setChem] = useState(0);
  const [tots, setTots] = useState(0);
  const [totals, setTotals] = useState(0);
  const { data } = useFetchHook(
    "/projects/geotechnical-investigation/metadata/view"
  );
  const checkAllFields = () => {
    if (
      name &&
      address &&
      setup_dismantle_rig_qty >= 1 &&
      setup_dismantle_cpt_qty >= 1 &&
      chemical_analysis_of_ground_water_qty >= 1 &&
      no_of_bh > 0 &&
      depth_of_bh
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [rate, setRate] = useState();
  const getSelectedRate = () => {
    if (!data) {
      return;
    }
    if (no_of_bh <= 0 && !depth_of_bh) {
      return;
    }
    const rateMeter = data.filter(
      (where) =>
        where.min_qty_bh <= no_of_bh &&
        where.max_qty_bh >= no_of_bh &&
        where.depth_of_bh == depth_of_bh
    );
    if (!!rateMeter.length) {
      setRate(rateMeter[0]);
      setTimeout(() => {
        setSptTwo(
          formik.values.setup_dismantle_rig_qty *
            parseFloat(rateMeter[0].depth_of_borehole_amt)
        );
      }, 500);
    } else {
      setRate();
      return toast.error("Pricing for selected value not available yet", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const dispatch = useDispatch();
  const stopLoading = () => {
    setLoading(false);
  };
  const submitHandler = (value) => {
    setLoading(true);
    const payload = {
      ...value,
      setup_dismantle_rig_amt: Number(rate.setup_dismantle_rig),
      drilling_spt_amt: Number(rate.depth_of_borehole_amt),
      drilling_spt_qty: formik.values.setup_dismantle_rig_qty,
      setup_dismantle_cpt_amt: Number(rate.setup_dismantle_cpt),
      dutch_cpt_amt: Number(rate.tons_machine),
      dutch_cpt_qty: formik.values.setup_dismantle_cpt_qty,
      chemical_analysis_of_ground_water_amt: Number(
        rate.chemical_analysis_of_ground_water
      ),
      mobilization: rate.mobilization,
      demobilization: rate.demobilization,
      lab_test: rate.lab_test,
      report: rate.report,
      lab_test_types: rate.lab_test_types,
      total: calculatePercentage(tots, 7.5),
    };
    setPayloads(payload);
    dispatch(updateGIDetails(payload, stopLoading, makeProjectOrder));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      no_of_bh: 0,
      depth_of_bh: 0,
      setup_dismantle_rig_amt: 0,
      setup_dismantle_rig_qty: 0,
      drilling_spt_amt: 0,
      drilling_spt_qty: 0,
      setup_dismantle_cpt_amt: 0,
      setup_dismantle_cpt_qty: 0,
      dutch_cpt_amt: 0,
      dutch_cpt_qty: 0,
      chemical_analysis_of_ground_water_amt: 0,
      chemical_analysis_of_ground_water_qty: 0,
      total: 0,
    },
    onSubmit: submitHandler,
    // validationSchema: serviceTypeCategorySchema
  });
  const {
    name,
    address,
    no_of_bh,
    depth_of_bh,
    setup_dismantle_rig_qty,
    setup_dismantle_cpt_qty,
    chemical_analysis_of_ground_water_qty,
    total,
  } = formik.values;
  const handleShowPrice = () => {
    if (checkAllFields()) {
      if (rate) {
        handleTotal();
        setViewPrice(true);
      } else {
        return toast.error("Pricing for selected value not available yet", {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    } else {
      toast.error("Fill the available fields", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const handleCalculation = () => {
    if (!data) {
      return;
    }
    if (rate) {
      setSptOne(
        formik.values.setup_dismantle_rig_qty *
          parseFloat(rate.setup_dismantle_rig)
      );
      setSptTwo(
        formik.values.setup_dismantle_rig_qty *
          parseFloat(rate.depth_of_borehole_amt)
      );
      setCptOne(
        formik.values.setup_dismantle_cpt_qty *
          parseFloat(rate.setup_dismantle_cpt)
      );
      setCptTwo(
        formik.values.setup_dismantle_cpt_qty * parseFloat(rate.tons_machine)
      );
      setChem(
        formik.values.chemical_analysis_of_ground_water_qty *
          parseFloat(rate.chemical_analysis_of_ground_water)
      );
    }
  };
  const handleTotal = () => {
    setTots(
      addValues(
        sptOne,
        sptTwo,
        cptOne,
        cptTwo,
        chem,
        rate.mobilization,
        rate.demobilization,
        rate.lab_test,
        rate.report
      )
    );
    setTotals(calculatePercentage(tots, 7.5));
  };
  useEffect(() => {
    handleCalculation();
  }, [formik.values]);
  useEffect(() => {
    if (no_of_bh > 0 && depth_of_bh) {
      getSelectedRate();
    }
  }, [depth_of_bh, no_of_bh]);
  // make project order
  let config = {
    email: user.email,
    amount: calculatePercentage(tots, 7.5) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_API_KEY,
  };
  let payRef = ""
  const makeProjectOrder = async (payload) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const response = await Axios.post(
        `${process.env.REACT_APP_URL}/projects/geotechnical-investigation/order`,
        payload,
        config
      );
      if (response.success) {
        payRef = response.ref
        setPrjRef(response.ref)
        initializePayment(onSuccess, onClose);
        // Swal.fire({
        //   title: "Make Payment",
        //   imageUrl:
        //     "https://cdn3d.iconscout.com/3d/premium/thumb/payment-protection-6871354-5654938.png",
        //   imageWidth: "105px",
        //   buttonsStyling: "false",
        //   confirmButtonText: "Continue",
        //   confirmButtonColor: "#3F79AD",
        // }).then(function () {
        //   initializePayment(onSuccess, onClose);
        // });
      }
      return response;
    } catch (error) {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const onSuccess = (reference) => {
    console.log(prjRef);
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("auth_token"),
      },
    };
    // Implementation for whatever you want to do with reference and after success call.
    Axios.get(
      `${process.env.REACT_APP_URL}/projects/geotechnical-investigation/verify-payment/${payRef}/${reference.reference}`,
      config
    ).then((res) => {
      if (res.success) {
        Swal.fire({
          title: "Success",
          imageUrl:
            "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
          imageWidth: "75px",
          text: "Payment Successful",
          buttonsStyling: "false",
          confirmButtonText: "Continue",
          confirmButtonColor: "#3F79AD",
        }).then(function () {
          navigate("/dashboard/projects");
        });
        setLoading(false);
      } else {
        toast.error("Failed to validate payment", {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    });
  };
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <DisableNumInputScroll />
      <div
        className="fixed font-primary top-0 w-full h-screen bg-op  center-item z-40"
        onClick={close}
      >
        <div
          className="bg-white lg:w-5/12 px-5 max-h-70 overflow-y-auto overscroll-none lg:px-10 w-11/12 py-6 lg:py-8 shadow fw-500 scale-ani"
          onClick={(e) => e.stopPropagation()}
        >
          <FaTimes className="absolute top-6 right-6" onClick={close} />
          <p className="fw-600 text-xl border-b pb-1">
            Geotechnical Investigation
          </p>
          <p className="py-4 fw-500">PLEASE, PROVIDE CORRECT INFORMATION</p>
          <form>
            <div className="grid gap-5">
              <div className="">
                <label className="block">
                  Name <span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="name"
                  name="name"
                  value={name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Location<span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="address"
                  name="address"
                  value={address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p className="text-red-500">{formik.errors.address}</p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Number of Intended Geotechnical Borehole{" "}
                  <span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="no_of_bh"
                  name="no_of_bh"
                  value={no_of_bh}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.no_of_bh && formik.errors.no_of_bh ? (
                  <p className="text-red-500">{formik.errors.no_of_bh}</p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Depth of Borehole{" "}
                  <span className="fw-600 text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="depth_of_bh"
                  name="depth_of_bh"
                  value={depth_of_bh}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>Select an option</option>
                  <option value={30}>30m</option>
                  <option value={40}>40m</option>
                  <option value={50}>50m</option>
                  <option value={70}>70m</option>
                </select>
                {formik.touched.depth_of_bh && formik.errors.depth_of_bh ? (
                  <p className="text-red-500">{formik.errors.depth_of_bh}</p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Number of Borehole/SPT{" "}
                  <span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="setup_dismantle_rig_qty"
                  name="setup_dismantle_rig_qty"
                  value={setup_dismantle_rig_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.setup_dismantle_rig_qty &&
                formik.errors.setup_dismantle_rig_qty ? (
                  <p className="text-red-500">
                    {formik.errors.setup_dismantle_rig_qty}
                  </p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Number of Cone Penetration Test{" "}
                  <span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="setup_dismantle_cpt_qty"
                  name="setup_dismantle_cpt_qty"
                  value={setup_dismantle_cpt_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.setup_dismantle_cpt_qty &&
                formik.errors.setup_dismantle_cpt_qty ? (
                  <p className="text-red-500">
                    {formik.errors.setup_dismantle_cpt_qty}
                  </p>
                ) : null}
              </div>
              <div className="">
                <label className="block">
                  Number of Chemical Analysis of Ground water{" "}
                  <span className="fw-600 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                  required
                  id="chemical_analysis_of_ground_water_qty"
                  name="chemical_analysis_of_ground_water_qty"
                  value={chemical_analysis_of_ground_water_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.chemical_analysis_of_ground_water_qty &&
                formik.errors.chemical_analysis_of_ground_water_qty ? (
                  <p className="text-red-500">
                    {formik.errors.chemical_analysis_of_ground_water_qty}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-8">
              {!Loading ? (
                <div className="flex justify-between gap-x-12">
                  <Button
                    type="button"
                    onClick={handleShowPrice}
                    className="bg-primary w-full text-lg fw-500"
                    // className="bg-white text-primary w-full text-lg fw-500"
                  >
                    View Pricing
                  </Button>
                  {/* <Button
                    type="submit"
                    // onClick={handleCalculation}
                    className="bg-primary w-full text-lg fw-500"
                  >
                    Submit
                  </Button> */}
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </form>
        </div>
      </div>
      {viewPrice && (
        <>
          <div
            className="fixed font-primary top-0 w-full h-screen bg-op  center-item z-40"
            onClick={() => setViewPrice(false)}
          >
            <div
              className="bg-white lg:w-7/12 px-5 max-h-[80vh] overflow-y-auto overscroll-none lg:px-10 w-11/12 py-6 lg:py-8 shadow fw-500 scale-ani"
              onClick={(e) => e.stopPropagation()}
            >
              <FaTimes
                className="absolute top-6 right-6"
                onClick={() => setViewPrice(false)}
              />
              <p className="fw-600 text-xl border-b pb-1">
                Geotechnical Investigation Pricing
              </p>
              <div className="py-2 align-middle inline-block min-w-full ">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead className="thead-light bg-light">
                    <tr className="">
                      <th
                        scope="col"
                        className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                      >
                        Unit
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b fw-600 border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 text-left">
                        MOBILIZATION AND DEMOBILIZATION
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 py-2 text-left">
                        Mobilise and deliver to site all relevant equipment,
                        personnel and materials necessary for the execution of
                        the works as detailed below.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                        LS
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                        {formatNumber(rate.mobilization)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left py-2">
                        Allow for demobilization of ditto.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                        LS
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">
                        {formatNumber(rate.demobilization)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                        BOREHOLE/SPT
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Set-up and dismantle rig at each test point.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formik.values.setup_dismantle_rig_qty}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        Nr
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.setup_dismantle_rig)}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(sptOne)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Drill each borehole to maximum depth of 30m, taking
                        samples at 1.0m depth and change of strata. Also taking
                        SPT at 1.5m advance into the borehole within
                        cohesionless strata.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formik.values.setup_dismantle_rig_qty}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        Nr
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.depth_of_borehole_amt)}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(sptTwo)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                        CONE PENETRATION TEST
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Set-up and dismantle CPT machine at each test point.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formik.values.setup_dismantle_cpt_qty}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        Nr
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.setup_dismantle_cpt)}
                      </td>
                      <td>{formatNumber(cptOne)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Dutch Cone Penetrometer test conducted to refusal using
                        10 Tons Machine.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formik.values.setup_dismantle_cpt_qty}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        Nr
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.tons_machine)}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(cptTwo)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                        CHEMICAL ANALYSIS OF GROUND WATER
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Carry out chemical analysis of ground water retrieved
                        from drilled borehole
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formik.values.chemical_analysis_of_ground_water_qty}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        Nr
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.chemical_analysis_of_ground_water)}
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(chem)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">
                        LABORATORY TEST
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Carry out laboratory tests on recovered soil samples
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        LS
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td>{formatNumber(rate.lab_test)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                        REPORTS
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Prepare geotechnical investigation report and submit 3
                        hard copies of report and 1 electronic copy
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        LS
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNumber(rate.report)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                        SUBTOTAL
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNgnNumber(tots)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                        VAT
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        7.5%
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNgnNumber(getPercentage(tots, 7.5))}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">
                        TOTAL
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className=" text-lg fw-600 border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">
                        {formatNgnNumber(calculatePercentage(tots, 7.5))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {!Loading ? (
                <div className="flex justify-between gap-x-12 mt-8">
                  <Button
                    type="button"
                    onClick={() => setViewPrice(false)}
                    className="bg-white text-primary w-full text-lg lg:w-5/12 fw-500"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="bg-primary w-full text-lg fw-500 lg:w-5/12"
                  >
                    Proceed
                  </Button>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceGIForm;
