import React, { FC, ReactNode } from 'react';
import cls from 'classnames';
import { CloseIcon } from '../icons';
import './style/index.scss';

export interface NoticeProps {
  onClose?: () => void;
  wrapClassName?: string;
  className?: string;
  closeable?: boolean;
  closeClassName?: string;
  content?: ReactNode;
  duration?: number;
}

const Notice: FC<NoticeProps> = (props) => {
  const { onClose, closeable, wrapClassName, className, closeClassName } = props;

  return (
    <div className={cls('rou-notice-box', wrapClassName)}>
      <div className={cls('rou-notice-content', className)}>
        {props.content}
        {closeable && (
          <i onClick={onClose} className={closeClassName}>
            <CloseIcon />
          </i>
        )}
      </div>
    </div>
  );
};

Notice.defaultProps = {
  closeable: false,
  onClose: () => {},
};

export default Notice;
