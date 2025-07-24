import { useMemo, useState } from 'react';
import './style.css';
import { safeParseHtml } from '../editor/rte.util';
import { DropdownListType } from '../../util';
import { useAutoHeight } from '../../hook/useAutoHeight';

type componentPropType = {
  data: DropdownListType;
  id?: string;
};
const DropdownCards = ({ data, id }: componentPropType) => {
  const [open, setOpen] = useState(false);
  const parsedDescription = useMemo(() => safeParseHtml(data.description), [data.description]);
  const { ref, style } = useAutoHeight(open, 300);

  return (
    <div
      className={`card w-100 shadow-sm payment-card ${open ? 'open' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="card-body d-flex align-items-center gap-2">
        {data.url && <img src={data.url} alt={`${id} icon`} height={48} />}
        <div>
          {data.label && <div className="h6 mb-1">{data.label}</div>}
          {data.title && <p className="small card-text text-muted mb-0">{data.title}</p>}
        </div>
      </div>

      <div ref={ref} style={style}>
        <div className="card-body border-top">{parsedDescription}</div>
      </div>
    </div>
  );
};

export default DropdownCards;
