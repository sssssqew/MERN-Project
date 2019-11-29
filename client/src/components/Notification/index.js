import React from "react";

import "./Notification.scss";

const Notification = ({ active, msg }) => {
  const notifyClassName = active
    ? "notify display-block"
    : "notify display-none";
  return (
    <div className={notifyClassName}>
      <p>{msg}</p>
    </div>
  );
};

export default Notification;
