import { Field, FormikProps, getIn } from 'formik';
import { widthOptions } from '../util';
import { Col, Form } from 'react-bootstrap';

export const fieldConfigs = [
  {
    name: 'fluid',
    label: 'Width',
    options: widthOptions, // your existing widthOptions
  },
  {
    name: 'autoplay',
    label: 'Auto play',
    options: [
      { label: 'On', value: 'true' },
      { label: 'Off', value: 'false' },
    ],
  },
  // add more fields easily in the future
];

type componentPropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormikProps<any>;
  id: string;
};

const Control = ({ form }: componentPropType) => {
  {
    fieldConfigs.map(({ name }) => {
      if (getIn(form.values, name) === undefined) {
        return null;
      }
    });
  }

  return (
    <>
      {fieldConfigs.map(({ name, label, options }) => {
        if (getIn(form.values, name) === undefined) {
          return null;
        }

        return (
          <Col className="mw-250" key={name}>
            <Form.Label>{label}</Form.Label>
            <Field as="select" name={name} className="form-select form-select-sm">
              {options.map((option, index) => (
                <option key={'Control' + index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
          </Col>
        );
      })}
    </>
  );
};

export default Control;
