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
  content: <span>'提示信息'</span>,
  showArrow: true,
  sideOffset: 6,
};

export const Controlled: ComponentStory<typeof Popover> = (args) => {
  const [show, setShow] = useState(false);
  const onChange = (v) => {
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
          console.log('船渡', val);
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
  content: <span>'提示信息'</span>,
  showArrow: true,
  sideOffset: 6,
};
