import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Page from './pages/Page';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { FIREBASE_AUTH } from './firebase/firebase';
import * as React from 'react';
import { isTrue } from './util';
import { useSubdomain } from './hook/useSubDomain';

function App() {
  const [navOnTop, setNavOnTop] = useState(true);
  const [isAuth, setIsAuth] = useState(FIREBASE_AUTH.currentUser);
  // const editable = useQuery().get('editable');
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
      <Header navOnTop={navOnTop} isAuth={isAuth} editable={subdomain === 'admin'} />
      <div className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/index" />} />
          <Route
            path="/:page"
            element={<Page isAuth={isAuth} editable={subdomain === 'admin'} />}
          />
          <Route path="*" element={<Navigate to="/index" />} />
        </Routes>
      </div>
      <Footer theme={'bg-dark'} />
    </Fragment>
  );
}

export default App;

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
