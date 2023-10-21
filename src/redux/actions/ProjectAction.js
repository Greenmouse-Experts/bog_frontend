/* eslint-disable */
import * as ActionType from "../type";
import axios from "../../config/config";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Axios from "../../config/config";

export const loading = () => {
  return {
    type: ActionType.LOADING,
  };
};

export const setError = (payload) => {
  return {
    type: ActionType.PROJECT_ERROR,
    payload,
  };
};

export const fetchProjects = (payload) => {
  return {
    type: ActionType.FETCH_ALL_PROJECTS,
    payload,
  };
};

export const fetchMyProject = (payload) => {
  return {
    type: ActionType.FETCH_MY_PROJECTS,
    payload,
  };
};

export const fetchServices = (payload) => {
  return {
    type: ActionType.FETCH_ALL_SERVICES,
    payload,
  };
};

export const removeService = (payload) => {
  return {
    type: ActionType.DELETE_SERVICE,
    payload,
  };
};

export const addService = (payload) => {
  return {
    type: ActionType.CREATE_SERVICE,
    payload,
  };
};

export const editService = (payload) => {
  return {
    type: ActionType.UPDATE_SERVICE,
    payload,
  };
};

export const editProject = (payload) => {
  return {
    type: ActionType.UPDATE_PROJECT,
    payload,
  };
};

export const approveProject = (payload) => {
  return {
    type: ActionType.APPROVE_PROJECT,
    payload,
  };
};

export const fetchDispatchedProjects = (payload) => {
  return {
    type: ActionType.FETCH_DISPATCHED_PROJECTS,
    payload,
  };
};

export const fetchAssignedProjects = (payload) => {
  return {
    type: ActionType.FETCH_ASSIGNED_PROJECTS,
    payload,
  };
};

export const fetchCommitmentFee = (payload) => {
  return {
    type: ActionType.FETCH_COMMITMENT_FEE,
    payload,
  };
};

export const saveRole = (payload) => {
  return {
    type: ActionType.SAVE_ROLE,
    payload,
  };
};

export const fetchSelectedPartners = (payload) => {
  return {
    type: ActionType.FETCH_SELECTED_PARTNERS,
    payload,
  };
};

export const assignProject = (payload) => {
  return {
    type: ActionType.ASSIGN_PROJECT,
    payload,
  };
};

export const removeProject = (payload) => {
  return {
    type: ActionType.DELETE_PROJECT,
    payload,
  };
};

export const getDeliveryAddresses = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const url = `/address/view/all`;
      const response = await axios.get(url, config);
      dispatch(fetchMyProject(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getProjectAnalyze = (year) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const url = `projects/analyze?y=${year}`;
      const response = await axios.get(url, config);
      dispatch(fetchMyProject(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getMyProject = (userType, navigate, stopLoading) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const url =
        userType === "professional"
          ? `/projects/service-request?userType=${userType}`
          : `/projects/my-request?userType=${userType}`;
      const response = await axios.get(url, config);
      stopLoading();
      dispatch(fetchMyProject(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        navigate("/");
      } else {
        stopLoading();
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const fetchServiceCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const response = await axios.get("/service/type", config);
      dispatch(fetchServices(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const deleteServiceCategory = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const url = `/service/type/delete/${id}`;
      const response = await axios.delete(url, config);
      dispatch(removeService(id));
      Swal.fire({
        title: "Service Deleted",
        text: "Service Type deleted successfully",
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const createServiceCategory = (payload, saveLoading) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("auth_token"),
        },
      };
      const url = `/service/type/create`;
      const response = await axios.post(url, payload, config);
      dispatch(addService(response.data));
      saveLoading();
      Swal.fire({
        title: "Service Created",
        text: "Service Type Created successfully",
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        saveLoading();
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const updateServiceCategory = (payload, saveLoading) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const url = `/service/type/update`;
      const response = await axios.patch(url, payload, config);
      dispatch(editService(payload));
      saveLoading();
      Swal.fire({
        title: "Service updated",
        text: "Service Type updated successfully",
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        saveLoading();
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getProjects = (stopLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const response = await axios.get("/projects/v2/all", config);
      stopLoading();
      dispatch(fetchProjects(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        stopLoading();
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const commenceProject = (projectId, payload) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const response = await axios.patch(
        "/projects/request-for-approval/" + projectId,
        payload,
        config
      );
      const editPayload = {
        projectId,
      };
      dispatch(editProject(editPayload));
      Swal.fire({
        title: "Review Sent",
        text: "Project sent for review",
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const approveProjectToStart = (payload) => {
  return async (dispatch) => {
    try {
      const { projectId, isApproved } = payload;
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const body = {
        approvalStatus: "approved",
        status: "approved",
        isApproved,
      };
      const response = await axios.patch(
        "/projects/approve-project/" + projectId,
        body,
        config
      );
      dispatch(approveProject(payload));
      Swal.fire({
        title: "Approved",
        text: `Project ${isApproved ? "Approved" : "Disapproved"} Successfully`,
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getDispatchedProjects = (userId, stopLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const response = await axios.get(
        `/projects/dispatched-projects/${userId}`,
        config
      );
      dispatch(fetchDispatchedProjects(response.data));
      stopLoading();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        stopLoading();
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getServicePartnerProjects = (userId, stopLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const response = await axios.get(
        `/projects/assigned-projects/${userId}`,
        config
      );
      dispatch(fetchAssignedProjects(response.data));
      stopLoading();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        stopLoading();
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getSelectedPartners = (score, projectId, stopLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const body = {
        rating: score.score,
      };
      const response = await axios.put(
        "/projects/list-providers/" + projectId,
        body,
        config
      );
      stopLoading();
      dispatch(fetchSelectedPartners(response.data.providerData));
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        stopLoading();
        dispatch(setError(errorMsg));
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const DispatchProject = (projectId, partners) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      // dispatch(loading());
      const response = await axios.put(
        "/projects/v2/dispatch-project/" + projectId,
        partners,
        config
      );
      Swal.fire({
        title: "Project Dispatched",
        text: `Project has been dispatched Successfully`,
        icon: "success",
      });
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(errorMsg));
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const commitmentFee = (payload) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const response = await axios.post(
        "/fees/update-commitment",
        payload,
        config
      );
      Swal.fire({
        title: "Commitment Fee Set",
        text: `Commitment Fee set Successfully`,
        icon: "success",
        confirmButtonColor: "#3f79ad",
      });
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(errorMsg));
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const getCommitmentFee = () => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      dispatch(loading());
      const response = await axios.get(`/fees/commitment`, config);
      dispatch(fetchCommitmentFee(response.data));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(error.message));
        toast.error(error.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const bidForProject = (payload, saveLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      };
      await axios.post("/projects/bid-project", payload, config);
      saveLoading();
      Swal.fire({
        title: "Done",
        text: `Admin will get back you`,
        icon: "success",
      });
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(errorMsg));
        saveLoading();
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const assignProjectToPartner = (payload, saveLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const response = await axios.post(
        "/projects/assign-project",
        payload,
        config
      );
      dispatch(assignProject(payload.projectId));
      saveLoading();
      Swal.fire({
        title: "Done",
        text: `Project assigned to partner`,
        icon: "success",
      });
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      dispatch(setError(errorMsg));
      saveLoading();
      toast.error(errorMsg, {
        duration: 6000,
        position: "top-center",
        style: { background: "#BD362F", color: "white" },
      });
    }
  };
};

export const deleteUserProject = (id, stopLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      // dispatch(loading());
      const response = await axios.delete(`/projects/delete/${id}`, config);
      stopLoading();
      dispatch(removeProject(id));
      Swal.fire({
        title: "Done",
        text: "Project Deleted Successfully!",
        icon: "success",
      });
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        stopLoading();
        dispatch(setError(errorMsg));
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const createGIDetails = (payload, saveLoading) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const res = await Axios.post(
        "/projects/geotechnical-investigation/metadata",
        payload,
        config
      );
      saveLoading();
      if (res.success) {
        toast.success(res.message, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(errorMsg));
        saveLoading();
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};

export const updateGIDetails = (payload, saveLoading, openPay) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("auth_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      };
      const res = await Axios.post(
        "/projects/geotechnical-investigation/verification",
        payload,
        config
      );
      saveLoading();
      if (res.success) {
        openPay(payload);
      }
    } catch (error) {
      let errorMsg = error?.response?.data?.message || error.message;
      if (errorMsg === "Request failed with status code 401") {
        window.location.href = "/";
      } else {
        dispatch(setError(errorMsg));
        saveLoading();
        toast.error(errorMsg, {
          duration: 6000,
          position: "top-center",
          style: { background: "#BD362F", color: "white" },
        });
      }
    }
  };
};
