import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { CTAGroupListType, CTAGroupType } from '../../util';
import './style.css';
import Description from '../common/Description';

type ComponentPropType = {
  data: CTAGroupType;
  id?: string;
};
function ModalGroup({ data, id }: ComponentPropType) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState<CTAGroupListType>();
  const columnBreakpoints = {
    576: 12 / +data.column.sm,
    768: 12 / +data.column.md,
    992: 12 / +data.column.lg,
    1200: 12 / +data.column.xl,
  };

  const handleClose = () => {
    setModalData(undefined);
    setShow(false);
  };
  const handleShow = (card) => {
    setModalData(card);
    setShow(true);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Description description={modalData?.description} />
        </Modal.Body>
      </Modal>
      <ResponsiveMasonry columnsCountBreakPoints={columnBreakpoints}>
        <Masonry>
          {data.list?.map((item, index) => (
            <div
              key={id + index}
              className={`card w-100 shadow-sm payment-card ${open ? 'open' : ''}`}
              onClick={() => handleShow(item)}
            >
              <div className="card-body d-flex align-items-center gap-2">
                {item.url && <img src={item.url} alt={`${id} icon`} height={48} />}
                <div>
                  {item.label && <div className="h6 mb-1">{item.label}</div>}
                  {item.title && <p className="small card-text text-muted mb-0">{item.title}</p>}
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default ModalGroup;
