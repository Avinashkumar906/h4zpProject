import React, { Fragment, useEffect, useState } from "react";
import DynamicComponent from "../components/Component";
import { useLocation, useParams } from 'react-router-dom'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { deleteDocById, getDocList } from "../firebase/util";
import { CModal } from "../components/modal/Modal";

export default function Page(props) {

  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [modalState, setModalState] = useState(false);
  const editable = useQuery().get("editable");
  const { page } = useParams();
  
  const handleClose = () => setModalState(false);
  
  const onDelete = (docId, collection) => {
    console.log('deletting => ', docId, collection )
    if (window.confirm('Are you sure you want to Delete?'))
      deleteDocById(collection, docId, console.log)
  }

  const onFetch = (collection) => {
    getDocList(collection, (data) => setData(data))
  }
  
  const onEdit = (docId, collection, data) => {
    setModalState(true);
    setModalData({ docId, collection, data })
  }
  
  useEffect(() => {
    onFetch(page);
  }, [page, editable]);

  return (
    <Fragment>
      {
        data?.sort((a,b)=>a.data.order-b.data.order)
          .map((m)=>(
            <div key={m.id} style={{position:'relative'}}>
              <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
              {
                editable === 'true' ? (
                <div className="h5 editable">
                  <div className="p-2 btn btn-warning b-radius-0" onClick={() => onEdit(m.id, page, m.data)}><AiFillEdit/></div>
                  <div className="p-2 btn btn-warning b-radius-0" onClick={() => onDelete(m.id, page)}><AiFillDelete/></div>
                </div>
                ) : ('')
              }
            </div>
          ))
      }
      <CModal show={modalState} close={handleClose} data={modalData}></CModal>
    </Fragment>
  )
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}