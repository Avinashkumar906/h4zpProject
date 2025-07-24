import { Col } from 'react-bootstrap';

const Title = ({ title }: { title: string }) => {
  if (!title) return null;

  return (
    <Col sm={12} className="">
      <div className="h1 text-center mb-3">
        <strong>{title}</strong>
      </div>
    </Col>
  );
};

export default Title;
