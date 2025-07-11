import { useState } from 'react';

function NotFound({ children }: any) {
  // const [page] = useState(pageID);

  return (
    <div
      className="flex-grow-1 bg-dark text-light d-flex flex-column justify-content-center align-items-center"
      style={{ borderBottom: '1px solid' }}
    >
      <div className="text-center">
        <div className="h4 my-4">{children}</div>
      </div>
    </div>
  );
}

export default NotFound;
