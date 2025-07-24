import { Field, FormikProps, getIn } from 'formik';
import { Col, Form, InputGroup } from 'react-bootstrap';
import ColorField from './common/ColorField';
import ImageUpload from './imageUploader/ImageUpload';
import Rte from './editor/Rte';

type componentPropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormikProps<any>;
  fieldConfig: any;
  prefix?: string;
};

const BasicControl = ({ form, fieldConfig, prefix = '' }: componentPropType) => {
  return (
    <>
      {fieldConfig.map(({ name: fieldName, label, options, type, size = 4 }) => {
        const name = prefix ? `${prefix}.${fieldName}` : fieldName;
        if (getIn(form.values, name) === undefined) {
          return null;
        }

        if (type === 'text') {
          return (
            <Col sm={size} key={name}>
              <Form.Label>{label}</Form.Label>
              <Field name={name} className="form-control form-control-sm" />
            </Col>
          );
        }

        if (type === 'rte') {
          return (
            <Col sm={size} key={name}>
              <Form.Label>{label}</Form.Label>
              <Rte fieldname={name} value={getIn(form.values, name)}></Rte>
            </Col>
          );
        }

        if (type === 'upload') {
          return (
            <Col sm={size} className="mw-250" key={name}>
              <Form.Label>{label}</Form.Label>
              <InputGroup size="sm">
                <Field name={name} className="form-control form-control-sm" />
                <InputGroup.Text>
                  <ImageUpload fieldname={name} />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          );
        }

        if (type === 'color') {
          return (
            <Col sm={size} className="mw-250" key={name}>
              <Form.Label>{label}</Form.Label>
              <div className="form-control form-control-sm">
                <ColorField fieldname={name} />
              </div>
            </Col>
          );
        }
        if (type === 'select') {
          return (
            <Col sm={size} className="mw-250" key={name}>
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
            <Col sm={size} className="mw-250" key={name}>
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
