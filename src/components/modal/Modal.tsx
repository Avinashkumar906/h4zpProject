import { Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addComponentToPage, updateComponentOfPage } from '../../firebase/util';
import AddComponent from '../AddComponent';
import UpdateComponent from '../UpdateComponent';
import { componentOptions } from '../../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CModal = (props: any) => {
  const { pageID, action } = props;
  const [formData, setFormData] = useState(props.data);

  const onUpdate = (updatedData) => {
    if (action === 'ADD') {
      addComponentToPage(pageID, updatedData, (snapShot) => console.log(snapShot.id));
    } else if (action === 'EDIT') {
      updateComponentOfPage(formData.collection, formData.docId, updatedData, console.log);
    } else if (action === 'ORDER') {
      console.log('Save order function!');
    }
  };

  const onComponentChange = (data) => {
    data ? setFormData({ data }) : setFormData(null);
  };

  const onCloseModal = () => {
    props.close();
  };

  return (
    <Modal fullscreen="lg-down" size="lg" centered show={props.show} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {componentOptions.find((f) => f.value === formData?.data?.component)?.label ||
            'Add Component'}
        </Modal.Title>
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
        {action === 'ORDER' && <div>Order component in progress!</div>}
      </Modal.Body>
    </Modal>
  );
};
