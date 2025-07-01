import { Fragment } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { getMockdata } from '../util/mockData.util';
import { componentOptions } from '../util';

function AddComponent({ onComponentChange }: { onComponentChange: any }) {
  const handleChange = (selectedComponent) => {
    return onComponentChange(getMockdata(selectedComponent));
  };

  return (
    <Fragment>
      <form onSubmit={(e) => e.preventDefault()}>
        <Row className="mb-2">
          <Col className="mb-2">
            <Form.Label>Component</Form.Label>
            <div className="d-flex">
              <div className="me-2 w-100">
                <Form.Control
                  as="select"
                  className="form-select form-select-sm"
                  onChange={(event) => handleChange(event.target.value)}
                >
                  {componentOptions.map((opt) => (
                    <option key={opt.value || 'placeholder'} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
        <hr />
      </form>
    </Fragment>
  );
}

export default AddComponent;
