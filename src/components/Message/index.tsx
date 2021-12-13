import { ReactNode } from 'react';
import Notification, { NotificationInstance } from '../Notice/notification';
import { NoticeProps } from '../Notice';
import './style/index.scss';

type MessageContent = ReactNode;

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

let msgInstance: NotificationInstance | null;

let Message: any = {
  name: 'Message',
  config(options: ConfigOptions) {},
  open: (props: NoticeProps) => {
    const _props = Object.assign({}, props, { className: `rou-message-${props.type || 'info'}` });
    if (msgInstance) {
      msgInstance.notice(_props);
      return;
    }
    Notification.newInstance({ noticeType: 'message' }, (instance) => {
      msgInstance = instance;
      instance.notice(_props);
    });
  },
  destroy() {
    if (msgInstance) {
      msgInstance.destroy();
      msgInstance = null;
    }
  },
};

const types = ['info', 'success', 'warning', 'error'];
types.forEach((type) => {
  Message[type] = (content: MessageContent, duration?: number, onClose?: () => void) => {
    return Message.open({ type, content, duration, onClose });
  };
});
Message.show = Message.open;
export interface MessageInstance {
  info(content: MessageContent, duration?: number, onClose?: () => void): void;
  success(content: MessageContent, duration?: number, onClose?: () => void): void;
  error(content: MessageContent, duration?: number, onClose?: () => void): void;
  warning(content: MessageContent, duration?: number, onClose?: () => void): void;
  config(option?: NoticeProps): void;
  show(props: NoticeProps): void;
  destroy: () => void;
}

export default Message as MessageInstance;
