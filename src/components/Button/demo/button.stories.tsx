import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Button from '../index';

export default {
  title: 'Button',
  Component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div style={{ padding: 40 }}>
      <div>
        <Button {...args}></Button>
      </div>
      <div>
        <Button {...args} loading={loading} onClick={() => setLoading(!loading)}>
          加载按钮
        </Button>
      </div>
    </div>
  );
};

export const Basic: ComponentStory<typeof Button> = Template.bind({});

Basic.args = {
  type: 'primary',
  children: '按钮',
  size: 'small',
  loading: false,
};
