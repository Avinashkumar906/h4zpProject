import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { generateId } from '../../util';

interface MultiImageUploadProps {
  fieldname: string;
  src?: string;
  uploadPath?: string;
}

function MultiImageUpload({ fieldname, uploadPath, src = 'url' }: MultiImageUploadProps) {
  const location = useLocation();
  const { setFieldValue, values } = useFormikContext<any>();
  const elRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const folderPath =
    uploadPath || location.pathname.replace(/^\/+/, '').replace(/\/$/, '').replace(/[?#&]/g, '_');

  const handleClick = () => {
    elRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    setProgress(0);
    setCurrentIndex(0);
    setTotalFiles(files.length);

    const uploadedData: { [key: string]: string; id: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '');
      formData.append('folder', folderPath);

      try {
        const res = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL || '', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data?.secure_url) {
          uploadedData.push({ [src]: data.secure_url, id: generateId() });
        }

        const nextIndex = i + 1;
        setCurrentIndex(nextIndex);
        setProgress(Math.round((nextIndex / files.length) * 100));
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    const existing = Array.isArray(values[fieldname]) ? values[fieldname] : [];
    setFieldValue(fieldname, [...existing, ...uploadedData]);

    setIsUploading(false);
    setProgress(0);
    setCurrentIndex(0);
    setTotalFiles(0);
  };

  return (
    <div className="multiUploaderWrapper w-100 px-4">
      {isUploading ? (
        <div className="w-100 d-flex flex-column align-items-center gap-2">
          <div className="text-muted small">
            Uploading {currentIndex} of {totalFiles}
          </div>
          <ProgressBar animated now={progress} label={`${progress}%`} className="w-100" />
        </div>
      ) : (
        <span
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#555',
          }}
          title="Upload images"
        >
          <FaCloudUploadAlt fontSize={28} />
          <div style={{ fontSize: '0.9rem' }}>Upload Batch Images</div>
        </span>
      )}
      <input type="file" ref={elRef} hidden multiple accept="image/*" onChange={handleChange} />
    </div>
  );
}

export default MultiImageUpload;
