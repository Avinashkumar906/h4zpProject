import { Fragment, useEffect, useState } from 'react';
import { Formik, Field, FieldArray, getIn } from 'formik';
import { Accordion, Col, Form, InputGroup, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { getListItemOfComponent } from '../util/mockData.util';
import ImageUpload from './imageUploader/ImageUpload';
import { basicFieldConfig, contentFieldConfig } from '../util/const';
import Rte from './editor/Rte';
import BasicControl from './BasicControl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdateComponent = (props: any) => {
  const [formData, setFormData] = useState(props.data.data);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData(props.data.data);
  }, [props.data.data]);

  const getListItem = () => {
    return getListItemOfComponent(formData.component);
  };

  const submitForm = (values) => {
    setSubmitted(true);
    props.onUpdate(values);
    setTimeout(() => setSubmitted(false), 500);
  };

  return (
    <Fragment>
      <Formik initialValues={formData} enableReinitialize onSubmit={submitForm}>
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Tabs defaultActiveKey="basic" className="mb-3">
              <Tab eventKey="basic" title="Design">
                <Row className="flex-column flex-sm-row flex-wrap" style={{ rowGap: '1rem' }}>
                  <BasicControl form={form} fieldConfig={basicFieldConfig} />
                </Row>
                <hr />
              </Tab>
              <Tab eventKey="main" title="Content">
                <Row className="flex-column flex-sm-row flex-wrap" style={{ rowGap: '1rem' }}>
                  <BasicControl form={form} fieldConfig={contentFieldConfig} />
                </Row>
              </Tab>
              {getIn(form.values, 'list') !== undefined && (
                <Tab eventKey="content" title="Content List">
                  <FieldArray
                    name="list"
                    render={({ remove, insert, swap, push }) => (
                      <>
                        <Accordion defaultActiveKey="0" className="mb-2">
                          {form.values.list.length > 0 ? (
                            form.values.list.map((m, index) => (
                              <Accordion.Item key={`list-update-${index}`} eventKey={index}>
                                <Accordion.Header className="p-1">
                                  <Form.Label>Content {index + 1}</Form.Label>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Row
                                    className="mb-3 pt-2 bg-light m-0"
                                    style={{ position: 'relative', rowGap: '.5rem' }}
                                  >
                                    <div
                                      className="d-flex justify-content-end mb-2"
                                      style={{ marginTop: '-1rem' }}
                                    >
                                      <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="First group"
                                      >
                                        <button
                                          type="button"
                                          onClick={() => insert(index, getListItem())}
                                          className="rounded-0 btn btn-purple btn-sm"
                                        >
                                          {/* <AiFillPlusCircle/> */} Add
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => swap(index, index - 1)}
                                          className={`${index === 0 && 'd-none'} rounded-0 btn btn-purple btn-sm`}
                                        >
                                          {/* <AiFillPlusCircle/> */} Up
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => swap(index, index + 1)}
                                          className={`${index === form.values.list.length - 1 && 'd-none'} rounded-0 btn btn-purple btn-sm`}
                                        >
                                          {/* <AiFillPlusCircle/>  */} Down
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="rounded-0 btn btn-purple btn-sm"
                                        >
                                          {/* <AiFillPlusCircle/> */} Remove
                                        </button>
                                      </div>
                                    </div>
                                    {getIn(m, 'title') !== undefined && (
                                      <Col sm={6} className="mb-2">
                                        <Form.Label>Title</Form.Label>
                                        <Field
                                          name={`list[${index}].title`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    {getIn(m, 'label') !== undefined && (
                                      <Col sm={6} className="mb-2">
                                        <Form.Label>Stats Label</Form.Label>
                                        <Field
                                          name={`list[${index}].label`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    {getIn(m, 'value') !== undefined && (
                                      <Col sm={6} className="mb-2">
                                        <Form.Label>Stats Value</Form.Label>
                                        <Field
                                          name={`list[${index}].value`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    {getIn(m, 'url') !== undefined && (
                                      <Col sm={6} className="mb-2">
                                        <Form.Label>Image Url</Form.Label>
                                        <InputGroup size="sm">
                                          <Field
                                            name={`list[${index}].url`}
                                            className="form-control form-control-sm"
                                          />
                                          <InputGroup.Text>
                                            <ImageUpload fieldname={`list[${index}].url`} />
                                          </InputGroup.Text>
                                        </InputGroup>
                                      </Col>
                                    )}
                                    <div className="w-100"></div>
                                    {getIn(m, 'date') !== undefined && (
                                      <Col sm={4} className="mb-2">
                                        <Form.Label>Created On</Form.Label>
                                        <Field
                                          type="date"
                                          name={`list[${index}].date`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    {getIn(m, 'BtnText') !== undefined && (
                                      <Col sm={4} className="mb-2">
                                        <Form.Label>Button Text</Form.Label>
                                        <Field
                                          name={`list[${index}].BtnText`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}

                                    {getIn(m, 'BtnUrl') !== undefined && (
                                      <Col sm={4} className="mb-2">
                                        <Form.Label>Page reference</Form.Label>
                                        <Field
                                          name={`list[${index}].BtnUrl`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    {getIn(m, 'btnColor') !== undefined && (
                                      <Col sm={4} className="mb-2">
                                        <Form.Label>Button Color</Form.Label>
                                        <Field
                                          as="select"
                                          name={`list[${index}].btnColor`}
                                          className="form-select form-select-sm"
                                        >
                                          <option value="btn-dark">Default</option>
                                          <option value="btn-primary">Primary</option>
                                          <option value="btn-secondary">Secondary</option>
                                          <option value="btn-pink">Pink</option>
                                          <option value="btn-yellow">Yellow</option>
                                          <option value="btn-purple">Purple</option>
                                          <option value="btn-orange">Orange</option>
                                          <option value="btn-teal">Teal</option>
                                          <option value="btn-coral">Coral</option>
                                          <option value="btn-lime">Lime</option>
                                        </Field>
                                      </Col>
                                    )}
                                    {/* <div className="w-100"></div> */}
                                    {getIn(m, 'credit') !== undefined && (
                                      <Col sm={4} className="mb-2">
                                        <Form.Label>Organised by</Form.Label>
                                        <Field
                                          name={`list[${index}].credit`}
                                          className="form-control form-control-sm"
                                        />
                                      </Col>
                                    )}
                                    <div className="w-100"></div>
                                    {getIn(m, 'description') !== undefined && (
                                      <Col sm={12} className="mb-2">
                                        <Form.Label>Description</Form.Label>
                                        <Rte
                                          fieldname={`list[${index}].description`}
                                          value={form.values.list[index].description}
                                        ></Rte>
                                        {/* <Field as="textarea" name={`list[${index}].description`} className="form-control form-control-sm" /> */}
                                      </Col>
                                    )}
                                  </Row>
                                </Accordion.Body>
                              </Accordion.Item>
                            ))
                          ) : (
                            <div className="p-2 text-center">
                              <div className="h4">No item in the list!</div>
                              <div
                                className="btn btn-sm btn-secondary"
                                onClick={() => push(getListItem())}
                              >
                                Add item
                              </div>
                              <hr />
                            </div>
                          )}
                          {/* </div> */}
                        </Accordion>
                      </>
                    )}
                  />
                </Tab>
              )}
            </Tabs>
            <Row className="mb-2">
              <Col className="text-center">
                {submitted ? (
                  <Spinner animation="border" />
                ) : (
                  <button type="submit" className="btn btn-sm btn-primary m-auto">
                    Submit
                  </button>
                )}
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default UpdateComponent;
