import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import ImageUpload from '../imageUploader/ImageUpload';
import { Field, Form, Formik } from 'formik';
import { Button, Col, Dropdown, InputGroup, Row, Spinner, Tab, Tabs } from 'react-bootstrap';

const initialPageData = {
  pageName: '',
  meta: { isBlog: true, title: '', description: '', date: '', createdBy: '', imageUrl: '' },
};

const createPageSchema = Yup.object().shape({
  meta: Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    createdBy: Yup.string().required('Required'),
    imageUrl: Yup.string().required('Required'),
  }),
});
function PageForm({ handlePageCreate, formSubmitted, onLogout }: any) {
  const [createPageForm] = useState(initialPageData);

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
                      placeholder="Page ID (optional)"
                      className={'form-control form-control-sm'}
                    />
                  </Col>
                  <Col sm={6} className="mb-2">
                    <Field
                      name="meta.createdBy"
                      placeholder="Author name"
                      className="form-control form-control-sm"
                    />
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
          <div className="p-2 pb-0">Update page info coming soon!</div>
        </Tab>
      </Tabs>
      <Dropdown.Divider />
      <div className="p-2 d-flex" style={{ minWidth: '22rem' }}>
        <Button variant="dark" className=" w-100" size="sm" type="button" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Fragment>
  );
}

export default PageForm;
