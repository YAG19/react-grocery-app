import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert , list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, // eslint-disable-next-line
  [list] // eslint-disable-next-line
  );
  // eslint-disable-next-line

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
