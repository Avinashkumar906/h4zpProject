import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/MinimalCard.css';
import { GroupListType } from '../../util';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { safeParseHtml } from '../editor/rte.util';

type componentPropType = {
  data: GroupListType | undefined;
  id: string;
};

const MinimalCard = ({ data }: componentPropType) => {
  // const [parsed] = useState()
  return (
    <Card className="minimal-card h-100">
      <Card.Img variant="top" src={data.url} />
      {safeParseHtml(data.description) && (
        <div className="card-body">{safeParseHtml(data.description)}</div>
      )}
    </Card>
  );
};

export default MinimalCard;
