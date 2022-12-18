import React, { useState } from "react";

import Tippy from "@tippyjs/react";
import classnames from "classnames";
import { Down } from "neetoicons";
import { isNil } from "ramda";

import Divider from "./Divider";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

import { Button } from "neetoui";

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
        onClose?.();
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
      strategy = STRATEGY.fixed,
      onClick,
      ...otherProps
    },
    ref
  ) => {
    const [instance, setInstance] = useState(null);
    const [mounted, setMounted] = useState(false);

    const isControlled = !isNil(isOpen);

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
        interactive
        animation={false}
        arrow={false}
        duration={0}
        hideOnClick={hideOnClick}
        hideOnEsc={closeOnEsc}
        maxWidth="none"
        offset={0}
        placement={position || PLACEMENT.bottomEnd}
        plugins={[hideOnEsc]}
        ref={ref}
        role="dropdown"
        theme="light"
        trigger={TRIGGERS[trigger]}
        className={classnames("ne-dropdown", {
          [className]: className,
        })}
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
        popperOptions={{
          strategy,
          modifiers: dropdownModifiers,
        }}
        onCreate={instance => instance && setInstance(instance)}
        onHidden={() => {
          setMounted(false);
        }}
        onMount={() => {
          setMounted(true);
        }}
        {...otherProps}
        {...controlledProps}
      >
        {customTarget ? (
          <span onClick={onClick}>
            {typeof customTarget === "function" ? customTarget() : customTarget}
          </span>
        ) : (
          <Button
            disabled={disabled || buttonProps?.disabled}
            icon={icon || Down}
            iconPosition="right"
            label={label}
            size={size ?? buttonSize}
            style={style ?? buttonStyle}
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
