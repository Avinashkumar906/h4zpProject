import { Link } from 'react-router-dom';
import { ButtonList, isExternalLink } from '../../util/mockData.util';

function Buttons({ data, id }: { data: ButtonList; id: string }) {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {data?.map((m, index) => (
          <Link
            role="button"
            key={`${id}-btn-${index}`}
            rel={isExternalLink(m.btnLink) ? 'noopener noreferrer' : undefined}
            to={m.btnLink}
            target={isExternalLink(m.btnLink) ? '_blank' : '_self'}
            className={`btn ${m.btnColor}`}
          >
            {m.btnText}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Buttons;
