import React from "react";

import { Dropdown } from "neetoui";

const { MenuItem } = Dropdown;

const SecondaryMenuTarget = ({ icon: Icon, label }) => (
  <MenuItem.Button>
    <Icon /> {label}
  </MenuItem.Button>
);

export default SecondaryMenuTarget;
