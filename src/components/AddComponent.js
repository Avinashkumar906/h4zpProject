import React, { Fragment } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { MOCK_BANNER, MOCK_BLOGS, MOCK_GROUP, MOCK_IFRAME, MOCK_JUMBOTRON, MOCK_NEWS } from '../mockdata/mockData'

function AddComponent({ onComponentChange }) {
  const handleChange = (selectedComponent) => {
    switch (selectedComponent) {
      case 'banner':
        return onComponentChange(MOCK_BANNER)
      case 'jumbotron':
        return onComponentChange(MOCK_JUMBOTRON)
      case 'news':
        return onComponentChange(MOCK_NEWS)
      case 'blogs':
        return onComponentChange(MOCK_BLOGS)
      case 'iframe':
        return onComponentChange(MOCK_IFRAME)
      case 'group':
        return onComponentChange(MOCK_GROUP)
      default:
        break;
    }
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