import { Fragment, useEffect, useState } from 'react';
import { Formik, FieldArray, getIn } from 'formik';
import { Accordion, Col, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { ComponentType, getListItemOfComponent } from '../util/mockData.util';
import { basicFieldConfig, contentFieldConfig, contentListFieldConfig } from '../util/const';
import BasicControl from './BasicControl';
import { JsonEditor } from 'json-edit-react';
import { generateId } from '../util';
import _ from 'lodash';
import MultiImageUpload from './imageUploader/MultiUpload';
import { ReactSortable } from 'react-sortablejs';
import DynamicIcon from './common/DynamicIcon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdateComponent = (props: any) => {
  const [formData, setFormData] = useState<ComponentType>();
  const [submitted, setSubmitted] = useState(false);

  // const schema = generateYupSchemaFromConfig([
  //   ...basicFieldConfig,
  //   ...contentFieldConfig,
  //   {
  //     name: 'contentList',
  //     type: 'array',
  //     options: contentListFieldConfig,
  //   }], formData);
  // schema.validateSync(formik.values, { abortEarly: false });

  useEffect(() => {
    const clone = _.cloneDeep(props.data.data);
    setFormData(clone);
  }, [props.data.data]);

  const getListItem = () => {
    const mock = _.cloneDeep(getListItemOfComponent(props.data.data.component));
    mock.id = generateId();
    return mock;
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
                    render={({ remove, push, move }) => (
                      <>
                        <Accordion defaultActiveKey="0" className="mb-2">
                          {form.values.list.length > 0 ? (
                            <ReactSortable
                              list={form.values?.list || []}
                              setList={() => undefined}
                              onEnd={(a) => move(a.oldIndex, a.newIndex)}
                            >
                              {form.values?.list?.map((m, index) => (
                                <Accordion.Item key={m.id} eventKey={index}>
                                  <Accordion.Header className="p-1">
                                    <Form.Label className="d-flex m-0 align-items-center">
                                      <div
                                        style={{ cursor: 'pointer' }}
                                        className="me-3"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          remove(index);
                                        }}
                                      >
                                        <DynamicIcon fullName="md:MdDelete" />
                                      </div>
                                      ID: {m.id}
                                    </Form.Label>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <BasicControl
                                      form={form}
                                      fieldConfig={contentListFieldConfig}
                                      prefix={`list[${index}]`}
                                    />
                                  </Accordion.Body>
                                </Accordion.Item>
                              ))}
                            </ReactSortable>
                          ) : (
                            <div className="p-2 text-center">
                              <div className="h4">No item in the list!</div>
                            </div>
                          )}
                          <div className="text-center m-2">
                            <button
                              type="button"
                              className="btn-purple"
                              onClick={() => push(getListItem())}
                            >
                              Add
                            </button>
                            <hr />
                          </div>
                          {formData?.component === 'gallery' && (
                            <MultiImageUpload fieldname={'list'} />
                          )}
                        </Accordion>
                      </>
                    )}
                  />
                </Tab>
              )}
              <Tab eventKey="advance" title="Advance">
                <div className="p-2">
                  <JsonEditor
                    className="w-100"
                    maxWidth={'none'}
                    data={form.values}
                    restrictDelete={true}
                    restrictAdd={true}
                    // rootName={fo}
                    onUpdate={({ newData }: { newData: unknown; currentData: unknown }) => {
                      try {
                        // console.log(newData)
                        form.setValues(newData);
                      } catch (error) {
                        console.error('Invalid JSON structure', error);
                      }
                    }}
                  />
                </div>
              </Tab>
            </Tabs>
            <Row className="mb-2">
              <Col className="text-center">
                {submitted ? (
                  <Spinner animation="border" />
                ) : (
                  <button type="submit" className="btn-primary">
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
