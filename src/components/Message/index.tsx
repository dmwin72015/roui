import { ReactNode } from 'react';
import Notification, { NotificationInstance } from '../Notice/notification';
import { NoticeProps } from '../Notice';
import MessageOrign, { MessageProps } from './message';
import cls from 'classnames';

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
  // TODO:config
  // config(options: ConfigOptions) {},
  open: (props: MessageProps & NoticeProps) => {
    const _props = Object.assign({}, props, {
      className: cls('rou-message-content', {
        [`rou-message-${props.type}`]: props.type,
      }),
      closeClassName: 'rou-message-close',
      content: <MessageOrign {...props} />,
    });
    if (msgInstance) {
      msgInstance.notice(_props);
      return;
    }
    Notification.newInstance(
      {
        prefix: 'message',
        transitionName: 'rou-message',
      },
      (instance) => {
        msgInstance = instance;
        instance.notice(_props);
      },
    );
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
  // config(option?: NoticeProps): void;
  show(props: MessageProps & NoticeProps): void;
  destroy: () => void;
}

export default Message as MessageInstance;
