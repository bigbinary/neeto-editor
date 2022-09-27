import React, { useState } from "react";

import { Down } from "@bigbinary/neeto-icons";
import Tippy from "@tippyjs/react";
import classnames from "classnames";

import Divider from "./Divider";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

import Button from "../Button";

const BTN_STYLES = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  danger_text: "danger-text",
  text: "text",
  link: "link",
};
const BTN_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
};

const STRATEGY = {
  absolute: "absolute",
  fixed: "fixed",
};

const PLACEMENT = {
  auto: "auto",
  autoStart: "auto-start",
  autoEnd: "auto-end",
  top: "top",
  topStart: "top-start",
  topEnd: "top-end",
  bottom: "bottom",
  bottomStart: "bottom-start",
  bottomEnd: "bottom-end",
  right: "right",
  rightStart: "right-start",
  rightEnd: "right-end",
  left: "left",
  leftStart: "left-start",
  leftEnd: "left-end",
};

const TRIGGERS = {
  click: "click",
  hover: "mouseenter focus",
};

const hideOnEsc = {
  name: "hideOnEsc",
  defaultValue: true,
  fn({ hide, props: { hideOnEsc, onClose } }) {
    function onKeyDown(event) {
      if (event.key.toLowerCase() === "escape" && hideOnEsc) {
        onClose();
        hide();
      }
    }
    return {
      onShow() {
        document.addEventListener("keydown", onKeyDown);
      },
      onHide() {
        document.removeEventListener("keydown", onKeyDown);
      },
    };
  },
};

const Dropdown = React.forwardRef(
  (
    {
      icon,
      label,
      isOpen,
      onClose = () => {},
      dropdownProps = {},
      position = PLACEMENT.bottomEnd,
      children,
      className,
      buttonStyle = BTN_STYLES.primary,
      buttonSize = BTN_SIZES.medium,
      buttonProps: { style, size, ...buttonProps } = {},
      customTarget,
      disabled = false,
      closeOnEsc = true,
      closeOnSelect = true,
      closeOnOutsideClick = true,
      dropdownModifiers = [],
      trigger = TRIGGERS.click,
      strategy = STRATEGY.absolute,
      onClick,
      ...otherProps
    },
    ref
  ) => {
    const [instance, setInstance] = useState(null);
    const [mounted, setMounted] = useState(false);

    const isControlled = !(isOpen === undefined || isOpen === null);

    const controlledProps = isControlled
      ? {
          visible: isOpen,
          onClickOutside: onClose,
        }
      : {
          onClickOutside: () => {
            onClose();
            return closeOnOutsideClick;
          },
        };

    const { classNames: dropdownClassname, ...otherDropdownProps } =
      dropdownProps;

    // hideOnClick determines whether the dropdown should be hidden when the user clicks outside of the dropdown.
    // https://atomiks.github.io/tippyjs/v6/all-props/#hideonclick
    const hideOnClick = isControlled ? false : closeOnOutsideClick || "toggle";

    const close = () => {
      instance.hide();
      onClose();
    };

    return (
      <Tippy
        ref={ref}
        role="dropdown"
        trigger={TRIGGERS[trigger]}
        plugins={[hideOnEsc]}
        hideOnEsc={closeOnEsc}
        hideOnClick={hideOnClick}
        interactive
        placement={position || PLACEMENT.bottomEnd}
        arrow={false}
        offset={0}
        animation={false}
        theme="light"
        className={classnames("ne-dropdown", {
          [className]: className,
        })}
        duration={0}
        onCreate={instance => instance && setInstance(instance)}
        popperOptions={{
          strategy,
          modifiers: dropdownModifiers,
        }}
        maxWidth="none"
        onMount={() => {
          setMounted(true);
        }}
        onHidden={() => {
          setMounted(false);
        }}
        content={
          mounted ? (
            <div
              className={classnames("ne-dropdown__popup", {
                [dropdownClassname]: dropdownClassname,
              })}
              onClick={closeOnSelect ? close : () => {}}
              {...otherDropdownProps}
            >
              {children}
            </div>
          ) : null
        }
        {...otherProps}
        {...controlledProps}
      >
        {customTarget ? (
          <span onClick={onClick}>
            {typeof customTarget === "function" ? customTarget() : customTarget}
          </span>
        ) : (
          <Button
            label={label}
            style={style ?? buttonStyle}
            size={size ?? buttonSize}
            icon={icon || Down}
            iconPosition="right"
            disabled={disabled || buttonProps?.disabled}
            onClick={onClick}
            {...buttonProps}
          />
        )}
      </Tippy>
    );
  }
);

Dropdown.Menu = Menu;
Dropdown.MenuItem = MenuItem;
Dropdown.Divider = Divider;
Dropdown.displayName = "Dropdown";

export default Dropdown;
