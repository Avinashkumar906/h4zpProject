import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRef, useState } from 'react';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../../firebase/firebase';
import { addPage } from '../../firebase/util';
import PageForm from './PageForm';
import LoginForm from './LoginForm';
import { FaTools } from 'react-icons/fa';

function Tool(props: any) {
  const { isAuth } = props;
  const navigate = useNavigate();
  const { search } = useLocation();
  const dropDownRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const handlePageCreate = (values, { resetForm }) => {
    setFormSubmitted(true);
    addPage(values, (pageID) => {
      resetForm();
      setFormSubmitted(false);
      navigate(`/${pageID}${search || ''}`);
      return setTimeout(() => dropDownRef.current.click(), 100);
    });
  };

  const onLogout = () => {
    signOut(FIREBASE_AUTH);
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        id="no-caret"
        ref={dropDownRef}
        align="end"
        title={
          <>
            Admin <FaTools />
          </>
        }
        variant="dark"
        size="sm"
      >
        {isAuth ? (
          <PageForm
            handlePageCreate={handlePageCreate}
            onLogout={onLogout}
            formSubmitted={formSubmitted}
          />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
      </DropdownButton>
    </>
  );
}

export default Tool;
