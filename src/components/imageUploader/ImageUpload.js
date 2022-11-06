import { useFormikContext } from 'formik'
import React, { useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageUpload({ fieldname }) {

  const { setFieldValue } = useFormikContext()
  const elRef = useRef(null)
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    elRef.current.click()
  }

  const handleChange = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setSubmitted(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'h4zp-uploads');
      let data = await fetch('https://api.cloudinary.com/v1_1/ddfh2nxrt/image/upload', {
        method: 'POST',
        body: formData
      }).then(r => r.json());
      setFieldValue(fieldname, data.secure_url);
      setSubmitted(false);
    }
  }

  return (
    <div className='imageUploader-icon'>
      {
        submitted ? (
          <Spinner animation='border' size='sm' />
        ) : (
          <FaCloudUploadAlt onClick={handleClick} />
        )
      }
      <input type="file" ref={elRef} hidden onChange={handleChange}></input>
    </div>
  )
}

export default ImageUpload