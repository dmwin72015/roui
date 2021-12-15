import React, { FC, useRef } from 'react';
import cls from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon } from '../icons';
import { ModalProps } from './modal.types';
import './style/index.scss';

const Modal: FC<ModalProps> = (props) => {
  const {
    open,
    onOpenChange,
    onClose,
    forceMount,
    title,
    description,
    showClose,
    allowScroll,
    contentClassName,
    overlayClassName,
    closeOnEsc,
    closeOnOverlay,
    onClosed,
    showMask,
  } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const contentProps: Dialog.DialogContentProps = {
    asChild: true,
    forceMount,
  };

  if (closeOnEsc) {
    contentProps.onEscapeKeyDown = onClose;
  }
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const inContent = contentRef.current?.contains(e.target as HTMLElement);
    if (inContent) {
      return;
    }
    if (closeOnOverlay) {
      onClose?.();
    }
  };

  const motionEnd = () => {
    if (!open) {
      onClosed?.();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {showMask && <Dialog.Overlay className={cls('rou-modal-mask', overlayClassName)} />}
        <Dialog.Content {...contentProps}>
          <div className="rou-modal-wrapper" onClick={handleClickOutside}>
            <div
              className={cls('rou-modal-content', contentClassName, {
                'rou-modal-scroll': allowScroll,
              })}
              ref={contentRef}
              onAnimationEnd={motionEnd}
            >
              {title && <Dialog.Title className="rou-modal-title">{title}</Dialog.Title>}
              {description && <Dialog.Description className="rou-modal-desc">{description}</Dialog.Description>}
              {showClose && (
                <Dialog.Close className="rou-modal-close" onClick={handleClose}>
                  <CloseIcon />
                </Dialog.Close>
              )}
              {props.children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.defaultProps = {
  open: false,
  onOpenChange: () => {},
  onClose: () => {},
  showClose: true,
  closeOnEsc: true,
  closeOnOverlay: true,
  showMask: true,
};

export default Modal;
