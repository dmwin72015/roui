import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Popover from '../index';

export default {
  title: 'Popover',
  component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => {
  return (
    <div style={{ padding: 40 }}>
      <Popover {...args}>
        <span className="tag">hi</span>
      </Popover>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  content: <span>弹出8u内容</span>,
  showArrow: false,
  sideOffset: 6,
  trigger: 'hover',
  side: 'bottom',
};

export const Controlled: ComponentStory<typeof Popover> = (args) => {
  const [show, setShow] = useState(false);
  const onChange = (v: boolean) => {
    setShow(v);
  };
  return (
    <div style={{ padding: 40 }}>
      <p>
        <button onClick={() => onChange(!show)}>toggle</button>
      </p>

      <Popover
        open={show}
        onOpenChange={(val) => {
          setShow(val);
        }}
        {...args}
      >
        <span className="tag">hi</span>
      </Popover>
    </div>
  );
};

Controlled.args = {
  content: <span>提示信息</span>,
  showArrow: true,
  sideOffset: 6,
  side: 'bottom',
};
