import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
// import DisableNumInputScroll from "../../../../../widgets/DisableNumberScroll";
// import Spinner from "../../../../../layouts/Spinner";
import { useDispatch } from "react-redux";
// import { updateGIDetails } from "../../../../../../redux/actions/ProjectAction";
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

const ServiceGIForm = ({ close }) => {
  const [Loading, setLoading] = useState();
  const [viewPrice, setViewPrice] = useState(false);
  // pricing state
  const [sptOne, setSptOne] = useState(0);
  const [sptTwo, setSptTwo] = useState(0);
  const [cptOne, setCptOne] = useState(0);
  const [cptTwo, setCptTwo] = useState(0);
  const [chem, setChem] = useState(0);
  const [tots, setTots] = useState(0)
  const [totals, setTotals] = useState(0);
  const { loading, data, refetch } = useFetchHook(
    "/projects/geotechnical-investigation/metadata/view"
  );
  const dispatch = useDispatch();
  const stopLoading = () => {
    setLoading(false);
  };
  const submitHandler = (value) => {
    setLoading(true);
    const payload = {
      ...value,
      setup_dismantle_rig_amt: Number(data.setup_dismantle_rig),
      drilling_spt_amt: Number(data.depth_of_borehole),
      drilling_spt_qty: formik.values.setup_dismantle_rig_qty,
      setup_dismantle_cpt_amt: Number(data.setup_dismantle_cpt),
      dutch_cpt_amt: Number(data.tons_machine),
      dutch_cpt_qty: formik.values.setup_dismantle_cpt_qty,
      chemical_analysis_of_ground_water_amt: Number(data.chemical_analysis_of_ground_water),
      total: totals
    };
    console.log(payload);
    // dispatch(updateGIDetails(payload, stopLoading))
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
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
    location,
    setup_dismantle_rig_amt,
    setup_dismantle_rig_qty,
    drilling_spt_amt,
    drilling_spt_qty,
    setup_dismantle_cpt_amt,
    setup_dismantle_cpt_qty,
    dutch_cpt_amt,
    dutch_cpt_qty,
    chemical_analysis_of_ground_water_amt,
    chemical_analysis_of_ground_water_qty,
    total,
  } = formik.values;
  const handleShowPrice = () => {
    handleCalculation()
    if(name && location && setup_dismantle_rig_qty >= 1 && setup_dismantle_cpt_qty >= 1 && chemical_analysis_of_ground_water_qty >= 1){
      setViewPrice(true);
    }else{
      toast.error("Fill the available fields", {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
  const handleCalculation = () => {
    if (!data) {
      return
      // return toast.error("Data not available yet", {
      //   duration: 6000,
      //   position: "top-center",
      //   style: { background: "#BD362F", color: "white" },
      // });
    }
    setSptOne(
      formik.values.setup_dismantle_rig_qty *
        parseFloat(data.setup_dismantle_rig)
    );
    setSptTwo(
      formik.values.setup_dismantle_rig_qty * parseFloat(data.depth_of_borehole)
    );
    setCptOne(
      formik.values.setup_dismantle_cpt_qty *
        parseFloat(data.setup_dismantle_cpt)
    );
    setCptTwo(
      formik.values.setup_dismantle_cpt_qty * parseFloat(data.tons_machine)
    );
    setChem(
      formik.values.chemical_analysis_of_ground_water_qty *
        parseFloat(data.chemical_analysis_of_ground_water)
    );
    setTots(addValues(
      sptOne,
      sptTwo,
      cptOne,
      cptTwo,
      chem,
      data.mobilization,
      data.demobilization,
      data.lab_test,
      data.report
    ))
    setTotals(
      calculatePercentage(tots, 7.5)
    );
  };
  useEffect(() => {
    handleCalculation()
  }, [formik.values])
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
          <form onSubmit={formik.handleSubmit}>
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
                  id="location"
                  name="location"
                  value={location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.location && formik.errors.location ? (
                  <p className="text-red-500">{formik.errors.location}</p>
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
              <div>
                <p>Total Price</p>
                <div>
                  <p className="">{formatNgnNumber(totals)}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              {!Loading ? (
                <div className="flex justify-between gap-x-12">
                  <Button
                    type="button"
                    onClick={handleShowPrice}
                    className="bg-white text-primary w-full text-lg fw-500"
                  >
                    View Pricing
                  </Button>
                  <Button
                    type="submit"
                    // onClick={handleCalculation}
                    className="bg-primary w-full text-lg fw-500"
                  >
                    Submit
                  </Button>
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
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">LS</td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">{formatNumber(data.mobilization)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left py-2">Allow for demobilization of ditto.</td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">LS</td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 px-2 text-left">{formatNumber(data.demobilization)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">BOREHOLE/SPT</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">Set-up and dismantle rig at each test point.</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formik.values.setup_dismantle_rig_qty}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">Nr</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.setup_dismantle_rig)}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(sptOne)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Drill each borehole to maximum depth of 30m, taking
                        samples at 1.0m depth and change of strata. Also taking
                        SPT at 1.5m advance into the borehole within
                        cohesionless strata.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formik.values.setup_dismantle_rig_qty}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">Nr</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.depth_of_borehole)}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(sptTwo)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">CONE PENETRATION TEST</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Set-up and dismantle CPT machine at each test point.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formik.values.setup_dismantle_cpt_qty}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">Nr</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.setup_dismantle_cpt)}</td>
                      <td>{formatNumber(cptOne)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left">
                        Dutch Cone Penetrometer test conducted to refusal using
                        10 Tons Machine.
                      </td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formik.values.setup_dismantle_cpt_qty}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">Nr</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.tons_machine)}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(cptTwo)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">CHEMICAL ANALYSIS OF GROUND WATER</td>
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
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">Nr</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.chemical_analysis_of_ground_water)}</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(chem)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-2 fw-600 text-left">LABORATORY TEST</td>
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
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">LS</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td>{formatNumber(data.lab_test)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">REPORTS</td>
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
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">LS</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNumber(data.report)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">SUBTOTAL</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNgnNumber(tots)}</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">VAT</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">7.5%</td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left"></td>
                      <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 text-left">{formatNgnNumber(getPercentage(totals, 7.5))}</td>
                    </tr>
                    <tr >
                      <td className="border-b border-gray-200 align-middle fs-500 py-2 px-2 text-left fw-600">TOTAL</td>
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceGIForm;
