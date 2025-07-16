import { Col } from 'react-bootstrap';

const Title = ({ title }: { title: string }) => {
  if (!title) return null;

  return (
    <Col sm={12} className="my-2">
      <h3 className="text-center">
        <strong>{title}</strong>
      </h3>
    </Col>
  );
};

export default Title;
