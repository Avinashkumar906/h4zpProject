import { Fragment, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import ImageUpload from '../imageUploader/ImageUpload';
import { Field, Form, Formik } from 'formik';
import { Button, Col, Dropdown, InputGroup, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchPageMeta } from '../../firebase/getFromFirestore';

const initialPageData = {
  pageName: '',
  meta: {
    isBlog: 'true',
    title: '',
    description: '',
    date: '',
    createdBy: '',
    imageUrl:
      'https://res.cloudinary.com/ddfh2nxrt/image/upload/v1751618634/dumpdata/srbeds1ljgtbee1aatxj.png',
  },
};

const createPageSchema = Yup.object().shape({
  meta: Yup.object().shape({
    isBlog: Yup.string(),
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    createdBy: Yup.string().required('Required'),
    imageUrl: Yup.string().required('Required'),
  }),
});

function PageForm({ handlePageCreate, formSubmitted, handlePageUpdate }: any) {
  const [createPageForm] = useState(initialPageData);
  const [updatePageForm, setUpdatePageForm] = useState(null);
  const [pageData, setPageData] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    fetchPageMeta(page, (data) => {
      if (!data) return;
      setUpdatePageForm({
        pageName: page, // or extract if available in data
        meta: {
          isBlog: data.isBlog ?? 'false',
          title: data.title ?? '',
          date: data.date ?? '',
          imageUrl: data.imageUrl ?? '',
          createdBy: data.createdBy ?? '',
          description: data.description ?? '',
        },
      });
    });
  }, [page]);

  return (
    <Fragment>
      <Tabs defaultActiveKey="create" id="create-page" className="" fill>
        <Tab eventKey="create" title="Create Page">
          <Formik
            initialValues={createPageForm}
            enableReinitialize
            onSubmit={handlePageCreate}
            validationSchema={createPageSchema}
          >
            {({ handleSubmit, errors, dirty }) => (
              <Form className="p-2" onSubmit={handleSubmit} style={{ minWidth: '22rem' }}>
                <Row className="mb-2">
                  <Col sm={12} className="mb-2">
                    <Field
                      name="meta.title"
                      placeholder="Title for page"
                      className={`form-control form-control-sm`}
                    />
                  </Col>
                  <Col sm={6} className="mb-2">
                    <Field
                      name="pageName"
                      placeholder="Page route url"
                      className={'form-control form-control-sm'}
                    />
                  </Col>
                  <Col sm={6} className="mb-2">
                    <InputGroup size="sm">
                      <Field
                        disabled
                        value="Auto show on Blog"
                        className="form-control form-control-sm w-75"
                      />
                      <Field
                        name="meta.isBlog"
                        placeholder="Auto show on blog page"
                        as="select"
                        className={'form-control form-control-sm'}
                      >
                        <option value="true">Show</option>
                        <option value="false">Hide</option>
                      </Field>
                    </InputGroup>
                  </Col>
                  <Col sm={6} className="mb-2">
                    <Field
                      type="date"
                      name="meta.date"
                      placeholder="Blog creation date"
                      className="form-control form-control-sm"
                    />
                  </Col>
                  <Col sm={6} className="mb-2">
                    <InputGroup size="sm">
                      <Field
                        name="meta.imageUrl"
                        placeholder="Image Url"
                        className="form-control form-control-sm"
                      />
                      <InputGroup.Text>
                        <ImageUpload fieldname="meta.imageUrl" />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col sm={12} className="mb-2">
                    <Field
                      name="meta.createdBy"
                      placeholder="Author Names"
                      className="form-control form-control-sm"
                    />
                  </Col>
                  <Col sm={12} className="mb-2">
                    <Field
                      as="textarea"
                      name="meta.description"
                      placeholder="Description of Post"
                      className="form-control form-control-sm"
                    />
                  </Col>
                </Row>

                <div className="text-center">
                  {formSubmitted ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Button
                      disabled={!isEmpty(errors) || !dirty}
                      variant="primary"
                      className=" w-100"
                      size="sm"
                      type="submit"
                    >
                      Create Page
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Tab>
        <Tab eventKey="update" title="Update Page">
          {updatePageForm && (
            <Formik
              initialValues={updatePageForm}
              enableReinitialize
              onSubmit={handlePageUpdate}
              validationSchema={createPageSchema}
            >
              {({ handleSubmit, errors, dirty }) => (
                <Form className="p-2" onSubmit={handleSubmit} style={{ minWidth: '22rem' }}>
                  <Row className="mb-2">
                    <Col sm={12} className="mb-2">
                      <Field
                        name="meta.title"
                        placeholder="Title for page"
                        className={`form-control form-control-sm`}
                      />
                    </Col>
                    <Col sm={6} className="mb-2">
                      <InputGroup size="sm">
                        <Field
                          disabled
                          value="Auto show on Blog"
                          className="form-control form-control-sm w-75"
                        />
                        <Field
                          name="meta.isBlog"
                          placeholder="Auto show on blog page"
                          as="select"
                          className={'form-control form-control-sm'}
                        >
                          <option value="true">Show</option>
                          <option value="false">Hide</option>
                        </Field>
                      </InputGroup>
                    </Col>
                    <Col sm={6} className="mb-2">
                      <Field
                        type="date"
                        name="meta.date"
                        placeholder="Blog creation date"
                        className="form-control form-control-sm"
                      />
                    </Col>
                    <Col sm={6} className="mb-2">
                      <InputGroup size="sm">
                        <Field
                          name="meta.imageUrl"
                          placeholder="Image Url"
                          className="form-control form-control-sm"
                        />
                        <InputGroup.Text>
                          <ImageUpload fieldname="meta.imageUrl" />
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                    <Col sm={6} className="mb-2">
                      <Field
                        name="meta.createdBy"
                        placeholder="Author Names"
                        className="form-control form-control-sm"
                      />
                    </Col>
                    <Col sm={12} className="mb-2">
                      <Field
                        as="textarea"
                        name="meta.description"
                        placeholder="Description of Post"
                        className="form-control form-control-sm"
                      />
                    </Col>
                  </Row>

                  <div className="text-center">
                    {formSubmitted ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <Button
                        disabled={!isEmpty(errors) || !dirty}
                        variant="primary"
                        className=" w-100"
                        size="sm"
                        type="submit"
                      >
                        Update Page
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Tab>
      </Tabs>
      <Dropdown.Divider />
      {/* <div className="p-2 d-flex" style={{ minWidth: '22rem' }}> */}
      {/* <Button variant="dark" className=" w-100" size="sm" type="button" onClick={onLogout}>
          Logout
        </Button> */}
      {/* </div> */}
    </Fragment>
  );
}

export default PageForm;
