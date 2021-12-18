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
  align?: 'start' | 'center' | 'end';
  className?: string;
}

const IPopover: React.FC<PopoverProps> = (props) => {
  const { open, content, showArrow, onOpenChange, trigger, className, sideOffset, ...rest } = props;
  const [show, setShow] = useState(open);

  console.log('IPopover', open);
  const onOpenChangeHandler = (_show: boolean) => {
    setShow(_show);
    onOpenChange?.(_show);
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleEnter = () => {
    onOpenChange?.(true);
    setShow(true);
  };

  const handleLeave = () => {
    onOpenChange?.(false);
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

  const _contentStyle: any = {
    '--custom-side-offset': `${sideOffset}px`,
  };
  return (
    <Popover.Root open={show} onOpenChange={onOpenChangeHandler}>
      <Popover.Trigger asChild {..._triggerProps}>
        {props.children}
      </Popover.Trigger>
      <Popover.Content
        className={cls('rou-popover', className)}
        {...rest}
        {..._contentProps}
        style={_contentStyle}
        sideOffset={0}
        data-offset={sideOffset}
        data-arrow={showArrow}
      >
        <div className="rou-popover-content">{content}</div>
        {showArrow && <Popover.Arrow offset={5} className="rou-popover-arrow" />}
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
