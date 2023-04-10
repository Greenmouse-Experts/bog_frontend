/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import PclientDashboard from "../../../layouts/DashboardHome/pclient";
import AdminDashboard from "../../../layouts/DashboardHome/admin";
import ProductDashboard from "../../../layouts/DashboardHome/pparttner";
import ServiceDashboard from "../../../layouts/DashboardHome/spartner";
import { FinanceAdmin } from "../../../layouts/DashboardHome/finAdmin";
import ProjectAdminDashboard from "../../../layouts/DashboardHome/projectAdmin";
import ProductAdminDashboard from "../../../layouts/DashboardHome/productAdminDashboard";
import { ArticleAdminDashboard } from "../../../layouts/DashboardHome/articleAdmin";

export default function Dashboard() {

  const auth = useSelector((state) => state.auth);

  let dashboard = null;

  if (auth?.user?.userType === "private_client") {
    dashboard = <PclientDashboard />
  }else if(auth?.user?.userType === "corporate_client"){
    dashboard = <PclientDashboard />
  }else if(auth?.user?.userType === "vendor"){
    dashboard = <ProductDashboard />
  }else if(auth?.user?.userType === "professional"){
    dashboard = <ServiceDashboard />
  }else if(auth?.user?.userType === "admin" && auth?.user?.level === 1 ){
    dashboard = <AdminDashboard />
  }else if(auth?.user?.userType === "admin" && auth?.user?.level === 3 ){
    dashboard = <FinanceAdmin />
  }else if(auth?.user?.userType === "admin" && auth?.user?.level === 5 ){
    dashboard = <ProjectAdminDashboard />
  }else if(auth?.user?.userType === "admin" && auth?.user?.level === 4 ){
    dashboard = <ProductAdminDashboard />
  }else if(auth?.user?.userType === "admin" && auth?.user?.level === 2 ){
    dashboard = <ArticleAdminDashboard />
  }
  return dashboard;
}
