import { Field, FormikProps, getIn } from 'formik';
import { Col, Form, InputGroup } from 'react-bootstrap';
import ColorField from './common/ColorField';

type componentPropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormikProps<any>;
  fieldConfig: any;
};

const BasicControl = ({ form, fieldConfig }: componentPropType) => {
  return (
    <>
      {fieldConfig.map(({ name, label, options, type }) => {
        if (getIn(form.values, name) === undefined) {
          return null;
        }

        if (type === 'color') {
          return (
            <Col className="mw-250" key={name}>
              <Form.Label>{label}</Form.Label>
              <div className="form-control form-control-sm">
                <ColorField fieldname={name} />
              </div>
            </Col>
          );
        }
        if (type === 'select') {
          return (
            <Col className="mw-250" key={name}>
              <Form.Label>{label}</Form.Label>
              <Field as={type} name={name} className="form-select form-select-sm">
                {options.map((option, index) => (
                  <option key={'Control' + index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </Col>
          );
        }

        if (type === 'group') {
          return (
            <Col className="mw-250" key={name}>
              <Form.Label>{label}</Form.Label>
              <InputGroup size="sm">
                {options.map((child) => (
                  <Field
                    key={child.name}
                    as="select"
                    name={`${name}.${child.name}`}
                    className="form-select form-select-sm"
                  >
                    {child.options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ))}
              </InputGroup>
            </Col>
          );
        }
      })}
    </>
  );
};

export default BasicControl;
