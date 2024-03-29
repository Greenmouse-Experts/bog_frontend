import * as ActionType from '../type';
import axios from '../../config/config';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


export const fetchUsers = (payload) => {
    return {
        type: ActionType.FETCH_USERS,
        payload
    }
}

export const fetchUsersAnalyze = (payload) => {
    return {
        type: ActionType.FETCH_ANALYZE_USERS,
        payload
    }
}

export const fetchAdmin = (payload) => {
    return {
        type: ActionType.FETCH_ADMIN,
        payload
    }
}

export const addAdmin = (payload) => {
    return {
        type: ActionType.ADD_ADMIN,
        payload
    }
}

export const removeAdmin = (payload) => {
    return {
        type: ActionType.DELETE_ADMIN,
        payload
    }
}

export const setError = (payload) => {
    return {
        type: ActionType.USER_ERROR,
        payload
    }
}

export const getUsers = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const response = await axios.get('/all/users', config);
            stopLoading();
            dispatch(fetchUsers(response.users))
        } catch (error) {
            stopLoading();
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

export const getUsersAnalyze = (year, stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const response = await axios.get(`/all/users/analyze?y=${year}`, config);
            stopLoading();
            dispatch(fetchUsersAnalyze(response.users))
        } catch (error) {
            stopLoading();
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

export const getAdmins = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const response = await axios.get('/all/admin', config);
            stopLoading();
            dispatch(fetchAdmin(response.users))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                stopLoading();
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

export const createAdmin = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const response = await axios.post('/admin/signup', payload, config);
            dispatch(addAdmin(response.admin));
            saveLoading();
            Swal.fire({
                title: "Admin Created",
                text: "New Admin User Created successfully",
                icon: "success"
            });
        } catch (error) {
            console.log(error.message);
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


export const revokeAdminAccess = (payload) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            await axios.post('/admin/revoke-access', payload, config);
            dispatch(removeAdmin(payload))
        } catch (error) {
            console.log(error.message);
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


