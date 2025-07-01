import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';

function ImageUpload({ fieldname }: any) {
  const { setFieldValue } = useFormikContext();
  const elRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

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
      const data = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      }).then((r) => r.json());
      setFieldValue(fieldname, data.secure_url);
      setSubmitted(false);
    }
  };

  return (
    <div className="imageUploader-icon">
      {submitted ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <FaCloudUploadAlt onClick={handleClick} />
      )}
      <input type="file" ref={elRef} hidden onChange={handleChange}></input>
    </div>
  );
}

export default ImageUpload;
