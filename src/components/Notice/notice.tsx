import React, { FC, ReactNode } from 'react';
import cls from 'classnames';
import { SuccessIcon, ErrorIcon, WarnIcon, InfoIcon, CloseIcon } from '../icons';
import './style/index.scss';

export interface NoticeProps {
  visible?: boolean;
  onClose?: () => void;
  wrapClassName?: string;
  className?: string;
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
  closeable?: boolean;
  closeClass?: string;
  content?: ReactNode;
}

const Notice: FC<NoticeProps> = (props) => {
  const { type, onClose, closeable, className, closeClass } = props;

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
        return <InfoIcon />;
    }
  };

  return (
    <div className={cls('rou-notice-box', className)}>
      <div
        className={cls('rou-notice-content', `rou-notice-${type}`, {
          'rou-notice-closeable': closeable,
        })}
      >
        <span className="dm-icon rou-notice-icon">{getIcon()}</span>
        <div className="rou-notice-body">{props.content}</div>
        {closeable && (
          <i onClick={onClose} className={closeClass}>
            <CloseIcon />
          </i>
        )}
      </div>
    </div>
  );
};

Notice.defaultProps = {
  duration: 150,
  closeable: false,
  onClose: () => {},
};

export default Notice;
