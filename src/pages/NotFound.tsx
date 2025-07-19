// import { ScaleLoader } from "react-spinners";

function NotFound({ children }: any) {
  return (
    <div
      className="d-flex position-absolute inset-0 justify-content-center align-items-center bg-lilac"
      style={{ zIndex: 2000, position: 'absolute', inset: 0, height: '100dvh', width: '100vw' }}
    >
      <div className="text-center">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default NotFound;
