import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRef } from 'react';
import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import { FIREBASE_AUTH } from '../../firebase/firebase';
import LoginForm from './LoginForm';
import { FaTools } from 'react-icons/fa';

function Tool(props: any) {
  const { isAuth } = props;
  const dropDownRef = useRef(null);

  const handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const onLogout = () => {
    signOut(FIREBASE_AUTH);
  };

  return (
    <DropdownButton id="no-caret" ref={dropDownRef} align="end" title="Login" variant="dark py-1">
      {isAuth ? <></> : <LoginForm handleLogin={handleLogin} />}
    </DropdownButton>
  );
}

export default Tool;
