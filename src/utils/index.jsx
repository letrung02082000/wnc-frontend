import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export const ToastWrapper = (msg, type = 'info', options) =>
  toast(msg, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type,
    ...options,
  });

export const exportToCSV = (csvData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${fileName}.csv`);
};
