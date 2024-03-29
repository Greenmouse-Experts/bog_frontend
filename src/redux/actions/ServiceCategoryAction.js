/* eslint-disable */
import * as ActionType from '../type';
import axios from '../../config/config';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

export const loading = () => {
    return {
        type: ActionType.LOADING
    }
}
 
export const setError = (payload) => {
    return {
        type: ActionType.SERVICE_CATEGORY_ERROR,
        payload
    }
}

export const fetchCategory = (payload) => {
    return {
        type: ActionType.FETCH_SERVICE_CATEGORY,
        payload
    }
}

export const fetchServiceForm = (payload) => {
    return {
        type: ActionType.FETCH_SERVICE_FORMS,
        payload
    }
}

export const removeCategory = (payload) => {
    return {
        type: ActionType.DELETE_SERVICE_CATEGORY,
        payload
    }
}

export const addCategory = (payload) => {
    return {
        type: ActionType.CREATE_SERVICE_CATEGORY,
        payload
    }
}

export const editCategory = (payload) => {
    return {
        type: ActionType.UPDATE_SERVICE_CATEGORY,
        payload
    }
}


export const getAllServiceCategories = (stopLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.get('/services/all', config);
            // stopLoading();
            dispatch(fetchCategory(response.data))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                // stopLoading();
                dispatch(setError(error.message));
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const deleteServiceCategories = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/services/delete/${id}`
            const response = await axios.delete(url, config);
            dispatch(removeCategory(id));
            Swal.fire({
                title: "Service Deleted",
                text: "Service Category deleted successfully",
                icon: "success"
            })
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const createServiceCategory = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/services/create`
            const response = await axios.post(url, payload, config);
            dispatch(addCategory(response.data));
            saveLoading();
            Swal.fire({
                title: "Service Category Created",
                text: "Service Category Created successfully",
                icon: "success"
            })
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const updateServiceCategory = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/services/update/${payload.id}`
            const response = await axios.patch(url, payload, config);
            dispatch(editCategory(payload));
            saveLoading();
            Swal.fire({
                title: "Service Category updated",
                text: "Service Category updated successfully",
                icon: "success"
            })
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}


export const createServiceForm = (payload, saveLoading, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/service/form-builder/create`
            const response = await axios.post(url, payload, config);
            dispatch(addCategory(response.data));
            saveLoading();
            Swal.fire({
                title: "Service Form Created",
                text: "Service Form Built successfully",
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    navigate('/dashboard/service-provider');
                }
            })
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

 
export const getServiceFormBuilder = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.get(`/service/form-builder/${id}`, config);
            dispatch(fetchServiceForm(response.data))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}
