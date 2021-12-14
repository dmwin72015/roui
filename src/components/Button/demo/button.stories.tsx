import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../index';

export default {
  title: 'Button',
  Component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return (
    <div style={{ padding: 40 }}>
      <Button {...args}></Button>
    </div>
  );
};

export const Basic: ComponentStory<typeof Button> = Template.bind({});

Basic.args = {
  type: 'primary',
  children: '按钮',
  size: 'small',
};
