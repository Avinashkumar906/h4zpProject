import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Page from './pages/Page';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { FIREBASE_AUTH } from './firebase/firebase';
import Blog from './pages/Blog';
import * as React from 'react';

function App() {
  const [navOnTop, setNavOnTop] = useState(true)
  const [isAuth, setIsAuth] = useState(FIREBASE_AUTH.currentUser)
  const editable = useQuery().get("editable");

  useEffect(() => {
    window.addEventListener('scroll', () => setNavOnTop(!window.pageYOffset))
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
      (user) => user ? setIsAuth(user) : setIsAuth(null)
    )
    return () => unsubscribe();
  }, [])

  return (
    <Fragment>
      <Header navOnTop={navOnTop} isAuth={isAuth} editable={editable} />
      <div className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:page" element={<Page isAuth={isAuth} editable={editable} />} />
          <Route path='*' element={<Navigate to="/home" />} />
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
