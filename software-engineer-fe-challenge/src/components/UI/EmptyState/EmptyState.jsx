import React from "react";
import "./EmptyState.styles.css";

const EmptyState = ({ title }) => {
  return (
    <div className="empty-state">
      <h3 className="empty-title">{title}</h3>
    </div>
  );
};

export default EmptyState;
