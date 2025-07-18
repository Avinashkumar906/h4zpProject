import { Row } from 'react-bootstrap';
import { safeParseHtml } from '../editor/rte.util';

const Description = ({ description }: { description: string }) => {
  const html = safeParseHtml(description);

  if (!html) return null;

  return <Row>{html}</Row>;
};

export default Description;
