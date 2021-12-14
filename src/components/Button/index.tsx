import React, { FC, ReactNode } from 'react';
import cls from 'classnames';
import { LoadingIcon } from '../icons';

import './style/index.scss';

export interface ButtonProps {
  className?: string;
  htmlType?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  size?: 'large' | 'small' | 'default';
  innerRef?: any;
  loading?: boolean;
  type?: 'primary' | 'default' | 'danger' | 'link';
  plain?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { htmlType, disabled, innerRef, loading, className, type, size, plain, ...rest } = props;

  return (
    <button
      className={cls('rou-btn', className, {
        'rou-btn-loading': loading,
        [`rou-btn-${type}`]: type,
        [`rou-btn-${size}`]: size !== 'default',
        'rou-btn-plain': plain,
      })}
      type={htmlType}
      disabled={disabled}
      ref={innerRef}
      {...rest}
    >
      {props.children}
      {loading && (
        <i className="rou-btn-loading">
          <LoadingIcon />
        </i>
      )}
    </button>
  );
};

const RefButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Button innerRef={ref} {...props}></Button>;
});

RefButton.displayName = 'RefButton';

Button.defaultProps = {
  size: 'default',
};

export default Button;

export { RefButton };
