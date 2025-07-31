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
    if (clone.list) {
      clone.list = clone.list.map((item) =>
        item.id ? item : { ...item, id: item.id != '' ? item.id : generateId() },
      );
    }
    setFormData(clone);
  }, [props.data.data]);

  const getListItem = () => {
    const mock = getListItemOfComponent(props.data.data.component);
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
                    render={({ remove, insert, swap, push }) => (
                      <>
                        <Accordion defaultActiveKey="0" className="mb-2">
                          {form.values.list.length > 0 ? (
                            form.values.list.map((m, index) => (
                              <Accordion.Item key={m.id} eventKey={index}>
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
                                    <BasicControl
                                      form={form}
                                      fieldConfig={contentListFieldConfig}
                                      prefix={`list[${index}]`}
                                    />
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
