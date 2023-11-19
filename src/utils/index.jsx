import { toast } from 'react-toastify';

export const ToastWrapper = (msg, type = 'info') =>
  toast(msg, {
    position: 'bottom-right',
    autoClose: 100,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
  });
