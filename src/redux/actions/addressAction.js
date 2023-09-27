import toast from 'react-hot-toast';
import Axios from '../../config/config';

export const fetchAddresses = async (stopLoading, setAddresses, user) => {
    try {
        const authToken = localStorage.getItem("auth_token");
        const config = {
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': authToken
            }
        }
        let url = `/address/view/all`;
        
        const res = await Axios.get(url, config);
        const results = res.data;
        setAddresses(results);
        stopLoading();
    } catch (error) {
        if (error.message === 'Request failed with status code 401') {
            window.location.href = '/';
        }
        else {
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

export const fetchStateAddresses = async (setAddresses, user, state) => {
    try {
        const authToken = localStorage.getItem("auth_token");
        const config = {
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': authToken
            }
        }

        let _state = state === undefined ? '' : `?q=${state}`;
        let url = `/address/view/all${_state}`;
        
        const res = await Axios.get(url, config);
        const results = res.data;
        setAddresses(results);
    } catch (error) {
        if (error.message === 'Request failed with status code 401') {
            window.location.href = '/';
        }
        else {
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

export const fetchPrevAddresses = async (setPrev) => {
    try {
        const authToken = localStorage.getItem("auth_token");
        const config = {
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': authToken
            }
        }

        // let _state = state === undefined ? '' : `?q=${state}`;
        let url = `/orders/delivery/list`;
        
        const res = await Axios.get(url, config);
        const results = res.data;
        setPrev(results);
    } catch (error) {
        if (error.message === 'Request failed with status code 401') {
            window.location.href = '/';
        }
        else {
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
