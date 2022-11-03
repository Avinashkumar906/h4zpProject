import React, { Fragment, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { addComponentToPage, updateComponentOfPage } from '../../firebase/util';
import AddComponent from '../AddComponent';
import UpdateComponent from '../UpdateComponent';

export const CModal = (props) => {
  const { pageID, action } = props;
  const [formData, setFormData] = useState(props.data)

  const onUpdate = (updatedData) => {
    if (action === 'ADD') {
      addComponentToPage(pageID, updatedData, (snapShot) => console.log(snapShot.id))
    } else if (action === 'EDIT') {
      updateComponentOfPage(formData.collection, formData.docId, updatedData, console.log)
    }
  }

  const onComponentChange = (data) => {
    data ? setFormData({ data }) : setFormData(null)
  }

  const onCloseModal = () => {
    props.close()
  }

  return (
    <Modal fullscreen="lg-down" size="lg" centered show={props.show} onHide={onCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>{formData?.data?.component.toUpperCase() || 'Add Component'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          action === 'ADD' && (
            <Fragment>
              <AddComponent onComponentChange={onComponentChange} />
              {
                formData &&
                <UpdateComponent onUpdate={(updatedData) => onUpdate(updatedData)} data={formData}></UpdateComponent>
              }
            </Fragment>
          )
        }
        {
          action === 'EDIT' && (
            <UpdateComponent onUpdate={(updatedData) => onUpdate(updatedData)} data={formData}></UpdateComponent>
          )
        }
      </Modal.Body>
    </Modal>
  )
}
