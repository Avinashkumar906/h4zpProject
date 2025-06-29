import { Field, Formik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function LoginForm({ handleLogin }: any) {
  const [loginForm] = useState({ email: '', password: '' });
  return (
    <Formik enableReinitialize initialValues={loginForm} onSubmit={handleLogin}>
      {({ handleSubmit }) => (
        <Form className="p-2" onSubmit={handleSubmit} style={{ minWidth: '250px' }}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Field
              name="email"
              className="form-control form-control-sm"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Field
              name="password"
              className="form-control form-control-sm"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className=" w-100" size="sm" type="submit">
              Login
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
