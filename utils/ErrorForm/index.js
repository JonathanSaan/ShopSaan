import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorForm = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    draggable: true,
  });
};

export default ErrorForm;
