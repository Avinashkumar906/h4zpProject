import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useFormik } from 'formik'
import React, { Fragment } from 'react'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { FIREBASE_AUTH } from '../../firebase/firebase'

function Tool(props) {
  const {isAuth} = props;
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit: ({email,password}) => signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
  })

  const formik2 = useFormik({
    initialValues:{
      pageName:''
    },
    onSubmit: ({pageName}) => console.log(pageName)
  })

  const onLogout = () => {
    signOut(FIREBASE_AUTH)
  }

  return (
    <DropdownButton size='sm' align="end" title="ADMIN" variant="dark">
      {
        isAuth ? (
        <Fragment>
          <Form className='p-2' onSubmit={formik2.handleSubmit} style={{minWidth:'250px'}}>
            <Form.Group className="mb-2" controlId="pageName">
              <Form.Control name='pageName' value={formik2.values.pageName} onChange={formik2.handleChange} size='sm' placeholder="Page name (optional)" />
            </Form.Group>
            <div className='text-center'>
              <Button variant="dark" className=' w-100' size='sm' type="submit">
                Create Page
              </Button>
            </div>
          </Form>
          <Dropdown.Divider />
          <div className='p-2 d-flex' style={{minWidth:'250px'}}>
            <Button variant="dark" className=' w-100' size='sm' type="button" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </Fragment>
        ) : (
          <Form className='p-2' onSubmit={formik.handleSubmit} style={{minWidth:'250px'}}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Control name='email' value={formik.values.email} onChange={formik.handleChange} size='sm' type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Control name='password' value={formik.values.password} onChange={formik.handleChange} size='sm' type="password" placeholder="Password" />
            </Form.Group>
            <div className='text-center'>
              <Button variant="dark" className=' w-100' size='sm' type="submit">
                Login
              </Button>
            </div>
          </Form>
        )
      }
    </DropdownButton>
  )
}

export default Tool