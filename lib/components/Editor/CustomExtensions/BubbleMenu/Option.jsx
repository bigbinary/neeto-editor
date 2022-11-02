import React from "react";

import classnames from "classnames";

import ToolTip from "components/Common/ToolTip";
import { humanize } from "utils/common";

const Option = ({ Icon, command, active, optionName }) => (
  <ToolTip content={humanize(optionName)} delay={[500]} position="top">
    <div
      data-cy={`neeto-editor-bubble-menu-${optionName}-option`}
      className={classnames("neeto-editor-bubble-menu__item", {
        active,
      })}
      onClick={command}
    >
      <Icon size={20} />
    </div>
  </ToolTip>
);

export default Option;
