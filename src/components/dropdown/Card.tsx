import React, { Fragment, useMemo, useState } from 'react';
import './style.css';
import { safeParseHtml } from '../editor/rte.util';
import { DropdownListType } from '../../util';
import { useAutoHeight } from '../../hook/useAutoHeight';

type componentPropType = {
  data: DropdownListType[0];
  id?: string;
};
const DropdownCards = ({ data, id }: componentPropType) => {
  const [open, setOpen] = useState(false);
  const parsedDescription = useMemo(() => safeParseHtml(data.description), [data.description]);
  const { ref, style } = useAutoHeight(open, 300);

  return (
    <div
      className={`card w-100 mb-3 shadow-sm payment-card ${open ? 'open' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="card-body d-flex align-items-center gap-2">
        <img src={data.url} alt={`${id} icon`} />
        <div>
          <div className="h6 mb-1">{data.label}</div>
          <p className="small card-text text-muted mb-0">{data.title}</p>
        </div>
      </div>

      <div ref={ref} style={style}>
        <div className="card-body border-top">{parsedDescription}</div>
      </div>
    </div>
  );
};

export default DropdownCards;
