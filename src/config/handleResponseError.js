/* eslint-disable import/no-anonymous-default-export */
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import toast from 'react-hot-toast';

const redirect = () => {
  localStorage.setItem("user_token", null);
  localStorage.setItem("user_token", null);
  toaster.notify("Redirecting to Login", {
    duration: null,
    position: "bottom",
  });
  setTimeout(() => (window.location.href = "/login"), 1000);
};

export default (error) => {
  if (error?.data) {
    const { errors, message } = error.data;

    if (message) {
      toast.error(
        message,
        {
          duration: 4000,
          position: "top-center",
          style: { background: '#BD362F', color: 'white' },
        }
      );
      if (message === "token_expired") {
        redirect();
      }
    }
    if (errors && typeof errors === Array) {
      errors.forEach((error) => {
        toast.error(
          error.code,
          {
            duration: 6000,
            position: "top-center",
            style: { background: '#BD362F', color: 'white' },
          }
        );

      });
  }
    }
    
};
