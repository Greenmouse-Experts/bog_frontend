import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaFileDownload,
} from "react-icons/fa";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { formatNumber, getStatus } from "../../../../services/helper";
import { cutText } from "../../../../services/helper";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../layouts/Spinner";
import { getToken } from "../../../../redux/actions/notifications";
import axios from "axios";
import toast from "react-hot-toast";

// export table files

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    // XLSX example

    const header = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }
  //PDF example
  if (fileType === "pdf") {
    const headerNames = columns // eslint-disable-next-line
      .filter((c) => c.Header != "Action")
      .map((column) => column.exportValue);
    const doc = new jsPDF();
    doc.autoTable({
      head: [headerNames],
      body: data,
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 11,
      },
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }

  // Other formats goes here
  return false;
}

export function PayoutTableProduct({ payout, refetch }) {
  const navigate = useNavigate();
  const gotoDetailsPage = (id) => {
    navigate(`/dashboard/orderadmindetail?productId=${id}`);
  };
  const admin = useSelector((state) => state.auth.user);
  const [uploadModal, setUploadModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [uploadFile, setUploadFile] = useState();
  const [selected, setSelected] = useState("");
  const [details, setDetails] = useState()
  const [loading, setLoading] = useState(false);
  const openUpload = (item) => {
    setSelected(item);
    setUploadModal(true);
  };
  const openDetails = (item) => {
    setDetails(item);
    setDetailModal(true);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("image", uploadFile);
    axios
      .post("https://api.buildonthego.com/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const payload = {
          trx_proof: res.data[0],
        };
        axios
          .post(
            `https://api.buildonthego.com/api/transaction/save-proof/${selected}`,
            payload,
            {
              header: {
                Authorization: getToken(),
              },
            }
          )
          .then((res) => {
            setLoading(false);
            setUploadModal(false);
            refetch()
            toast.success(res.data.message, {
              duration: 6000,
              position: "top-center",
              style: { background: "green", color: "white" },
            });
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message, {
              duration: 6000,
              position: "top-center",
              style: { background: "#BD362F", color: "white" },
            });
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: (row, index) => index + 1, //RDT provides index by default
      },
      {
        Header: "Project/Order ID",
        accessor: "orderSlug",
        Cell: (row) => (
          <p onClick={() => gotoDetailsPage(row.row.original.orderId)}>
            {row.value}
          </p>
        ),
      },
      {
        Header: "Description",
        accessor: "transaction.description",
        Cell: (props) => cutText(props.value, 28),
      },
      {
        Header: "Paying Amount",
        accessor: "transfer.amount",
        Cell: (props) => props.value && `NGN ${formatNumber(props.value)}`,
      },
      {
        Header: "Date Created",
        accessor: "createdAt",
        Cell: (props) => dayjs(props.value).format("DD-MM-YYYY"),
      },
      {
        Header: "Payout Receipt",
        accessor: "trx_proof",
        Cell: (props) =>
          props.value ? (
            <a href={props.value} target="_blank" className="block text-blue-700 fs-400 text-center rounded-lg border border-blue-700">
              View Receipt
            </a>
          ) : (
            <p className="text-orange-700 fs-400 text-center rounded-lg border border-orange-700">
              Not Paid
            </p>
          ),
      },
      // {
      //   Header: "Finance-Admin",
      //   accessor: "financialadmin",
      //   Cell: (props) => props.value? getStatus("approved") : getStatus("pending")
      // },
      ...(admin?.level === 3
        ? [
            {
              Header: "Action",
              accessor: "id",
              Cell: (row) => (
                <Menu placement="left-start" className="w-16">
                  <MenuHandler>
                    <Button className="border-none bg-transparent shadow-none hover:shadow-none text-black">
                      <p className="lg:text-xl">
                        <BsThreeDotsVertical />
                      </p>
                    </Button>
                  </MenuHandler>
                  <MenuList className="w-16 bg-gray-100 fw-600 text-black">
                    <MenuItem
                      className="bg-green-600 hover:bg-red-500 text-white text-center"
                      onClick={() => openUpload(row.value)}
                    >
                      Upload Receipt
                    </MenuItem>
                    <MenuItem
                      className=" text-center"
                      onClick={() => openDetails(row.cell.row.original.transfer)}
                    >
                      View Account Details
                    </MenuItem>
                  </MenuList>
                </Menu>
              ),
            },
          ]
        : [
            {
              Header: "",
              accessor: "ids",
            },
          ]),
    ], // eslint-disable-next-line
    []
  );

  const sortedData = payout?.sort((b, a) => a.createdAt.localeCompare(b.createdAt));

  const data = useMemo(() => sortedData, [sortedData]);

  return (
    <>
      <div className="overflow-hidden px-4 bg-white py-8 rounded-md">
        <Table columns={columns} data={data} className="" />
      </div>
      {uploadModal && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={() => setUploadModal(false)}
        >
          <div
            className="bg-white px-4 lg:w-5/12 rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-6 text-center fw-600 text-xl">
              Add Proof of Payment
            </p>
            <form onSubmit={handleUpload}>
              <div>
                <p>Receipt File</p>
                <input
                  type="file"
                  className="w-full p-2 rounded border border-gray-400 mt-2"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                />
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  className="btn bg-red-500 lg:px-7 text-white"
                  onClick={() => setUploadModal(false)}
                >
                  Cancel
                </button>{" "}
                &nbsp;
                {loading ? (
                  <Spinner />
                ) : (
                  <button className="btn-primary lg:px-7">Submit</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {detailModal && (
        <div
          className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
          onClick={() => setDetailModal(false)}
        >
          <div
            className="bg-white px-4 lg:w-5/12 rounded-md overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-6 text-center fw-600 text-xl">
              Bank Account Details
            </p>
            <div className="grid gap-3">
              <div className="flex items-center gap-x-2">
                <p>Bank Name:</p>
                <p>{details?.bank_name}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <p>Account Name:</p>
                <p>{details?.account_name}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <p>Account Number:</p>
                <p>{details?.account_number}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex items-center h-9 overflow-hidden  lg:w-64  rounded-md">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="px-2 py-1 h-full border-2 border-gray-400 rounded-l-md w-10/12  outline-none"
      />
      <p className="w-2/12 h-full center-item rounded-r-md bg-primary ">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-xl py-1 rounded-r-md bg-primary text-white text-center"
        />
      </p>
    </div>
  );
}

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    exportData,
  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useExportData
  );
  return (
    <>
      <div className="flex items-center mb-5 justify-between">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="flex">
          <Menu>
            <MenuHandler>
              <Button className="p-0 m-0 bg-transparent shadow-none text-blue-800 hover:shadow-none flex items-center">
                {" "}
                Export <FaFileDownload className="text-2xl" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem
                onClick={() => {
                  exportData("csv", true);
                }}
              >
                Export as CSV
              </MenuItem>
              <MenuItem
                onClick={() => {
                  exportData("xlsx", true);
                }}
              >
                Export as Excel
              </MenuItem>
              <MenuItem
                onClick={() => {
                  exportData("pdf", true);
                }}
              >
                Export as PDF
              </MenuItem>
            </MenuList>
          </Menu>
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div
                  className="fs-500 px-3 py-2 rounded-md bg-light"
                  key={column.id}
                >
                  <label for={column.id} className="fw-600 ">
                    {column.render("Header")}:{" "}
                  </label>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="items-center w-full bg-transparent border-collapse"
              >
                <thead className="thead-light bg-light">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-2 text-primary align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap text-left"
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white" {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination mt-8 flex justify-between items-center">
        <div>
          <span>
            Page{" "}
            <strong>
              {state.pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="border border-gray-400 px-2 p-1 text-xl"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft />
          </button>{" "}
          <button
            className="border border-gray-400 px-2 p-1 text-xl"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FaAngleLeft />
          </button>{" "}
          <button
            className="border border-gray-400 px-2 p-1 text-xl"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FaAngleRight />
          </button>{" "}
          <button
            className="border border-gray-400 px-2 p-1 text-xl"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </>
  );
};

// dropdown filter for table

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="bg-light outline-none"
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
