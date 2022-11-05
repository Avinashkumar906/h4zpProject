import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { FIREBASE_AUTH } from '../../firebase/firebase'
import { addPage } from '../../firebase/util'
import CreatePageForm from './CreatePageForm'
import LoginForm from './LoginForm'



function Tool(props) {
  const { isAuth } = props;
  const navigate = useNavigate();
  const { search } = useLocation();
  const dropDownRef = useRef(null)
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
  }

  const handlePageCreate = (values, { resetForm }) => {
    setFormSubmitted(true)
    addPage(values, (pageID) => {
      resetForm();
      setFormSubmitted(false)
      navigate(`/${pageID}${search || ''}`)
      return setTimeout(() => dropDownRef.current.click(), 100)
    })
  }

  const onLogout = () => {
    signOut(FIREBASE_AUTH)
  }

  return (
    <DropdownButton ref={dropDownRef} size='sm' align="end" title="ADMIN" variant="dark">
      {
        isAuth ? (
          <CreatePageForm handlePageCreate={handlePageCreate} onLogout={onLogout} formSubmitted={formSubmitted} />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )
      }
    </DropdownButton >
  )
}

export default Tool