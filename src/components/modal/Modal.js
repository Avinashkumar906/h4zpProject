import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { updateDocToCollection } from '../../firebase/util';
import UpdateComponent from '../UpdateComponent';

export const CModal = (props) => {
  
  const onUpdate = (data, updatedData) => {
    // console.log(data, updatedData);
    updateDocToCollection(data.collection, data.docId, updatedData, console.log)
  }

  return (
    <Modal fullscreen size="lg" centered show={props.show} onHide={() => props.close()} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.data?.data?.component.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateComponent onUpdate={(updatedData) => onUpdate(props.data, updatedData)} data={props.data}></UpdateComponent>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="danger" onClick={() => props.close()}>
          Close
        </Button>
        <Button variant="dark">Understood</Button>
      </Modal.Footer> */}
    </Modal>
  )
}
