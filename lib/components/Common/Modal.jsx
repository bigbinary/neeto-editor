import React, { useRef } from "react";

import classnames from "classnames";
import Backdrop from "components/Common/Backdrop";
import Button from "components/Common/Button";
import Portal from "components/Common/Portal";
import useOutsideClick from "hooks/useOutsideClick";
import { Close } from "neetoicons";
import { useHotkeys } from "react-hotkeys-hook";

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

  useOutsideClick(modalWrapper, closeOnOutsideClick ? onClose : noop);

  useHotkeys("esc", closeOnEsc ? onClose : noop);

  return (
    <Portal className="ne-portal">
      {isOpen && (
        <Backdrop
          key="modal-backdrop"
          className={classnames("ne-modal__backdrop", backdropClassName)}
        >
          <div
            ref={modalWrapper}
            key="modal-wrapper"
            className={classnames("ne-modal__wrapper", {
              "ne-modal__wrapper--xs": size === sizes.xs,
              "ne-modal__wrapper--sm": size === sizes.sm,
              "ne-modal__wrapper--md": size === sizes.md,
              [className]: className,
            })}
            {...otherProps}
          >
            {closeButton && (
              <Button
                style="text"
                icon={Close}
                className="ne-modal__close"
                onClick={onClose}
              />
            )}
            {loading ? "" : children}
          </div>
        </Backdrop>
      )}
    </Portal>
  );
};

export default Modal;
