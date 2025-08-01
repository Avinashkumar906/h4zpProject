import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BSForm, Button, Row, Col } from 'react-bootstrap';

type FieldConfig = {
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  options?: { label: string; value: string }[];
};

type DynamicFormProps = {
  formData: Record<string, FieldConfig>;
  onSubmit: (values: Record<string, any>) => void;
};

const DynamicForm: React.FC<DynamicFormProps> = ({ formData, onSubmit }) => {
  const initialValues: Record<string, any> = {};
  const validationShape: Record<string, any> = {};

  for (const key in formData) {
    const field = formData[key];
    initialValues[key] = field.defaultValue || '';
    if (field.required) {
      validationShape[key] = Yup.string().required(`${field.label} is required`);
    }
  }

  const validationSchema = Yup.object(validationShape);

  console.log(formData);

  return (
    <div className="container mt-4">
      <div className="p-4 border rounded bg-light">
        <Formik
          initialValues={initialValues}
          validateOnMount={true}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(form) => (
            <Form>
              <Row className="g-3">
                {Object.keys(formData).map((key, idx) => {
                  const field = formData[key];
                  return (
                    <Col key={key} md={6} lg={4}>
                      <BSForm.Group controlId={key}>
                        <BSForm.Label className="form-label-sm">{field.label}</BSForm.Label>

                        {field.type === 'select' ? (
                          <Field as="select" name={key} className="form-select form-select-sm">
                            {field.options?.map((opt, idx) => (
                              <option key={idx} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            type={field.type}
                            name={key}
                            className="form-control form-control-sm"
                          />
                        )}

                        <ErrorMessage name={key} component="div" className="text-danger small" />
                      </BSForm.Group>
                    </Col>
                  );
                })}
              </Row>

              <div className="text-end mt-4">
                <Button type="submit" variant="primary" size="sm" disabled={!form.isValid}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DynamicForm;
