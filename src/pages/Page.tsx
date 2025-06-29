import { Fragment, useEffect, useState } from 'react';
import DynamicComponent from '../components/Component';
import { useParams } from 'react-router-dom';
import { AiFillEdit, AiFillDelete, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { deleteComponentOfPage } from '../firebase/util';
import { CModal } from '../components/modal/Modal';
import { ListGroup } from 'react-bootstrap';
import NotFound from './NotFound';
import { getMockdata } from '../util/mockData.util';
import { subscribePageComponents } from '../firebase/firebase.util';
// import { scrollTo } from 'scroll-js';

export default function Page(props: any) {
  const { isAuth, editable } = props;
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [modalState, setModalState] = useState(false);
  const { page } = useParams();
  const [loading, setLoading] = useState(true);

  const handleClose = () => setModalState(false);

  const onDelete = (docId, collection) => {
    if (window.confirm('Are you sure you want to Delete?'))
      deleteComponentOfPage(collection, docId, console.log);
  };

  const onEdit = (docId, collection, data) => {
    setModalState(true);
    setModalAction('EDIT');
    const patched = getMockdata(data.component, data);
    setModalData({ docId, collection, data: patched });
  };

  const onAddComponent = () => {
    setModalAction('ADD');
    setModalState(true);
    setModalData(null);
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', () => {
        setLoading(false);
      });
    }

    let unsubscribe;
    const init = async () => {
      unsubscribe = await subscribePageComponents(page, (res) => {
        setData(res);
      });
    };
    init();

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('load', () => setLoading(false));
    };
  }, [page]);

  if (loading) {
    // console.log('Loading')
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'black' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return data ? (
    <Fragment>
      {data
        ?.sort((a, b) => a.data.order - b.data.order)
        .map((m) => (
          <div key={m.id} style={{ position: 'relative' }}>
            <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
            {isAuth && editable === 'true' ? (
              <div className="h5 editable">
                <ListGroup horizontal className="pointer">
                  <ListGroup.Item onClick={() => onEdit(m.id, page, m.data)}>
                    <AiFillEdit />
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => onDelete(m.id, page)}>
                    <AiFillDelete />
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      {modalState ? (
        <CModal
          show={modalState}
          close={handleClose}
          data={modalData}
          action={modalAction}
          pageID={page}
        ></CModal>
      ) : (
        ''
      )}
      {isAuth && editable === 'true' && (
        <div className="floating-icon">
          <ListGroup
            horizontal
            className="pointer"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <ListGroup.Item onClick={onAddComponent}>
              <AiOutlineAppstoreAdd />
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <NotFound pageID={page}></NotFound>
    </Fragment>
  );
}
