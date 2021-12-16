import React, { useState, useEffect } from "react";

import { Close } from "@bigbinary/neeto-icons";

const ProgressBar = ({ uppy }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    uppy.on("progress", setProgress);
  }, [uppy]);

  const progressPercentage = `${progress}%`;

  return (
    <div className="neeto-editor-progress-bar__wrapper">
      <div className="neeto-editor-progress-bar__percent">
        <p>{progressPercentage}</p>
        <button type="button" onClick={uppy.cancelAll}>
          <Close size={16} />
        </button>
      </div>
      <div className="neeto-editor-progress-bar__indicator">
        <div
          style={{ width: progressPercentage }}
          className="neeto-editor-progress-bar__indicator-inner"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
