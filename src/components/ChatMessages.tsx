import { Tmessage } from "../utils/types";

export const Message = ({ text, type, prediction }: Tmessage) => {
  return (
    <div className={`message ${type}`}>
      {text ? <p>{text}</p> : <p className="loading-animation">...</p>}
      {prediction && (
        <span className="prediction">
          {prediction?.charAt(0).toUpperCase() + prediction?.slice(1)}
        </span>
      )}
    </div>
  );
};
