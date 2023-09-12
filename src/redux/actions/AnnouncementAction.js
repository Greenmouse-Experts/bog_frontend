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
        type: ActionType.ANNOUNCEMENT_ERROR,
        payload
    }
}

export const fetchAnnouncement = (payload) => {
    return {
        type: ActionType.FETCH_ALL_ANNOUNCEMENTS,
        payload
    }
}

export const removeAnnouncement = (payload) => {
    return {
        type: ActionType.DELETE_ANNOUNCEMENT,
        payload
    }
}

export const addAnnouncement = (payload) => {
    return {
        type: ActionType.CREATE_ANNOUNCEMENT,
        payload
    }
}


export const  getAllAnnouncements = (stopLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.get('/announcements/all', config);
            stopLoading();
            dispatch(fetchAnnouncement(response.data))
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

export const deleteAnnouncement = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/announcements/delete-message/${id}`
            await axios.delete(url, config);
            dispatch(removeAnnouncement(id));
            Swal.fire({
                title: "Announcement Deleted",
                text: "Announcement deleted successfully",
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

export const createAnnouncement = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/announcements/new-announcement`
            const response = await axios.post(url, payload, config);
            dispatch(addAnnouncement(response.data));
            saveLoading();
            Swal.fire({
                title: "Announcement Created",
                text: "Announcement Created successfully",
                icon: "success"
            });
        } catch (error) {
            dispatch(setError(error.message));
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
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
 