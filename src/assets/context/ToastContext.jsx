// ToastContext.js
import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

// Créer un contexte pour les notifications
const ToastContext = createContext();

// Fournisseur de contexte
export const ToastProvider = ({ children }) => {
  const showToast = (message, type = "success") => {
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
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook personnalisé pour utiliser le toast
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};
