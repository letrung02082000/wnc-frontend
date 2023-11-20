import { toast } from 'react-toastify';

export const ToastWrapper = (msg, type = 'info', options) =>
  toast(msg, {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
    ...options
  });
