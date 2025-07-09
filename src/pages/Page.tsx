import { Fragment, useEffect, useState } from 'react';
import DynamicComponent from '../components/Component';
import { useParams } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdAddCard, MdOutlineInsertPageBreak } from 'react-icons/md';
import { CModal } from '../components/modal/Modal';
import { ListGroup } from 'react-bootstrap';
import NotFound from './NotFound';
import { deleteComponentOfPage, subscribePageComponents } from '../firebase/getFromFirestore';
import { MdOutlineRepeatOne } from 'react-icons/md';
import { copyToClipboard, isTrue, pasteFromClipboard } from '../util';
import { FaCopy, FaPaste } from 'react-icons/fa';
// import Statistics from '../components/statistics/Statistics';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  const { isAuth, editable } = props;
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [docId, setDocId] = useState(null);
  const { page: collection } = useParams();

  const handleClose = () => setModalState(false);

  const onDelete = () => {
    if (!docId) return;
    if (window.confirm('Are you sure you want to Delete?')) {
      deleteComponentOfPage(collection, docId, (res) => {
        console.log(res);
        setDocId(null);
      });
    }
  };

  const onEdit = () => {
    if (!docId) return;
    setModalState(true);
    setModalAction('EDIT');
    setModalData({ docId, collection, data });
  };

  const componentClick = (id: string) => {
    if (isAuth && editable) {
      setDocId(id);
    }
  };

  const onAddComponent = () => {
    setModalAction('ADD');
    setModalState(true);
    setModalData({ docId, collection, data });
  };

  const onOrder = (): void => {
    setModalAction('ORDER');
    setModalState(true);
    setModalData({ data });
  };

  const onPageMeta = () => {
    setModalAction('PAGE');
    setModalState(true);
    setModalData({ data });
  };

  const handleCopy = () => {
    const item = data.find((f) => f.id === docId);
    copyToClipboard(item);
  };

  const handlePaste = () => {
    console.log('✅ Paste:', pasteFromClipboard());
  };
  useEffect(() => {
    let unsubscribe;
    const init = async () => {
      unsubscribe = await subscribePageComponents(collection, (res) => {
        setData(res);
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [collection]);

  return data ? (
    <Fragment>
      {(data ?? [])
        .sort((a, b) => a.data?.order - b.data?.order)
        .filter((f) => (isAuth && editable) || isTrue(f.data?.visibility) === true)
        .map((m) => (
          <div
            className={
              `${isAuth && editable ? 'pointer' : ''} ` + `${docId === m.id ? 'highlight' : ''}`
            }
            key={m.id}
            style={{ position: 'relative' }}
            onClick={() => componentClick(m.id)}
          >
            <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
          </div>
        ))}
      {/* <Statistics></Statistics> */}
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
      {isAuth && editable && (
        <div className="floating-icon">
          <ListGroup
            horizontal="false"
            className="pointer align-items-end b-radius-1"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <ListGroup.Item onClick={onAddComponent}>
              <MdAddCard />
              <span className="hover-label">Add</span>
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'not-allowed' : ''} onClick={onEdit}>
              <AiFillEdit />
              <span className="hover-label">Edit</span>
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'not-allowed' : ''} onClick={onDelete}>
              <AiFillDelete />
              <span className="hover-label">Delete</span>
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'not-allowed' : ''} onClick={handleCopy}>
              <FaCopy />
              <span className="hover-label">Copy</span>
            </ListGroup.Item>
            <ListGroup.Item className={!docId ? 'not-allowed' : ''} onClick={handlePaste}>
              <FaPaste />
              <span className="hover-label">Paste</span>
            </ListGroup.Item>
            <ListGroup.Item onClick={onOrder}>
              <MdOutlineRepeatOne />
              <span className="hover-label">Order</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <MdOutlineInsertPageBreak />
              <span className="hover-label" onClick={onPageMeta}>
                Page Meta
              </span>
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
