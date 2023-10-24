import React, { useState } from "react";
import GIForm from "./GIForm";
import useFetchHook from "../../../../../../hooks/useFetchHook";
import { formatNgnNumber } from "../../../../../../services/helper";
import Spinner from "../../../../../layouts/Spinner";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import GIDelete from "./GIDelete";

const GIDisplay = () => {
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [delForm, setDelForm] = useState(false);
  const { loading, data, refetch } = useFetchHook(
    "/projects/geotechnical-investigation/metadata/view"
  );
  const [activeData, setActiveData] = useState("");
  const [passedData, setPassedData] = useState("");
  const handleActiveData = (id) => {
    setActiveData(id);
    const filter = data.filter((where) => where.id === id);
    setPassedData(filter[0]);
  };
  const DisplayData = (data) => {
    return (
      <div className="mt-4">
        <div className="flex gap-x-4">
          <p className="fw-500">Mobilization:</p>
          <p>
            {data?.data.mobilization &&
              formatNgnNumber(data?.data.mobilization)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Demobilization:</p>
          <p>
            {data?.data.demobilization &&
              formatNgnNumber(data?.data.demobilization)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Depth of Borehole:</p>
          <p>{data?.data.depth_of_bh && `${data?.data.depth_of_bh}m`}</p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Borehole/SPT:</p>
          <p>
            {data?.data.setup_dismantle_rig &&
              formatNgnNumber(data?.data.setup_dismantle_rig)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Drilling of Borehole:</p>
          <p>
            {data?.data.depth_of_borehole_amt &&
              formatNgnNumber(data?.data.depth_of_borehole_amt)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">CPT Machine Setup:</p>
          <p>
            {data?.data.tons_machine &&
              formatNgnNumber(data?.data.tons_machine)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Dutch Cone Penetrometer:</p>
          <p>
            {data?.data.setup_dismantle_cpt &&
              formatNgnNumber(data?.data.setup_dismantle_cpt)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Chemical Analysis:</p>
          <p>
            {data?.data.chemical_analysis_of_ground_water &&
              formatNgnNumber(data?.data.chemical_analysis_of_ground_water)}
          </p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Laboratory Test:</p>
          <p>{data?.data.lab_test && formatNgnNumber(data?.data.lab_test)}</p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500">Reports:</p>
          <p>{data?.data.report && formatNgnNumber(data?.data.report)}</p>
        </div>
        <div className="flex gap-x-4 mt-4">
          <p className="fw-500 whitespace-nowrap">Types of Test:</p>
          <p>{data?.data.report && data.data.lab_test_types}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading && <Spinner />}
      {data && (
        <div className="lg:p-5 pt-5">
          <div className="lg:flex items-center justify-between">
            <p className="fs-700 lg:text-xl fw-500">
              Geotechnical Investigation Pricing
            </p>
            <button
              className="btn-primary flex gap-x-2 mt-2 lg:mt-0 items-center"
              onClick={() => setShowForm(true)}
            >
              <FaPlus />
              Add New
            </button>
          </div>
          <div>
            <div className="mt-4">
              <ul className="flex w-full overflow-x-auto gap-x-4">
                {data
                  .sort((a, b) =>
                    a.createdAt.localeCompare(b.createdAt, undefined, {
                      numeric: true,
                    })
                  )
                  .map((item, i) => (
                    <li
                      key={i}
                      className={`text-lg px-4 fw-600 whitespace-nowrap border-b-[6px] cursor-pointer ${
                        item.id === activeData
                          ? "border-blue-800 text-primary"
                          : "border-gray-500 text-gray-500"
                      }`}
                      onClick={() => handleActiveData(item.id)}
                    >
                      {`${item.min_qty_bh}-${item.max_qty_bh} bh`}
                      <span className="pl-2 text-gray-600">
                        {item.depth_of_bh}m
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              {activeData !== "" && (
                <>
                  <div className="flex gap-x-4">
                    <button
                      className="btn-primary flex gap-x-2 items-center mt-6 lg:mt-10"
                      onClick={() => setEditForm(true)}
                    >
                      <MdEdit />
                      Edit Pricing
                    </button>
                    <button
                      className=" bg-secondary px-2 py-1 rounded-lg text-white fw-500 flex gap-x-2 items-center mt-6 lg:mt-10"
                      onClick={() => setDelForm(true)}
                    >
                      <RiDeleteBin5Line className="text-lg" />
                      Delete Pricing
                    </button>
                  </div>
                  <DisplayData data={passedData} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <GIForm close={() => setShowForm(false)} refetch={refetch} />
      )}
      {editForm && (
        <GIForm
          close={() => setEditForm(false)}
          data={passedData}
          refetch={refetch}
        />
      )}
      {delForm && (
        <GIDelete
          id={passedData.id}
          refetch={refetch}
          close={() => setDelForm(false)}
        />
      )}
    </>
  );
};

export default GIDisplay;
