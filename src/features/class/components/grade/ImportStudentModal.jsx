import FileUploader from '@/components/form/FileUploader';
import { API_URL } from '@/constants/endpoints';
import { MESSAGE } from '@/constants/message';
import { ToastWrapper, exportToCSV } from '@/utils';
import React, { useState } from 'react';

function ImportStudentModal({classId}) {
  const [uploading, setUploading] = useState(false);
  const url = `${API_URL}/grade/import-csv/${classId}`;

  const downloadTemplate = () => {
    const fileName = 'student-list';
    const csvData = [
      {
        StudentId: '18120622',
        FullName: 'Sample Name',
      }
    ]
    exportToCSV(csvData, fileName);
  };

const handleResponse = (res) => {
    ToastWrapper(MESSAGE.IMPORT.SUCCESS, 'success');
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
      <FileUploader
        name='file'
        uploadUrl={url}
        uploading={uploading}
        setUploading={setUploading}
        onResponse={handleResponse}
        accept={{'text/csv': []}}
      />
      <p className='mt-5'>
        Tải xuống mẫu{' '}
        <a href='#' onClick={downloadTemplate}>
          student-list.csv
        </a>
      </p>
    </div>
  );
}

export default ImportStudentModal;
