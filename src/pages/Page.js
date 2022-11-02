import React, { Fragment, useEffect, useState } from "react";
import DynamicComponent from "../components/Component";
import { useParams } from 'react-router-dom'
import { AiFillEdit, AiFillDelete, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { deleteComponentOfPage, getPageComponents } from "../firebase/util";
import { CModal } from "../components/modal/Modal";
import { ListGroup } from "react-bootstrap";

export default function Page(props) {
  const {isAuth, editable} = props;
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [modalState, setModalState] = useState(false);
  const { page } = useParams();
  
  const handleClose = () => setModalState(false);
  
  const onDelete = (docId, collection) => {
    if (window.confirm('Are you sure you want to Delete?'))
    deleteComponentOfPage(collection, docId, console.log)
  }

  const onFetch = (page) => {
    getPageComponents(page, (res) => {
      setData(res);
    })
  }
  
  const onEdit = (docId, collection, data) => {
    setModalState(true);
    setModalAction('EDIT')
    setModalData({ docId, collection, data })
  }

  const onAddComponent = () => {
    setModalAction('ADD')
    setModalState(true);
  }
  
  useEffect(() => {
    onFetch(page);
  }, [page]);

  return (
    <Fragment>
      {
        data?.sort((a,b)=>a.data.order-b.data.order)
          .map((m)=>(
            <div key={m.id} style={{position:'relative'}}>
              <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
              {
                isAuth && editable === 'true' ? (
                <div className="h5 editable">
                  <ListGroup horizontal className="pointer">
                    <ListGroup.Item onClick={() => onEdit(m.id, page, m.data)}>
                        <AiFillEdit/>
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => onDelete(m.id, page)}>
                        <AiFillDelete/>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                ) : ('')
              }
            </div>
          ))
      }
      {
        modalState ?
        <CModal show={modalState} close={handleClose} data={modalData} action={modalAction} pageID={page}></CModal> :''
      }
      {
        isAuth && editable === 'true' && (
          <div className="floating-icon">
            <ListGroup horizontal className="pointer" style={{borderTopRightRadius:0,borderBottomRightRadius:0}}>
              <ListGroup.Item onClick={onAddComponent}>
                <AiOutlineAppstoreAdd/>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )
      }
    </Fragment>
  )
}