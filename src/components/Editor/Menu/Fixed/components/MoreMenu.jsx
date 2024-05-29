import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

import { MENU_ELEMENTS, MENU_ELEMENT_TYPES } from "../constants";

const { Menu, MenuItem } = Dropdown;

const MoreMenu = ({ groups, editor }) => (
  <Dropdown
    buttonStyle="text"
    icon={MenuHorizontal}
    onClick={e => e.stopPropagation()}
  >
    <Menu>
      {groups.map(group =>
        group.map(({ type, ...props }) => {
          const Component = MENU_ELEMENTS[type];

          if (type === MENU_ELEMENT_TYPES.BUTTON) {
            const { icon: Icon } = props;

            return (
              <MenuItem.Button key={props.optionName} {...{ ...props, editor }}>
                <Icon /> {props.label}
              </MenuItem.Button>
            );
          }

          return (
            <Component
              key={props.optionName}
              {...{ ...props, editor }}
              isSecondaryMenu
            />
          );
        })
      )}
    </Menu>
  </Dropdown>
);

export default MoreMenu;
