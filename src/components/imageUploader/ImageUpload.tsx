import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function ImageUpload({ fieldname, uploadPath }: Record<string, string>) {
  const location = useLocation();
  const { setFieldValue } = useFormikContext();
  const elRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const folderPath =
    uploadPath || location.pathname.replace(/^\/+/, '').replace(/\/$/, '').replace(/[?#&]/g, '_');

  const handleClick = () => {
    elRef.current.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSubmitted(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', folderPath);
      try {
        const data = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: formData,
        }).then((r) => r.json());
        setFieldValue(fieldname, data.secure_url);
      } catch (err) {
        console.error('Upload error', err);
      }
      setSubmitted(false);
    }
  };

  return (
    <div className="imageUploader-icon">
      {submitted ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          <span onClick={handleClick}>
            Upload image&nbsp;
            <FaCloudUploadAlt />
          </span>
        </>
      )}
      <input type="file" ref={elRef} hidden onChange={handleChange}></input>
    </div>
  );
}

export default ImageUpload;
