import * as ActionType from '../type';
import axios from '../../config/config';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
// import setAuthToken from '../../config/setAuthHeader';
import { setAlert } from './alert';


export const registerSuccess = (payload) => {
    return {
        type: ActionType.REGISTER_SUCCESS,
        payload
    }
}

export const setUser = (payload) => {
    return {
        type: ActionType.USER_LOADED,
        payload
    }
}

export const setError = (payload) => {
    return {
        type: ActionType.SET_ERROR,
        payload
    }
}

export const login = (payload) => {
    return {
        type: ActionType.LOGIN_SUCCESS,
        payload
    }
}

export const getMe = () => {
    return async (dispatch) => {
        // setAuthToken(localStorage.auth_token);
        try {
            const type = localStorage.getItem("userType");
            let url = `/user/me`;
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    'Content-Type' : 'application/json',
                    'Authorization': authToken
                }
            }
            if (type) {
                url = `/user/me?userType=${type}`
            }
            const response = await axios.get(url, config);
            dispatch(setUser(response))
        } catch (error) {
            logout()
        }

    }
}

export const loginUser = (apiData, navigate, stopLoading, displayError) => {
    return async (dispatch) => {
        try {
            const url = `/user/login`;
            const response = await axios.post(url, apiData);
            dispatch(login(response));
            stopLoading();
            navigate("/dashboard");
        } catch (error) {
            const errors = error.response.data.message;
            stopLoading();
            displayError();
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
        }
    }
}

export const loginAdmin = (apiData, navigate, stopLoading, displayError) => {
    return async (dispatch) => {
        try {
            const url = `/admin/login`;
            const response = await axios.post(url, apiData);
            dispatch(login(response));
            stopLoading();
            localStorage.removeItem("userType")
            navigate("/dashboard");
        } catch (error) {
            const errors = error.response.data.message;
            stopLoading();
            displayError();
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
        }
    }
}

export const register = (apiData, navigate, stopLoading) => {
    return async (dispatch) => {
        try {
            const url = `/user/signup`;
            const response = await axios.post(url, apiData);
            dispatch(registerSuccess(response));
            localStorage.removeItem("reference");
            console.log(response);
            stopLoading();
            if(response.exists){
                Swal.fire({
                    title: "New Account Profile Created Successfully",
                    icon: "success",
                    text: "Proceed to login, your recently created profile has been included in your profile collection."
                }).then(() => {
                    navigate("/login");
                })
            }else Swal.fire({
                title: "Registration Completed Successfully",
                icon: "success",
                text: "Check Your E-mail to complete verification"
            }).then(() => {
                navigate("/login");
            })
            
        } catch (error) {
            const errors = error.response.data.message;
            dispatch(setError(errors));
            dispatch(setAlert(errors, "danger"))
            stopLoading();
            toast.error(
                errors,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }
    }
}
// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: ActionType.LOGOUT });
    window.location.href = "/";
};
export const Adminlogout = () => (dispatch) => {
    dispatch({ type: ActionType.LOGOUT });
    window.location.href = "/";
};
