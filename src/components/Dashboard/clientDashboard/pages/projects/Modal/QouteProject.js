import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import { projectBidSchema } from "../../../../../../services/validation";
import { useDispatch, useSelector } from "react-redux";
import { bidForProject } from "../../../../../../redux/actions/ProjectAction";
import Spinner from "../../../../../layouts/Spinner";

const QouteProject = ({ closeModal, project }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState();
  const saveLoading = () => {
    setLoading(false);
    closeModal();
  };

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files[0]);
  };

  const submitHandler = (value) => {
    setLoading(true);
    const fd = new FormData();
    
    fd.append("deliveryTimeLine", value.deliveryTimeLine);
    fd.append("projectCost", value.projectCost);
    fd.append("reasonOfInterest", value.reasonOfInterest);
    fd.append("description", value.description);
    fd.append("projectId", project.project.id);
    fd.append("userId", user.profile.userId);
    fd.append(`image`, photos)
    dispatch(bidForProject(fd, saveLoading));
  };

  const formik = useFormik({
    initialValues: {
      deliveryTimeLine: "",
      reasonOfInterest: "",
      projectCost: "",
      description: "",
    },
    onSubmit: submitHandler,
    validationSchema: projectBidSchema,
  });

  const { deliveryTimeLine, projectCost, description } = formik.values;

  return (
    <div
      className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
      onClick={closeModal}
    >
      <div
        className="bg-white px-4 lg:w-5/12 rounded-md max-h-103 overflow-y-auto overscroll-none  w-11/12 pt-6 pb-10 lg:px-8 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between lg:mt-3">
          <div>
            <p className="lg:text-xl fw-600">Project Interest Form</p>
            <p className="fs-400 mt-2">
              With the details contained in the view form, fill and submit the
              document below to show interest.(Note that this project is
              available for 24hours)
            </p>
          </div>
          <FaTimes
            className="cursor-pointer text-red-600 mb-4"
            onClick={closeModal}
          />
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <div className="mt-3">
              <label>
                1. What is your best price for rendering your service on this
                project
              </label>
              <input
                className="mt-3 w-full p-2 rounded border border-gray-400"
                type="number"
                id="projectCost"
                name="projectCost"
                value={projectCost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.projectCost && formik.errors.projectCost ? (
                <p className="text-red-500">{formik.errors.projectCost}</p>
              ) : null}
            </div>
            <div className="mt-3">
              <label>
                2. How soon can you deliver this project? (Give answer in weeks)
              </label>
              <input
                type="number"
                className="mt-3 w-full p-2 rounded border border-gray-400"
                id="deliveryTimeLine"
                name="deliveryTimeLine"
                value={deliveryTimeLine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.deliveryTimeLine &&
              formik.errors.deliveryTimeLine ? (
                <p className="text-red-500">{formik.errors.deliveryTimeLine}</p>
              ) : null}
            </div>
            <div className="mt-3">
              <label>3. What is your interest on this project?</label>
              <div className="flex">
                <div className="mt-1 w-6/12">
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Quantity Surveyor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Quantity Surveyor</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Architect"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Architect</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Structural Engineer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Structural Engineer</p>
                  </div>
                </div>
                <div className="mt-1 w-6/12">
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Electrical Engineer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Electrical Engineer</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Mechanical Engineer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Mechanical Engineer</p>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="reasonOfInterest"
                      id="reasonOfInterest"
                      value="Contractor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="pl-2">Contractor</p>
                  </div>
                  {formik.touched.reasonOfInterest &&
                  formik.errors.reasonOfInterest ? (
                    <p className="text-red-500">
                      {formik.errors.reasonOfInterest}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label>4. Brief description on your work plan</label>
              <textarea
                id="description"
                value={description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-3 w-full p-2 rounded border border-gray-400 h-24"
              ></textarea>
            </div>
            <div className="mt-3">
              <label>5. Supporting Files</label>
              <input
                type="file"
                name="photos"
                className="mt-3 w-full p-2 rounded border border-gray-400"
                onChange={(e) => handlePhotoChange(e)}
              />
            </div>
            <div className="mt-10 flex justify-between">
              <Button className="bg-secondary lg:px-12" onClick={closeModal}>
                Close
              </Button>
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  className="bg-primary lg:px-12"
                  type="submit"
                  onClick={() => submitHandler(formik.values)}
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QouteProject;
