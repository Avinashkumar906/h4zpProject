import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Page from './pages/Page';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { FIREBASE_AUTH } from './firebase/firebase';
import { useSubdomain } from './hook/useSubDomain';
import HRMSApp from './hrms';

function App() {
  const [navOnTop, setNavOnTop] = useState(true);
  const [isAuth, setIsAuth] = useState(FIREBASE_AUTH.currentUser);
  const isHRMS = useLocation().pathname.startsWith('/hrms');
  const subdomain = useSubdomain();

  useEffect(() => {
    window.addEventListener('scroll', () => setNavOnTop(!window.pageYOffset));
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) =>
      user ? setIsAuth(user) : setIsAuth(null),
    );
    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      {!isHRMS && <Header navOnTop={navOnTop} isAuth={isAuth} editable={subdomain === 'admin'} />}
      <div className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/index" />} />
          <Route
            path="/:page"
            element={<Page isAuth={isAuth} editable={subdomain === 'admin'} />}
          />
          <Route path="/hrms/*" element={<HRMSApp />} />
          <Route path="*" element={<Navigate to="/index" />} />
        </Routes>
      </div>
      {!isHRMS && <Footer theme={'bg-dark'} />}
    </Fragment>
  );
}

export default App;
