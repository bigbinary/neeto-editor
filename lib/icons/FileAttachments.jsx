import React from "react";

import PropTypes from "prop-types";

// eslint-disable-next-line import/exports-last
export const FileAttachments = ({ size, color, strokeWidth, ...other }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...other}>
    <path
      d="M13.8791 8.37527L8.39309 13.8613C7.56709 14.6873 7.56709 16.0273 8.39309 16.8533C9.21909 17.6793 10.5591 17.6793 11.3851 16.8533L18.6171 9.62127C20.1321 8.10627 20.1321 5.65027 18.6171 4.13527C17.1021 2.62027 14.6461 2.62027 13.1311 4.13527L5.89909 11.3673C3.69509 13.5713 3.69509 17.1433 5.89909 19.3473C8.10309 21.5513 11.6751 21.5513 13.8791 19.3473L18.2681 14.9583"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

FileAttachments.defaultProps = {
  color: "currentColor",
  size: 24,
  strokeWidth: "1.5",
};

FileAttachments.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
