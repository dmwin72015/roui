import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import * as Popover from '@radix-ui/react-popover';
import './style/index.scss';

export interface PopoverProps {
  open?: boolean;
  showArrow?: boolean;
  content?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
  trigger?: 'click' | 'hover';
  side?: 'left' | 'top' | 'right' | 'bottom';
  className?: string;
}

const IPopover: React.FC<PopoverProps> = (props) => {
  const { open, content, showArrow, onOpenChange, trigger, className, sideOffset, ...rest } = props;
  const [show, setShow] = useState(open);

  const onOpenChangeHandler = (_show: boolean) => {
    setShow(_show);
    onOpenChange?.(_show);
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleEnter = () => {
    setShow(true);
  };

  const handleLeave = () => {
    setShow(false);
  };

  const _triggerProps: Popover.PopoverTriggerProps = {};
  const _contentProps: Popover.PopperContentProps = {};

  if (trigger === 'hover') {
    _triggerProps.onMouseEnter = handleEnter;
    _triggerProps.onMouseLeave = handleLeave;
    _contentProps.onMouseEnter = handleEnter;
    _contentProps.onMouseLeave = handleLeave;
  }

  return (
    <Popover.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Popover.Trigger asChild {..._triggerProps}>
        {props.children}
      </Popover.Trigger>
      <Popover.Content
        className={cls('rou-popover', className)}
        {...rest}
        {..._contentProps}
        sideOffset={0}
        data-offset={sideOffset}
      >
        <div className="rou-popover-content">{content}</div>
        {showArrow && <Popover.Arrow className="rou-popover-arrow" />}
      </Popover.Content>
    </Popover.Root>
  );
};

IPopover.defaultProps = {
  open: false,
  showArrow: true,
  sideOffset: 0,
  side: 'top',
};

export default IPopover;
