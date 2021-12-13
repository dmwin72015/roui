import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip from '../index';
import './demo.scss';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <div style={{ padding: 40 }}>
      <Tooltip {...args}>
        <span className="tag">hi</span>
      </Tooltip>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  content: '提示信息',
};
