import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import DisableNumInputScroll from "../../../../../widgets/DisableNumberScroll";
import Spinner from "../../../../../layouts/Spinner";
import { useDispatch } from "react-redux";
import { updateGIDetails } from "../../../../../../redux/actions/ProjectAction";
import { FaTimes } from "react-icons/fa";

const GIForm = ({close, data, refetch}) => {
    const [Loading, setLoading] = useState()
    const dispatch = useDispatch()
    const stopLoading = () => {
        setLoading(false)
        refetch()
        close()
    }
    const submitHandler = (value) => {
        setLoading(true);
        const payload = {
            ...value
        };
        dispatch(updateGIDetails(payload, stopLoading))
    }
  const formik = useFormik({
    initialValues: {
      mobilization: data.mobilization || 0,
      demobilization: data.mobilization || 0,
      setup_dismantle_rig: data.setup_dismantle_rig || 0,
      tons_machine: data.tons_machine || 0,
      setup_dismantle_cpt: data.setup_dismantle_cpt || 0,
      depth_of_borehole: data.depth_of_borehole || 0,
      chemical_analysis_of_ground_water: data.chemical_analysis_of_ground_water || 0,
      lab_test: data.lab_test || 0,
      report: data.report || 0,
      lab_test_types: data.lab_test_types || "",
    },
    onSubmit: submitHandler,
    // validationSchema: serviceTypeCategorySchema
  });
  const {
    mobilization,
    demobilization,
    setup_dismantle_rig,
    tons_machine,
    depth_of_borehole,
    setup_dismantle_cpt,
    chemical_analysis_of_ground_water,
    lab_test,
    report,
    lab_test_types,
  } = formik.values;
  return (
    <>
    <DisableNumInputScroll />
      <div
        className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
        onClick={close}
      >
        <div
          className="bg-white relative px-4 lg:w-5/12 max-h-[500px] rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
          onClick={(e) => e.stopPropagation()}
        >
            <FaTimes className="absolute top-5 right-4" onClick={close}/>
            <p className="fw-600 text-xl">Geotechnical Investigation Pricing</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-x-6">
            <div className="mt-5">
              <label className="block">Mobilization</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="mobilization"
                name="mobilization"
                value={mobilization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobilization && formik.errors.mobilization ? (
                <p className="text-red-500">{formik.errors.mobilization}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Demobilization</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="demobilization"
                name="demobilization"
                value={demobilization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.demobilization && formik.errors.demobilization ? (
                <p className="text-red-500">{formik.errors.demobilization}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Borehole Depth</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="depth_of_borehole"
                name="depth_of_borehole"
                value={depth_of_borehole}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.depth_of_borehole && formik.errors.depth_of_borehole ? (
                <p className="text-red-500">{formik.errors.depth_of_borehole}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Borehole/SPT</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="setup_dismantle_rig"
                name="setup_dismantle_rig"
                value={setup_dismantle_rig}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.setup_dismantle_rig && formik.errors.setup_dismantle_rig ? (
                <p className="text-red-500">{formik.errors.setup_dismantle_rig}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Drilling</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="tons_machine"
                name="tons_machine"
                value={tons_machine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tons_machine && formik.errors.tons_machine ? (
                <p className="text-red-500">{formik.errors.tons_machine}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">CPT Pentration</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="setup_dismantle_cpt"
                name="setup_dismantle_cpt"
                value={setup_dismantle_cpt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.setup_dismantle_cpt && formik.errors.setup_dismantle_cpt ? (
                <p className="text-red-500">{formik.errors.setup_dismantle_cpt}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Chemical Analysis</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="chemical_analysis_of_ground_water"
                name="chemical_analysis_of_ground_water"
                value={chemical_analysis_of_ground_water}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.chemical_analysis_of_ground_water && formik.errors.chemical_analysis_of_ground_water ? (
                <p className="text-red-500">{formik.errors.chemical_analysis_of_ground_water}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Laboratory Test</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="lab_test"
                name="lab_test"
                value={lab_test}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lab_test && formik.errors.lab_test ? (
                <p className="text-red-500">{formik.errors.lab_test}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <label className="block">Reports</label>
              <input
                type="number"
                className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
                required
                id="report"
                name="report"
                value={report}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.report && formik.errors.report ? (
                <p className="text-red-500">{formik.errors.report}</p>
              ) : null}
            </div>
            </div>
            <div className="mt-5">
              <label className="block">Report Types</label>
              <textarea
                className="w-full h-24 border border-gray-400 rounded mt-2 p-2"
                required
                id="lab_test_types"
                name="lab_test_types"
                value={lab_test_types}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.lab_test_types && formik.errors.lab_test_types ? (
                <p className="text-red-500">{formik.errors.lab_test_types}</p>
              ) : null}
            </div>
            <div className="mt-8">
              {!Loading? <div className="flex justify-between">
                <Button color="red" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                Edit
              </Button>
              </div> :
              <Spinner/>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GIForm;
