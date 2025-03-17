// Toastify.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = () => {
  // eslint-disable-next-line no-unused-vars
  const notify = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <div>
      {/* Container for displaying toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* You can trigger notifications from anywhere in your app
      <button onClick={() => notify("C'est une notification de succès !", "success")} className="bg-green-500 text-white p-2 rounded-md">
        Notification de succès
      </button>
      <button onClick={() => notify("Une erreur est survenue", "error")} className="bg-red-500 text-white p-2 rounded-md ml-2">
        Notification d'erreur
      </button> */}
    </div>
  );
};

export default Toastify;
