import React, { Fragment } from 'react';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import Jumbotron from './components/jumbotron/Jumbotron';
import Group from './components/group/Group';
import Blogs from './components/Bloglist/Blogs';
import Iframe from './components/iframe/Iframe';

// import of data
import { BANNER_LIST, BLOG_LIST, GROUP, GROUP_2, IFRAME_SRC_1, JUMBOTRON_1, NEWS_LIST } from './dummy/dummy';
import News from './components/news/News';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Fragment>
      <Header ></Header>
      <Banner fluid={true} data={BANNER_LIST}></Banner>
      <Jumbotron data={JUMBOTRON_1}></Jumbotron>
      <Group theme={'bg-light'} data={GROUP}/>
      <Blogs data={BLOG_LIST}/>
      <Iframe theme={'bg-light'} data={IFRAME_SRC_1}/>
      <News data={NEWS_LIST}/>
      <Group theme={'bg-light'}  data={GROUP_2}/>
      <Footer theme={'bg-dark'}></Footer>
    </Fragment>
  );
}

export default App;
