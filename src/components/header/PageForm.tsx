import { Fragment, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import ImageUpload from '../imageUploader/ImageUpload';
import { Field, Form, Formik } from 'formik';
import {
  Button,
  Col,
  Dropdown,
  InputGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchPageMeta } from '../../firebase/getFromFirestore';

const initialPageData = {
  pageName: '',
  meta: {
    isBlog: 'false',
    title: '',
    description: '',
    date: '',
    createdBy: '',
    imageUrl: '',
  },
};

const nonEmptyString = () =>
  Yup.string().test('not-empty', 'Cannot be empty', (val) => !!val && val.trim() !== '');

const createPageSchema = Yup.object().shape({
  pageName: Yup.string(),
  meta: Yup.object().shape({
    isBlog: Yup.string(),
    title: Yup.string().when('isBlog', {
      is: (val) => val != 'false',
      then: (schema) => nonEmptyString(),
      otherwise: (schema) => schema.notRequired(),
    }),
    description: Yup.string().when('isBlog', {
      is: (val) => val != 'false',
      then: (schema) => nonEmptyString(),
      otherwise: (schema) => schema.notRequired(),
    }),
    date: Yup.string().when('isBlog', {
      is: (val) => val != 'false',
      then: (schema) => nonEmptyString(),
      otherwise: (schema) => schema.notRequired(),
    }),
    createdBy: Yup.string().when('isBlog', {
      is: (val) => val != 'false',
      then: (schema) => nonEmptyString(),
      otherwise: (schema) => schema.notRequired(),
    }),
    imageUrl: Yup.string().when('isBlog', {
      is: (val) => val != 'false',
      then: (schema) => nonEmptyString(),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

function PageForm({ handlePageCreate, formSubmitted, handlePageUpdate }: any) {
  const [pageData, setPageData] = useState<typeof initialPageData>();
  const [activeKey, setActiveKey] = useState<'create' | 'update'>('create');
  const { page } = useParams();

  useEffect(() => {
    if (!page) return;
    fetchPageMeta(page, (data) => {
      if (!data) return;
      setPageData({
        pageName: page,
        meta: {
          isBlog: data.isBlog ?? 'true',
          title: data.title ?? '',
          date: data.date ?? '',
          imageUrl: data.imageUrl ?? '',
          createdBy: data.createdBy ?? '',
          description: data.description ?? '',
        },
      });
    });
  }, [page]);

  // const handleSubmit = (values: Partial<typeof initialPageData>) => {
  //   if (activeKey === 'create') {
  //     handlePageCreate(values);
  //   } else {
  //     // handlePageUpdate(values);
  //   }
  // };

  return (
    <Fragment>
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k as 'create' | 'update')} fill>
        <Tab eventKey="create" title="Create Page" />
        <Tab eventKey="update" title="Update Page" />
      </Tabs>

      <Formik
        initialValues={activeKey === 'create' ? initialPageData : pageData}
        enableReinitialize
        validationSchema={createPageSchema}
        onSubmit={activeKey === 'create' ? handlePageCreate : handlePageUpdate}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
        context={{ isCreate: activeKey === 'create' }}
      >
        {({ handleSubmit, isValid, values, errors }) => (
          <Form className="p-2" onSubmit={handleSubmit} style={{ minWidth: '22rem' }}>
            <Row className="mb-2">
              <>
                {activeKey === 'create' && (
                  <Col sm={6} className="mb-2">
                    <InputGroup size="sm">
                      <InputGroup.Text>www.h4zpindia.org/</InputGroup.Text>
                      <Field
                        name="pageName"
                        placeholder="Page URL"
                        className={'form-control form-control-sm'}
                      />
                    </InputGroup>
                  </Col>
                )}
                <Col sm={6} className="mb-2">
                  <InputGroup size="sm">
                    <InputGroup.Text>Show On Blog Page</InputGroup.Text>
                    <Field
                      name="meta.isBlog"
                      as="select"
                      className={'form-control form-control-sm'}
                    >
                      <option value="true">Show</option>
                      <option value="false">Hide</option>
                    </Field>
                  </InputGroup>
                </Col>
              </>
              {values.meta.isBlog === 'true' ? (
                <>
                  <Col sm={6} className="mb-2">
                    <Field
                      name="meta.title"
                      placeholder="Title for page"
                      className={`form-control form-control-sm`}
                    />
                  </Col>
                  <Col sm={6} className="mb-2">
                    <Field
                      name="meta.createdBy"
                      placeholder="Author Names"
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
                      <InputGroup.Text>
                        <ImageUpload fieldname="meta.imageUrl" uploadPath="createPage" />
                      </InputGroup.Text>
                      <Field
                        name="meta.imageUrl"
                        placeholder="Image Url"
                        className="form-control form-control-sm"
                      />
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
                </>
              ) : (
                ''
              )}
            </Row>

            <div className="text-center">
              {formSubmitted ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Button
                  disabled={!isValid}
                  variant="primary"
                  className="w-100"
                  size="sm"
                  type="submit"
                >
                  {activeKey === 'create' ? 'Create Page' : 'Update Page'}
                </Button>
              )}
            </div>
            {/* <pre style={{ fontSize: '0.7rem' }}>{JSON.stringify({ values, isValid, errors }, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>

      <Dropdown.Divider />
    </Fragment>
  );
}

export default PageForm;
