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
        type: ActionType.POST_ERROR,
        payload
    }
}

export const fetchPost = (payload) => {
    return {
        type: ActionType.FETCH_ALL_POSTS,
        payload
    }
}

export const removePost = (payload) => {
    return {
        type: ActionType.DELETE_POST,
        payload
    }
}

export const addPost = (payload) => {
    return {
        type: ActionType.CREATE_POST,
        payload
    }
}

export const editPost = (payload) => {
    return {
        type: ActionType.UPDATE_POST,
        payload
    }
}

export const getCategory = (payload) => {
    return {
        type: ActionType.FETCH_POST_CATEGORY,
        payload
    }
}

export const getAllBlogCategories = () => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.get('/blog/get-categories', config);
            console.log(response);
            dispatch(getCategory(response.data))
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

export const  getAllBlogPosts = (stopLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.get('/blog/get-blogs', config);
            stopLoading();
            // console.log(response);
            dispatch( fetchPost(response.data))
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

export const deleteBlogPost = (id) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/blog/delete/${id}`
            const response = await axios.delete(url, config);
            console.log(response);
            dispatch(removePost(id));
            Swal.fire({
                title: "Post Deleted",
                text: "Post deleted successfully",
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

export const createBlogPost = (payload, saveLoading, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/blog/create-new`
            const response = await axios.post(url, payload, config);
            console.log(response);
            dispatch(addPost(response.data));
            saveLoading();
            Swal.fire({
                title: "Blog Post Created",
                text: "Blog Post Created successfully",
                icon: "success"
            }).then(() => {
                navigate("/dashboard/blog");
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

export const updateBlogPost = (payload, saveLoading, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const url = `/blog/update`
            const response = await axios.patch(url, payload, config);
            console.log(response);
            // dispatch(editPost(payload));
            saveLoading();
            Swal.fire({
                title: "Blog Post updated",
                text: "Blog Post updated successfully",
                icon: "success"
            }).then(() => {
                navigate("/dashboard/blog");
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

 