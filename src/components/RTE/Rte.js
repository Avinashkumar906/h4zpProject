import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { rteConfig } from './config';

function Rte({ fieldname, value }) {

  const [currentValue] = useState(value)
  const { setFieldValue } = useFormikContext();

  const handleChange = (value) => {
    setFieldValue(fieldname, value);
  }

  return (
    <div>
      <SunEditor
        onChange={handleChange}
        onSave={handleChange}
        defaultValue={currentValue}
        setOptions={rteConfig} />
    </div>
  )
}

export default Rte