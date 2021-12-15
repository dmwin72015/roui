import React, { FC } from 'react';
import cls from 'classnames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import './style/index.scss';

export interface TooltipProps {
  offset?: number;
  content?: string;
  showArrow?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { offset, content, showArrow, className, ...rest } = props;
  return (
    <TooltipPrimitive.Root delayDuration={0}>
      <TooltipPrimitive.Trigger asChild>{props.children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content {...rest} className={cls('rou-tooltip', className)} sideOffset={offset}>
        <div className="rou-tooltip-content">{content}</div>
        {showArrow && <TooltipPrimitive.Arrow className="rou-tooltip-arrow" offset={5} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};

Tooltip.defaultProps = {
  offset: 5,
  showArrow: true,
  side: 'top',
  align: 'center',
};

export const Provider = TooltipPrimitive.Provider;

export default Tooltip;
