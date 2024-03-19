/* eslint-disable */
import * as ActionType from '../type';
import axios from '../../config/config';
import toast from 'react-hot-toast';

export const getToken = () => {
    return localStorage.getItem("auth_token")
}

export const loading = () => {
    return {
        type: ActionType.LOADING
    }
}

export const setError = (payload) => {
    return {
        type: ActionType.PROJECT_ERROR,
        payload
    }
}

export const fetchUserNotifications = (payload) => {
    return {
        type: ActionType.FETCH_USER_NOTIFICATIONS,
        payload
    }
}

export const fetchAdminNotifications = (payload) => {
    return {
        type: ActionType.FETCH_ADMIN_NOTIFICATIONS,
        payload
    }
}

export const removeAdminNotifications = (payload) => {
    return {
        type: ActionType.DELETE_ADMIN_NOTIFICATIONS,
        payload
    }
}

export const removeUserNotifications = (payload) => {
    return {
        type: ActionType.DELETE_USER_NOTIFICATIONS,
        payload
    }
}


export const fetchAllUserNotifications = (user, stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            }
            dispatch(loading());
            const response = await axios.get(`/notifications/user/${user.id}?userType=${user.type}`, config);
            dispatch(fetchUserNotifications(response.data))
            stopLoading();
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

export const fetchAllAdminNotifications = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            }
            await axios.get('/notifications/admin', config)
                .then(response => {
                    dispatch(fetchAdminNotifications(response.data));
                    stopLoading();
                });
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                // stopLoading();
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

export const deleteAdminNotification = (id, stopLoading) => {
    return async (dispatch) => {
        try {
            const config = {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': getToken()
                }
            }
            dispatch(loading());
            await axios.delete(`/notifications/delete/${id}`, config);
            stopLoading();
            dispatch(removeAdminNotifications(id))
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

export const deleteUserNotification = (id) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            }
            dispatch(loading());
            const response = await axios.delete(`/notifications/delete/${id}`, config);
            dispatch(removeUserNotifications(id))
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
