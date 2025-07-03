import { Col } from 'react-bootstrap';

const Title = ({ title }: { title: string }) => {
  if (!title) return null;

  return (
    <Col sm={12} data-aos="slide-up" className="my-2">
      <div className="text-center h1">
        <strong>{title}</strong>
      </div>
    </Col>
  );
};

export default Title;
