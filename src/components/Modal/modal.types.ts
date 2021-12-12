import { ReactNode } from 'react';

interface BaseProps {
  open?: boolean;
  title?: string;
  description?: string;
  showClose?: boolean;
  allowScroll?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlay?: boolean;
  overlayClassName?: string;
  contentClassName?: string;
  afterClose?: () => void;
  onClosed?: () => void;
  onClose?: () => void;
}

export type HandleAction = (...args: any[]) => any | PromiseLike<any>;

export interface ModalProps extends BaseProps {
  onOpenChange?: (open: boolean) => void;
  forceMount?: true | undefined;
}

export interface ModalFuncProps extends BaseProps {
  type?: 'info' | 'success' | 'error' | 'warning';
  content?: ReactNode;
  okText?: React.ReactNode | false;
  cancelText?: React.ReactNode | false;
  onOk?: HandleAction;
  onCancel?: HandleAction;
}
