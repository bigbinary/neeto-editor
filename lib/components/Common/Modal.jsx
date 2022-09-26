import React, { useRef } from "react";

import classnames from "classnames";
import useModal from "hooks/useModal";
import { Close } from "neetoicons";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import Button from "./Button";
import { SIZES } from "./constants";
import { useModalManager } from "./ModalManager";
import Portal from "./Portal";

const noop = () => {};

const Modal = ({
  size = SIZES.medium,
  isOpen = false,
  onClose = noop,
  children,
  finalFocusRef,
  initialFocusRef,
  className = "",
  closeOnEsc = true,
  closeButton = true,
  backdropClassName = "",
  blockScrollOnMount = true,
  closeOnOutsideClick = true,
  ...otherProps
}) => {
  const modalWrapper = useRef();
  const backdropRef = useRef();

  useModalManager(modalWrapper, isOpen);

  const { handleModalClose } = useModal({
    isOpen,
    initialFocusRef,
    finalFocusRef,
    modalWrapper,
    onClose,
    backdropRef,
    closeOnOutsideClick,
    closeOnEsc,
    blockScrollOnMount,
  });

  return (
    <Portal rootId="neeto-ui-portal">
      <CSSTransition
        in={isOpen}
        appear={isOpen}
        timeout={300}
        classNames="ne-modal"
        unmountOnExit
      >
        <Backdrop
          ref={backdropRef}
          key="modal-backdrop"
          data-testid="backdrop"
          className={classnames("ne-modal__backdrop", backdropClassName)}
        >
          <div
            role="dialog"
            aria-modal={true}
            ref={modalWrapper}
            key="modal-wrapper"
            className={classnames("ne-modal__wrapper", {
              "ne-modal__wrapper--small": size === SIZES.small,
              "ne-modal__wrapper--medium": size === SIZES.medium,
              "ne-modal__wrapper--large": size === SIZES.large,
              [className]: className,
            })}
            {...otherProps}
          >
            {closeButton && (
              <Button
                aria-label="Close"
                style="text"
                icon={Close}
                className="ne-modal__close"
                onClick={handleModalClose}
                data-testid="close-button"
                size="small"
              />
            )}
            {children}
          </div>
        </Backdrop>
      </CSSTransition>
    </Portal>
  );
};

Modal.propTypes = {
  /**
   * To specify the size of the Modal.
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  /**
   * To specify whether the Modal is open or not.
   */
  isOpen: PropTypes.bool,
  /**
   * To specify the callback which will be invoked when the Modal is closed.
   */
  onClose: PropTypes.func,
  /**
   * To specify the content to be rendered inside the Modal component.
   */
  children: PropTypes.node,
  /**
   * To provide external classNames to the Modal.
   */
  className: PropTypes.string,
  /**
   * To close the Modal on pressing the Esc key.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * To specify whether the close button of the Modal should be displayed or not.
   */
  closeButton: PropTypes.bool,
  /**
   * To add custom classes to Backdrop component.
   */
  backdropClassName: PropTypes.string,
  /**
   * To close on clicking outside the Modal content.
   */
  closeOnOutsideClick: PropTypes.bool,
  /**
   * To specify the ref of the element which will receive focus when the Modal is closed.
   * If not specified, the focus will be set to the element which was focused when the Modal was opened.
   * If the Modal was opened by clicking on a button, then the focus will be set to the button.
   * */
  finalFocusRef: PropTypes.object,
  /**
   * <div class="neeto-ui-tag neeto-ui-tag--size-small neeto-ui-tag--style-outline neeto-ui-tag--style-success mb-2">
   * New
   * </div>
   * To specify the ref of the element which will receive focus when the Modal is opened.
   * If not specified, the focus will be set to the first focusable element inside the Modal.
   * */
  initialFocusRef: PropTypes.object,
  /**
   * <div class="neeto-ui-tag neeto-ui-tag--size-small neeto-ui-tag--style-outline neeto-ui-tag--style-success mb-2">
   * New
   * </div>
   * To specify whether the scroll should be blocked when the Modal is opened.
   * */
  blockScrollOnMount: PropTypes.bool,
};

export default Modal;
