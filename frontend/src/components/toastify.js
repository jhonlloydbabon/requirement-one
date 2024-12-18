import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const success = (message)=>{
    return toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light", // Options: 'light', 'dark', 'colored'
      });
}

export const error = (message)=>{
    return toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
}

export const warning = (message)=>{
    return toast.warning(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
}
