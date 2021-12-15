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
        <a className="fx-ac" style={{ background: 'red' }}>
          <i className="b2font b2-add-circle-line"></i>
          <span>发布</span>
        </a>
      </Popover>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  open: true,
  content: (
    <ul style={{ margin: 0 }}>
      <li>
        <a href="/post" className="fx-ac">
          <span style={{ paddingLeft: 3 }}>发话题</span>
        </a>
      </li>
      <li>
        <a className="fx-ac" href="/post/article">
          <span style={{ paddingLeft: 6 }}>发文章</span>
        </a>
      </li>
    </ul>
  ),
  showArrow: true,
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
