import React, { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import './style/index.scss';

export interface PopoverProps {
  open?: boolean;
  showArrow?: boolean;
  content?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
  trigger?: 'click' | 'hover';
}

const IPopover: React.FC<PopoverProps> = (props) => {
  const { open, content, showArrow, onOpenChange, trigger, ...rest } = props;
  const [show, setShow] = useState(open);

  const onOpenChangeHandler = (_show: boolean) => {
    setShow(_show);
    onOpenChange?.(_show);
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Popover.Root open={show} onOpenChange={onOpenChangeHandler}>
      <Popover.Trigger asChild>{props.children}</Popover.Trigger>
      <Popover.Content className="rou-popover" {...rest}>
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
};

export default IPopover;
