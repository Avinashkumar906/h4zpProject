import { Fragment, useEffect, useState } from 'react';
import DynamicComponent from '../components/Component';
import { useParams } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdAddCard } from 'react-icons/md';
import { deleteComponentOfPage } from '../firebase/util';
import { CModal } from '../components/modal/Modal';
import { ListGroup } from 'react-bootstrap';
import NotFound from './NotFound';
import { getMockdata } from '../util/mockData.util';
import { subscribePageComponents } from '../firebase/firebase.util';
import { MdOutlineRepeatOne } from 'react-icons/md';
// import { scrollTo } from 'scroll-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const { isAuth, editable } = props;
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [docId, setDocId] = useState(null);
  const { page: collection } = useParams();
  const [loading, setLoading] = useState(true);

  const handleClose = () => setModalState(false);

  const onDelete = () => {
    if (!docId) return;
    if (window.confirm('Are you sure you want to Delete?')) {
      deleteComponentOfPage(collection, docId, console.log);
    }
  };

  const onEdit = () => {
    if (!docId) return;
    setModalState(true);
    setModalAction('EDIT');
    const { data: modalData } = data.find((f) => f.id === docId);
    setModalData({ docId, collection, data: getMockdata(modalData.component, modalData) });
  };

  const componentClick = (id: string) => {
    if (isAuth && editable === 'true') {
      setDocId(id);
    }
  };

  const onAddComponent = () => {
    setModalAction('ADD');
    setModalState(true);
    setModalData(null);
  };

  const onOrder = (): void => {
    setModalAction('ORDER');
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
      unsubscribe = await subscribePageComponents(collection, (res) => {
        setData(res);
      });
    };
    init();

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('load', () => setLoading(false));
    };
  }, [collection]);

  if (loading) {
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
          <div
            className={
              `${isAuth && editable === 'true' ? 'pointer' : ''} ` +
              `${docId === m.id ? 'highlight' : ''}`
            }
            key={m.id}
            style={{ position: 'relative' }}
            onClick={() => componentClick(m.id)}
          >
            <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
          </div>
        ))}
      {modalState ? (
        <CModal
          show={modalState}
          close={handleClose}
          data={modalData}
          action={modalAction}
          pageID={collection}
        ></CModal>
      ) : (
        ''
      )}
      {isAuth && editable === 'true' && (
        <div className="floating-icon">
          <ListGroup
            horizontal="false"
            className="pointer"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <ListGroup.Item onClick={onAddComponent}>
              <MdAddCard />
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'disabled' : ''} onClick={onEdit}>
              <AiFillEdit />
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'disabled' : ''} onClick={onDelete}>
              <AiFillDelete />
            </ListGroup.Item>
            <ListGroup.Item onClick={onOrder}>
              <MdOutlineRepeatOne />
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <NotFound pageID={collection}></NotFound>
    </Fragment>
  );
}
