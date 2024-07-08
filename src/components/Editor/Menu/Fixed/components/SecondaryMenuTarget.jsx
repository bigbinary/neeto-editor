import React from "react";

import { hyphenate } from "neetocist";
import { Dropdown } from "neetoui";

const { MenuItem } = Dropdown;

const SecondaryMenuTarget = ({ icon: Icon, label }) => (
  <MenuItem.Button
    data-cy={`neeto-editor-fixed-menu-${hyphenate(label)}-option`}
  >
    <Icon /> {label}
  </MenuItem.Button>
);

export default SecondaryMenuTarget;
