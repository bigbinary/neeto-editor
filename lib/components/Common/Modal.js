import React, { useRef } from "react";
import classnames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import { Close } from "@bigbinary/neeto-icons";
import Button from "common/Button";
import Portal from "common/Portal";
import Backdrop from "common/Backdrop";
import useOutsideClick from "hooks/useOutsideClick";

const noop = () => {};
const sizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
};

const Modal = ({
  size = "sm",
  isOpen = false,
  onClose = noop,
  loading = false,
  children,
  className = "",
  closeOnEsc = true,
  closeButton = true,
  backdropClassName = "",
  closeOnOutsideClick = true,
  ...otherProps
}) => {
  const modalWrapper = useRef();

  if (closeOnOutsideClick) useOutsideClick(modalWrapper, onClose);

  if (closeOnEsc) useHotkeys("esc", onClose);

  return (
    <Portal className="neeto-ui-portal">
      {isOpen && (
        <Backdrop
          key="modal-backdrop"
          className={classnames("neeto-ui-modal__backdrop", backdropClassName)}
        >
          <div
            ref={modalWrapper}
            key="modal-wrapper"
            className={classnames("neeto-ui-modal__wrapper", {
              "neeto-ui-modal__wrapper--xs": size === sizes.xs,
              "neeto-ui-modal__wrapper--sm": size === sizes.sm,
              "neeto-ui-modal__wrapper--md": size === sizes.md,
              [className]: className,
            })}
            {...otherProps}
          >
            {closeButton && (
              <Button
                style="text"
                icon={Close}
                className="neeto-ui-modal__close"
                onClick={onClose}
              />
            )}
            {loading ? <></> : children}
          </div>
        </Backdrop>
      )}
    </Portal>
  );
};

export default Modal;
