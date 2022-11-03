import React, { Fragment } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { getMockdata } from '../util/util'

function AddComponent({ onComponentChange }) {

  const handleChange = (selectedComponent) => {    
    return onComponentChange(getMockdata(selectedComponent));
  }

  return (
    <Fragment>
      <form onSubmit={(e) => (e.preventDefault())}>
        <Row className='mb-2'>
          <Col className="mb-2">
            <Form.Label>Component</Form.Label>
            <div className='d-flex'>
              <div className='me-2 w-100'>
                <Form.Control as='select' className="form-select form-select-sm" onChange={(event) => handleChange(event.target.value)}>
                  <option>Please select a component</option>
                  <option value="banner">Banner</option>
                  <option value="blogs">Blogs</option>
                  <option value="group">Group</option>
                  <option value="iframe">Iframe</option>
                  <option value="jumbotron">Jumbotron</option>
                  <option value="news">News</option>
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
        <hr />
      </form>
    </Fragment>
  )
}

export default AddComponent