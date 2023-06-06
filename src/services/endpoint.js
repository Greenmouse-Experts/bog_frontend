import Axios from "../config/config";
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import  { Navigate } from 'react-router-dom'

export const Login = () => {
    // console.log("Login")
    // const navigate = useNavigate();
    // navigate("/login")
}

export const updateAccount = async (payload, headers) => {
    try {
        const url = "/user/update-account";
        const res = await Axios.patch(url, payload, headers);
        return res;
    } catch (error) {
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

export const updatePassword = async (payload) => {
    try {
        const url = "/user/change-password";
        const res = await Axios.patch(url, payload);
        return res;
    } catch (error) {
        const errors = error.response.data.message;
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

export const SuccessAlert = (message) => {
    Swal.fire({
        title: "Success",
        imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
        imageWidth: "75px",
        text: message,
        buttonsStyling: "false",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3F79AD",
    })
}
export const WarningAlert = (message) => {
     try {
        Swal.fire({
            title: "Warning",
            imageUrl: "https://media.istockphoto.com/id/894875516/vector/exclamation-point-sign-in-red-triangle-vector-icon.jpg?s=612x612&w=0&k=20&c=AYMHwOnNCaWz8j3ubjC24cBrlk_ei_oCB3kS-UwvZtU=",
            imageWidth: "75px",
            text: message,
            buttonsStyling: "false",
            confirmButtonText: "Ok",
            confirmButtonColor: "#3F79AD",
            // allowOutsideClick: true
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                    return <Navigate to='/login' replace={true}  />

                // Login()
                // n("/login");
                // Swal.fire('Saved!', '', 'success')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        });
    }catch (error) {

    }
  }

export const SuccessAlertWithRedirection = (message, goto) => {
    Swal.fire({
        title: "Success",
        imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
        imageWidth: "75px",
        text: message,
        buttonsStyling: "false",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3F79AD",
    }).then(() =>{
        goto()
    })
}

export const getBanks = async () => {
    try {
        const url = "/bank/allbanks";
        const res = await Axios.get(url);
        return res;
    } catch (error) {
        const errors = error.response.data.message;
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

export const markNotificationAsRead = async (id) => {
    try {
        const url = `/notifications/mark-read/${id}`;
        const res = await Axios.patch(url);
        return res;
    } catch (error) {
        const errors = error.response.data.message;
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