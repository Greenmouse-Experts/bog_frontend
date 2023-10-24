import React, { useState } from "react";
import { DeleteGIDetails } from "../../../../../../redux/actions/ProjectAction";
import Spinner from "../../../../../layouts/Spinner";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

const GIDelete = ({ close, id, refetch }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const saveLoading = () => {
    setLoading(false);
    refetch()
    close();
  };
  const deleteGIPrice = () => {
    setLoading(true);
    dispatch(DeleteGIDetails(id, saveLoading));
  };
  return (
    <div
      className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
      onClick={close}
    >
      <div
        className="bg-white relative px-4 lg:w-4/12 max-h-[500px] rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes className="absolute top-5 right-4" onClick={close} />
        <div>
          <p className="text-center">
            Are you sure you want to delete the Geotechnical Investigation
            Pricing
          </p>
          <div className="mt-6">
            {loading ? (
              <Spinner />
            ) : (
              <div className="flex justify-between">
                <Button color="red" onClick={close}>
                  Cancel
                </Button>
                <Button className="bg-primary" onClick={deleteGIPrice}>Delete</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GIDelete;
