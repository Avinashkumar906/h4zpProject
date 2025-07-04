import { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  addAndUpdatePage,
  addComponentToPage,
  updateComponentOfPage,
  updateMultipleComponentsOfPage,
} from '../../firebase/getFromFirestore';
import AddComponent from '../AddComponent';
import UpdateComponent from '../UpdateComponent';
import { componentOptions, getMockdata } from '../../util';
import DraggableList from '../SortComponent';
import PageForm from '../header/PageForm';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CModal = (props: any) => {
  const { pageID, action, data: page } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();

  const modalData = page.data.find((f) => f.id === page?.docId);

  const [formData, setFormData] = useState(
    action === 'EDIT' ? { data: getMockdata(modalData.data.component, modalData.data) } : null,
  );

  const onUpdate = (formvalue) => {
    if (action === 'ADD') {
      formvalue.order = page.data.length;
      addComponentToPage(pageID, formvalue, (snapShot) => console.log(snapShot.id));
    } else if (action === 'EDIT') {
      updateComponentOfPage(page.collection, page.docId, formvalue, console.log);
    }
  };

  const onSort = (page) => {
    const pageData = page.map((item, index) => {
      item.data.order = index;
      return item;
    });
    updateMultipleComponentsOfPage(pageID, pageData, console.log);
  };

  const onComponentChange = (data) => {
    data ? setFormData({ data }) : setFormData(null);
  };

  const onCloseModal = () => {
    props.close();
  };

  const handlePageCreate = (values, { resetForm }) => {
    setFormSubmitted(true);
    addAndUpdatePage(values, (pageID, err) => {
      setFormSubmitted(false);
      if (pageID) {
        resetForm();
        navigate(`/${pageID}${search || ''}`);
        onCloseModal();
      } else {
        console.log(err);
        alert('Some error occured, try after come time');
      }
    });
  };

  const handlePageUpdate = (values) => {
    setFormSubmitted(true);
    addAndUpdatePage(values, (pageID, err) => {
      setFormSubmitted(false);
      if (pageID) {
        onCloseModal();
      } else {
        console.log(err);
        alert('Some error occured, try after come time');
      }
    });
  };

  const title = () => {
    switch (action) {
      case 'EDIT':
        return componentOptions.find((f) => f.value === formData?.data?.component)?.label;
      case 'ADD':
        return 'Add Component';
      case 'ORDER':
        return 'Rearrange Page';
      case 'PAGE':
        return 'Add New Page';
      default:
        return '';
    }
  };

  return (
    <Modal fullscreen="lg-down" size="lg" centered show={props.show} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === 'ADD' && (
          <Fragment>
            <AddComponent onComponentChange={onComponentChange} />
            {formData && (
              <UpdateComponent
                onUpdate={(updatedData) => onUpdate(updatedData)}
                data={formData}
              ></UpdateComponent>
            )}
          </Fragment>
        )}
        {action === 'EDIT' && (
          <UpdateComponent
            onUpdate={(updatedData) => onUpdate(updatedData)}
            data={formData}
          ></UpdateComponent>
        )}
        {action === 'ORDER' && <DraggableList onSave={onSort} list={page.data} />}
        {action === 'PAGE' && (
          <PageForm
            className="d-sm-none"
            handlePageCreate={handlePageCreate}
            handlePageUpdate={handlePageUpdate}
            // onLogout={onLogout}
            formSubmitted={formSubmitted}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
