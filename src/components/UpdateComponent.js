import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { AiFillCloseCircle, AiFillDownCircle, AiFillUpCircle, AiFillPlusCircle } from 'react-icons/ai'
import { getListItemOfComponent } from '../util/util';
import ImageUpload from './imageUploader/ImageUpload';
import Rte from './rte/Rte';

const UpdateComponent = props => {
  const [formData, setFormData] = useState(props.data.data)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setFormData(props.data.data)
  }, [props.data.data])


  const getListItem = () => {
    return getListItemOfComponent(formData.component)
  }

  const submitForm = (values) => {
    setSubmitted(true)
    props.onUpdate(values)
    setTimeout(() => setSubmitted(false), 500)
  }

  return (
    <Fragment>
      <Formik initialValues={formData}
        enableReinitialize
        onSubmit={submitForm}>
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Row className='mb-2'>
              {
                form.values.hasOwnProperty('fluid') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Width</Form.Label>
                    <Field as="select" name="fluid" className="form-select form-select-sm">
                      <option value={true}>Full</option>
                      <option value={false}>Default</option>
                    </Field>
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('autoplay') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Auto play</Form.Label>
                    <Field as="select" name="autoplay" className="form-select form-select-sm">
                      <option value={true}>On</option>
                      <option value={false}>Off</option>
                    </Field>
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('mute') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Mute video</Form.Label>
                    <Field as="select" name="mute" className="form-select form-select-sm">
                      <option value={true}>On</option>
                      <option value={false}>Off</option>
                    </Field>
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('parallax') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Scroll Effect</Form.Label>
                    <Field as="select" name="parallax" className="form-select form-select-sm">
                      <option value={true}>Parallax</option>
                      <option value={false}>No Effect</option>
                    </Field>
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('theme') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Background</Form.Label>
                    <Field as="select" name="theme" className="form-select form-select-sm">
                      <option value=''>No Background</option>
                      <option value="bg-light">Light</option>
                    </Field>
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('order') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Position</Form.Label>
                    <Field type="number" name="order" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('itemInRow') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Item in Row</Form.Label>
                    <Field type="number" name="itemInRow" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('style') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Image Style</Form.Label>
                    <Field as="select" name="style" className="form-select form-select-sm">
                      <option value="">No Style</option>
                      <option value='rounded-circle'>Circle</option>
                      <option value="rounded">Rounded Corner</option>
                    </Field>
                  </Col>
                )
              }

              {
                form.values.hasOwnProperty('imgRatio') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Aspect ratio</Form.Label>
                    <Field type="text" name="imgRatio" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('height') && (
                  <Col sm={3} className="mb-2">
                    <Form.Label>Height</Form.Label>
                    <Field type="number" max="100" min="10" name="height" className="form-control form-control-sm"></Field>
                  </Col>
                )
              }
            </Row>
            <Row className='mb-2'>
              {
                form.values.hasOwnProperty('title') && (
                  <Col className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Field name="title" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('subTitle') && (
                  <Col className="mb-2">
                    <Form.Label>Sub title</Form.Label>
                    <Field as="textarea" name="subTitle" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('url') && (
                  <Col className="mb-2">
                    <Form.Label>Image/Iframe Url</Form.Label>
                    <Field name="url" className="form-control form-control-sm" />
                  </Col>
                )
              }
              {
                form.values.hasOwnProperty('description') && (
                  <Col sm={12} className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Rte fieldname="description" value={form.values.description}></Rte>
                  </Col>
                )
              }
            </Row>
            {
              form.values.hasOwnProperty('list') && (
                <FieldArray name="list"
                  render={
                    ({ remove, insert, swap, push }) => (
                      <div>
                        <hr />
                        <Form.Label>List:</Form.Label>
                        {
                          form.values.list.length > 0 ? (
                            form.values.list.map((m, index) => (
                              <Row key={`list-update-${index}`} className="mb-3 pt-2 bg-light m-0" style={{ position: 'relative' }}>
                                <div className='list-close h4' >
                                  <AiFillPlusCircle onClick={() => insert(index, getListItem())} />
                                  <AiFillUpCircle onClick={() => swap(index, index - 1)} className={index === 0 && 'd-none'} />
                                  <AiFillDownCircle onClick={() => swap(index, index + 1)} className={index === form.values.list.length - 1 && 'd-none'} />
                                  <AiFillCloseCircle onClick={() => remove(index)} />
                                </div>
                                {
                                  m.hasOwnProperty('title') && (
                                    <Col sm={6} className="mb-2">
                                      <Form.Label>Title</Form.Label>
                                      <Field name={`list[${index}].title`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('subTitle') && (
                                    <Col sm={6} className="mb-2">
                                      <Form.Label>Sub title</Form.Label>
                                      <Field name={`list[${index}].subTitle`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('url') && (
                                    <Col className="mb-2">
                                      <Form.Label>Image Url</Form.Label>
                                      <InputGroup size="sm">
                                        <Field name={`list[${index}].url`} className="form-control form-control-sm" />
                                        <InputGroup.Text>
                                          <ImageUpload fieldname={`list[${index}].url`} />
                                        </InputGroup.Text>
                                      </InputGroup>
                                    </Col>
                                  )
                                }
                                <div className='w-100'></div>
                                {
                                  m.hasOwnProperty('BtnText') && (
                                    <Col className="mb-2">
                                      <Form.Label>Button Text</Form.Label>
                                      <Field name={`list[${index}].BtnText`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('date') && (
                                    <Col className="mb-2">
                                      <Form.Label>Created On</Form.Label>
                                      <Field type="date" name={`list[${index}].date`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('BtnUrl') && (
                                    <Col className="mb-2">
                                      <Form.Label>Page reference</Form.Label>
                                      <Field name={`list[${index}].BtnUrl`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('credit') && (
                                    <Col className="mb-2">
                                      <Form.Label>Organised by</Form.Label>
                                      <Field name={`list[${index}].credit`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                <div className='w-100'></div>
                                {
                                  m.hasOwnProperty('footer') && (
                                    <Col sm={12} className="mb-2">
                                      <Form.Label>Footer</Form.Label>
                                      <Field as="textarea" name={`list[${index}].footer`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('description') && (
                                    <Col sm={12} className="mb-2">
                                      <Form.Label>Description</Form.Label>
                                      <Rte fieldname={`list[${index}].description`} value={form.values.list[index].description}></Rte>
                                      {/* <Field as="textarea" name={`list[${index}].description`} className="form-control form-control-sm" /> */}
                                    </Col>
                                  )
                                }
                              </Row>
                            ))
                          ) : (
                            <div className='w-100 mb-2'>
                              <div className='btn btn-sm btn-danger b-radius-0 w-100' onClick={() => push(getListItem())}>Add item</div>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                />
              )
            }
            {
              form.values.hasOwnProperty('btnList') && (
                <FieldArray name="btnList"
                  render={
                    ({ remove, insert, swap, push }) => (
                      <div>
                        <hr />
                        <Form.Label>Button List:</Form.Label>
                        {
                          form.values.btnList.length > 0 ? (
                            form.values.btnList.map((m, index) => (
                              <Row key={`btnList-update-${index}`} className="my-3 pt-2 bg-light m-0" style={{ position: 'relative' }}>
                                <div className='list-close h4' >
                                  <AiFillPlusCircle onClick={() => insert(index, getListItem())} />
                                  <AiFillUpCircle onClick={() => swap(index, index - 1)} className={index === 0 && 'd-none'} />
                                  <AiFillDownCircle onClick={() => swap(index, index + 1)} className={index === form.values.btnList.length - 1 && 'd-none'} />
                                  <AiFillCloseCircle onClick={() => remove(index)} />
                                </div>
                                {
                                  m.hasOwnProperty('btnLink') && (
                                    <Col sm={6} className="mb-2">
                                      <Form.Label>Button Link</Form.Label>
                                      <Field name={`btnList[${index}].btnLink`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                                {
                                  m.hasOwnProperty('btnText') && (
                                    <Col sm={6} className="mb-2">
                                      <Form.Label>Button Text</Form.Label>
                                      <Field name={`btnList[${index}].btnText`} className="form-control form-control-sm" />
                                    </Col>
                                  )
                                }
                              </Row>
                            ))
                          ) : (
                            <div className='w-100 mb-2'>
                              <div className='btn btn-sm btn-danger w-100' onClick={() => push(getListItem())}>Add Button</div>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                />
              )
            }
            <Row className='mb-2'>
              <Col className='text-center'>
                <hr />
                {
                  submitted ? (
                    <Spinner animation="border" />
                  ) : (
                    <button type="submit" className='btn btn-sm btn-dark m-auto w-100'>Submit</button>
                  )
                }
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </Fragment>
  )
}

export default UpdateComponent