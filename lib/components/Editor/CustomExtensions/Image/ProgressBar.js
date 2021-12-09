import React, { useState, useEffect } from "react";

import { Close } from "@bigbinary/neeto-icons";

const ProgressBar = ({ uppy }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    uppy.on("progress", setProgress);
  }, [uppy]);

  const progressPercentage = `${progress}%`;

  return (
    <div className="progress-bar__root">
      <div className="flex items-center justify-between">
        <span className="progress-bar__percent-text">{progressPercentage}</span>
        <button type="button" onClick={uppy.cancelAll}>
          <Close size={16} />
        </button>
      </div>
      <div className="progress-bar__indicator">
        <div className="flex h-full">
          <div
            style={{ width: progressPercentage }}
            className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap progress-bar__indicator-inner"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
