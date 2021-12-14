import { ComponentStory, ComponentMeta } from '@storybook/react';
import Coundown from '../index';
import { Countdown } from 'src/components';

export default {
  title: 'Countdown',
  Component: Coundown,
} as ComponentMeta<typeof Coundown>;

const Template: ComponentStory<typeof Popover> = (args) => {
  return (
    <div style={{ padding: 40 }}>
      <Countdown {...args}></Countdown>
    </div>
  );
};

export const Basic: ComponentStory<typeof Coundown> = Template.bind({});

Basic.args = {
  time: 30,
  defaultText: '获取',
  format: 'SSs',
};
