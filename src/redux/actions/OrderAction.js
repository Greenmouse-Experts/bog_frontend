import * as ActionType from '../type';
import axios from '../../config/config';
// import Swal from "sweetalert2";
import toast from 'react-hot-toast';

export const loading = () => {
    return {
        type: ActionType.LOADING
    }
}
 
 
// Code by Olatech 

export const setError = (payload) => {
    return {
        type: ActionType.PRODUCT_ERROR,
        payload
    }
}

export const fetchAdminOrder = (payload) => {
    return {
        type: ActionType.FETCH_ADMIN_ORDERS,
        payload
    }
}

export const fetchUserOrder = (payload) => {
    return {
        type: ActionType.FETCH_USER_ORDERS,
        payload
    }
}

export const fetchOrderRequest = (payload) => {
    return {
        type: ActionType.FETCH_ORDER_REQUEST,
        payload
    }
}
 
export const getAdminOrders = (stopLoading) => {
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
            dispatch(loading());
            const response = await axios.get('/orders/all', config);
            stopLoading();
            dispatch(fetchAdminOrder(response.data))
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                stopLoading();
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
 
export const getUserOrders = () => {
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
            dispatch(loading());
            const response = await axios.get('/orders/my-orders', config);
            dispatch(fetchUserOrder(response.data))
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
 
export const getProductOwnerOrders = () => {
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
            dispatch(loading());
            const response = await axios.get('/orders/order-request', config);
            dispatch(fetchOrderRequest(response.data))
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

// Code by Olatech ends here 
 
 