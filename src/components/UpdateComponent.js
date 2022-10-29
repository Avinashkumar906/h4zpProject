import React, { Fragment, useState } from 'react';
import { useFormik } from 'formik';
import { Col, Form, Row } from 'react-bootstrap';


const UpdateComponent = props => {
  const [formData] = useState(props.data.data)

  const formik = useFormik({
    initialValues: formData,
    onSubmit: values => props.onUpdate(values)
  });

  // console.log(formData);
  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Row className='mb-2'>
        {
          formData.hasOwnProperty('fluid') && (
            <Col sm={3} className="mb-2">
              <Form.Label>Width</Form.Label>
              <Form.Select size='sm' name="fluid" id="fluid" value={formik.values.fluid} onChange={formik.handleChange}>
                <option value="true">Full</option>
                <option value="false">Default</option>
              </Form.Select>
            </Col>
          )
        }
        {
          formData.hasOwnProperty('parallax') && (
            <Col sm={3} className="mb-2">
              <Form.Label>Scroll Effect</Form.Label>
              <Form.Select size='sm' name="parallax" id="parallax" value={formik.values.parallax} onChange={formik.handleChange}>
                <option value="true">Parallax</option>
                <option value="false">No Effect</option>
              </Form.Select>
            </Col>
          )
        }
        {
          formData.hasOwnProperty('theme') && (
            <Col sm={3} className="mb-2">
              <Form.Label>Background</Form.Label>
              <Form.Select size='sm' name="theme" id="theme" value={formik.values.theme} onChange={formik.handleChange}>
                <option value=''>No Background</option>
                <option value="bg-light">Light</option>
              </Form.Select>
            </Col>
          )
        }
        {
          formData.hasOwnProperty('order') && (
            <Col sm={3} className="mb-2">
              <Form.Label>Position</Form.Label>
              <Form.Control size='sm' type="number" name="order" id="order" value={formik.values.order} onChange={formik.handleChange} />
            </Col>
          )
        }
        {
          formData.hasOwnProperty('imgRatio') && (
            <Col sm={3} className="mb-2">
              <Form.Label>Aspect ratio</Form.Label>
              <Form.Control size='sm' name="imgRatio" value={formik.values.imgRatio} onChange={formik.handleChange}/>
            </Col>
          )
        }
        </Row>
        <Row className='mb-2'>
          {
            formData.hasOwnProperty('title') && (
              <Col sm={12} className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control size='sm' name="title" value={formik.values.title} onChange={formik.handleChange}/>
              </Col>
            )
          }
          {
            formData.hasOwnProperty('subTitle') && (
              <Col sm={12} className="mb-2">
                <Form.Label>Sub title</Form.Label>
                <Form.Control size='sm' as="textarea" name="subTitle" value={formik.values.subTitle} onChange={formik.handleChange}/>
              </Col>
            )
          }
          {
            formData.hasOwnProperty('description') && (
              <Col sm={12} className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control size='sm' as="textarea" name="description" value={formik.values.description} onChange={formik.handleChange}/>
              </Col>
            )
          }
        </Row>
        {
          formData.hasOwnProperty('list') && (
            <div>
              {
                formData.list.map((m,index) => (
                  <Row key={`list-update-${index}`}>
                    {
                      m.hasOwnProperty('title') && (
                        <Col sm={6} className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control size='sm' type="text" name={`list[${index}].title`} value={formik.values.list[index].title} onChange={formik.handleChange} />
                        </Col>
                      )
                    }
                    {
                      m.hasOwnProperty('subTitle') && (
                        <Col sm={6} className="mb-2">
                          <Form.Label>Sub title</Form.Label>
                          <Form.Control size='sm' type="text" name={`list[${index}].subTitle`} value={formik.values.list[index].subTitle} onChange={formik.handleChange} />
                        </Col>
                      )
                    }
                    {
                      m.hasOwnProperty('url') && (
                        <Col className="mb-2">
                          <Form.Label>Image Url</Form.Label>
                          <Form.Control size='sm' type="text" name={`list[${index}].url`} value={formik.values.list[index].url} onChange={formik.handleChange} />
                        </Col>
                      )
                    }
                  </Row>
                ))
              }
            </div>
          )
        }
        {
          formData.hasOwnProperty('btnList') && (
            <div>
              {
                formData.btnList.map((m,index) => (
                  <Row key={`btnList-update-${index}`}>
                    {
                      m.hasOwnProperty('btnLink') && (
                        <Col sm={6} className="mb-2">
                          <Form.Label>Button link</Form.Label>
                          <Form.Control size='sm' type="text" name={`btnList[${index}].btnLink`} value={formik.values.btnList[index].btnLink} onChange={formik.handleChange} />
                        </Col>
                      )
                    }
                    {
                      m.hasOwnProperty('btnText') && (
                        <Col sm={6} className="mb-2">
                          <Form.Label>Button teaxt</Form.Label>
                          <Form.Control size='sm' type="text" name={`btnList[${index}].btnText`} value={formik.values.btnList[index].btnText} onChange={formik.handleChange} />
                        </Col>
                      )
                    }
                  </Row>
                ))
              }
            </div>
          )
        }
        <Row>
          <Col>
            <button type="submit" className='btn btn-dark'>Submit</button>
          </Col>
        </Row>
      </form>
      {/* {JSON.stringify(props.data)} */}
    </Fragment>
  )
}

export default UpdateComponent