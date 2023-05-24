import {
  Breadcrumbs,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getStatus } from "../../../../services/helper";

export const PartnerPayment = () => {
  return (
    <div>
      <div className="min-h-screen fs-500 relative">
        <div className="w-full py-8 bg-white px-4">
          <p className="text-2xl fw-600">Payment For Partners</p>
          <p className="fs-400 text-gray-600 mt-2">
            Approve and decline partner's payment initiated by the sub-admins.
          </p>
          <Breadcrumbs className="bg-white pl-0 mt-4">
            <Link to="/" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link to="/dashboard" className="opacity-60">
              <span>Dashboard</span>
            </Link>
            <Link to="" className="">
              <span>Partner Payout</span>
            </Link>
          </Breadcrumbs>
        </div>
        {/* notifications */}
        <div className="lg:p-5 px-2 py-4">
          <div className="bg-white p-6 rounded">
            <div className="overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light rounded-lg bg-light">
                <tr>
                    <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">S/N</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Project/Order ID</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Description</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Total Amount</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Paying Amount</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Date Created</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Super-Admin</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Finance-Admin</th>
                  <th className="px-2 align-middle fw-600 py-3 text-primary whitespace-nowrap text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">1</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">BOG/ORD/456849</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">First installment payment</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">₦300,000</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">₦120,000</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">23-05-2023</td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left"><p>{getStatus("pending")}</p></td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left"><p>{getStatus("pending")}</p></td>
                  <td className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                    <Menu placement="left-start" className="w-16">
                      <MenuHandler>
                        <Button className="p-0 m-0 bg-transparent shadow-none text-blue-800 hover:shadow-none">
                          <BsThreeDotsVertical className="text-2xl" />
                        </Button>
                      </MenuHandler>

                      <MenuList>
                        <MenuItem>Approve</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
