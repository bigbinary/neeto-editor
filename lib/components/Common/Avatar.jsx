import React, { useState } from "react";

import classNames from "classnames";
import PropTypes from "prop-types";
import { isNil } from "ramda";

import { AVATAR_SIZE, STATUS, COLORS, USER_ICON_URL } from "./constants";

const Avatar = ({
  size = "medium",
  user = {},
  isSquare = false,
  status = null,
  onClick = () => {},
  className = "",
  ...otherProps
}) => {
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);

  const { name = "", imageUrl } = user;

  const isMedium = size === "medium";
  const isLarge = size === "large";
  const isExtraLarge = size === "extraLarge";

  const getInitials = fullName => {
    if (fullName && typeof fullName === "string") {
      const allNames = fullName.trim().split(" ");
      const initials = allNames.reduce((acc, curr, index) => {
        if (index === 0 || index === allNames.length - 1) {
          acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }

        return acc;
      }, "");

      return initials;
    }

    return "";
  };

  const avatarString = getInitials(name);

  const getRandomBackgroundColor = () => {
    const charCode =
      (avatarString.charCodeAt(0) || 0) + (avatarString.charCodeAt(1) || 0);
    const bgColor = COLORS[(charCode % 65) % COLORS.length] || COLORS[0];

    return bgColor;
  };

  const imageContainerStyle = {
    height: AVATAR_SIZE[size],
    width: AVATAR_SIZE[size],
  };

  const imageClasses = classNames("ne-avatar ", {
    "ne-avatar--medium": isMedium,
    "ne-avatar--large": isLarge,
    "ne-avatar--xlarge": isExtraLarge,
    "ne-avatar--round": !isSquare,
    hidden: isLoadingFailed,
  });

  const placeholderClasses = classNames("ne-avatar__text", {
    "ne-avatar__text-medium": isMedium,
    "ne-avatar__text-large": isLarge,
    "ne-avatar__text-xlarge": isExtraLarge,
  });

  const statusClasses = classNames("ne-avatar__status", `${status}`, {
    "ne-avatar__status-medium": isMedium,
    "ne-avatar__status-large": isLarge,
    "ne-avatar__status-xlarge": isExtraLarge,
    "ne-avatar__status-square": isSquare,
  });

  const Indicator = () =>
    isNil(status) ? (
      React.Fragment
    ) : (
      <span className={statusClasses} data-testid="indicator" />
    );

  const ImagePlaceholder = () => (
    <span className={placeholderClasses} data-testid="initials">
      {avatarString}
    </span>
  );

  const shouldDisplayInitials = avatarString && !(imageUrl && !isLoadingFailed);

  return (
    <span
      style={imageContainerStyle}
      className={classNames(
        "ne-avatar--container ne-select-none",
        {
          "ne-avatar--container-round": !isSquare,
        },
        className,
        getRandomBackgroundColor()
      )}
      onClick={onClick}
      {...otherProps}
    >
      <Indicator />
      {shouldDisplayInitials ? (
        <ImagePlaceholder />
      ) : (
        <img
          alt={`avatar-${avatarString}`}
          className={imageClasses}
          data-chromatic="ignore"
          src={imageUrl || USER_ICON_URL}
          onError={() => setIsLoadingFailed(true)}
        />
      )}
    </span>
  );
};

Avatar.propTypes = {
  /**
   * Specify the dimension for Avatar component.
   */
  size: PropTypes.oneOf(Object.keys(AVATAR_SIZE)),
  user: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  /**
   * To display the Avatar as a square.
   */
  isSquare: PropTypes.bool,
  /**
   * To specify the action to be triggered on clicking the Avatar.
   */
  onClick: PropTypes.func,
  /**
   * To specify the status of the user if needed in Avatar component.
   */
  status: PropTypes.oneOf(Object.keys(STATUS)),
  /**
   * To provide external classnames to Avatar component.
   */
  className: PropTypes.string,
};

export default Avatar;
