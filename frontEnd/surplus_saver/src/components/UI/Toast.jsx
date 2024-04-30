/* eslint-disable react/prop-types */
const Toast = ({ info, success, error, content }) => {
  return (
    <div className="toast toast-end">
      {info && (
        <div className="alert alert-info">
          <span>{content}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>{content}</span>
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          <span>{content}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
