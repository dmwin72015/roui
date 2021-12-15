import React from 'react';
import { SuccessIcon, WarnIcon, ErrorIcon, InfoIcon } from '../icons';
import './style/index.scss';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface MessageProps {
  type?: MessageType;
  content?: React.ReactNode;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'info':
        return <InfoIcon />;
      case 'warning':
        return <WarnIcon />;
      default:
        return null;
    }
  };
  const icon = getIcon();
  return (
    <>
      {icon && <span className="rou-message-icon">{icon}</span>}
      <span>{content}</span>
    </>
  );
};

export default Message;
