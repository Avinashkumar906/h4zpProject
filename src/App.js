import React, { Fragment } from 'react';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import Jumbotron from './components/jumbotron/Jumbotron';
import Group from './components/group/Group';
import Blogs from './components/Bloglist/Blogs';
import { Container } from 'react-bootstrap';
import Iframe from './components/iframe/Iframe';

function App() {
  return (
    <Fragment>
      <Header></Header>
      <Banner data={[1,1,1]}></Banner>
      <Jumbotron></Jumbotron>
      <Container fluid className='bg-light'>
        <Group></Group>
      </Container>
      <Blogs></Blogs>
      <Container fluid className='bg-light'>
        <Iframe></Iframe>
      </Container>
    </Fragment>
  );
}

export default App;
