import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound({ pageID }: any) {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);
  const [page] = useState(pageID);

  useEffect(() => {
    let interval;
    function routeTimerStart() {
      let temp = 5;
      interval = setInterval(() => {
        if (temp > 1) setTimer(--temp);
        else navigate('/home');
      }, 1000);
    }
    routeTimerStart();
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className="flex-grow-1 bg-dark text-light d-flex flex-column justify-content-center align-items-center"
      style={{ borderBottom: '1px solid' }}
    >
      <div className="text-center">
        <div className="h4 my-4">
          ID does&#39;t Exist. Please go to admin section and create a page with &#34;{page}&#34; as
          Page ID.
          <br />
        </div>
        <div className="h2 my-3">Page will redirect in {timer} seconds.</div>
      </div>
    </div>
  );
}

export default NotFound;
