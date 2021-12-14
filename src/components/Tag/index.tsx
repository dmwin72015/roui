import { FC } from 'react';
import cls from 'classnames';
import { CloseCircleIcon } from '../icons';
import './style/index.scss';

export interface TagProps {
  showClose?: boolean;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  children?: React.ReactNode;
  color?: string;
  className?: string;
}

const Tag: FC<TagProps> = (props: TagProps) => {
  const { showClose, onClose, children, className } = props;

  return (
    <span className={cls(className, 'rou-tag rou-tag-default')}>
      <span>{props.children}</span>
      {showClose && (
        <i>
          <CloseCircleIcon />
        </i>
      )}
    </span>
  );
};

Tag.defaultProps = {
  showClose: false,
};

export default Tag;
