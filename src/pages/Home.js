import React, { Fragment, useEffect, useState } from "react";
import DynamicComponent from "../components/Component";
import Jumbotron from '../components/jumbotron/Jumbotron';
// import of static data
import { FIRESTORE_DB } from '../firebase/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore/lite'
import { BANNER_LIST, BLOG_LIST, GROUP, GROUP_2, IFRAME_SRC_1, JUMBOTRON_1, NEWS_LIST } from '../dummy/dummy';

export default function Home(props) {

  const [data, setData] = useState();

  useEffect(() => {
    let testCol = collection(FIRESTORE_DB, 'home');
    // addDoc(testCol,GROUP_2).then(console.log)
    getDocs(testCol).then((r) => setData(r.docs.map(
      doc => ({ id: doc.id, data: doc.data() })
    )));
    return () => console.log('Home cleanup code');
  }, []);
  // console.log('=>', data)

  return (
    <Fragment>
      {
        data?.sort((a,b)=>a.data.order-b.data.order)
          .map((m)=>(
            <DynamicComponent key={m.id} data={m.data} id={m.id}></DynamicComponent>
          ))
      }
      {/*
      <Group theme={'bg-light'}  data={GROUP_2}/> */}
    </Fragment>
  )
}