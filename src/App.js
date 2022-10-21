import React, { Fragment, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const[navOnTop, setNavOnTop] = useState(true)
  useEffect(()=>{
    window.addEventListener('scroll', ()=>
      setNavOnTop(!window.pageYOffset)
    )
    return 
  },[])

  return (
    <Fragment>
      <Header navOnTop={navOnTop} />
      {/* Routing of application */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}/> 
        <Route path="/home" element={<Home />} />  
      </Routes>
      <Footer theme={'bg-dark'}/>
    </Fragment>
  );
}

export default App;
