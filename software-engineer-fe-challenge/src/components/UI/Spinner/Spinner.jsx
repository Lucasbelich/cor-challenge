import React from "react";
import "./Spinner.styles.css";

const Spinner = ({ size = "medium", text = "", className = "" }) => {
  return (
    <div className={`spinner-container ${className}`}>
      <div className={`spinner ${size}`}></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default Spinner; 