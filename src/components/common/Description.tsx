import { safeParseHtml } from '../editor/rte.util';

const Description = ({
  description,
  className = '',
}: {
  description: string;
  className?: string;
}) => {
  const html = safeParseHtml(description);

  if (!html) return null;

  return <div className={className}>{html}</div>;
};

export default Description;
