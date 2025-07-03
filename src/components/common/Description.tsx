import { Row } from 'react-bootstrap';
import { safeParseHtml } from '../editor/rte.util';

const Description = ({ description }: { description: string }) => {
  const html = safeParseHtml(description);

  if (!html) return null;

  return (
    <Row>
      <div style={{ whiteSpace: 'pre-wrap' }}>{html}</div>
    </Row>
  );
};

export default Description;
