import { Story, Meta } from '@storybook/react'

import { CountDown, CountDownProps } from '../../components'

export default {
  title: '组件/Countdown',
  component: CountDown,
  argTypes: {}
} as Meta

const Template: Story<CountDownProps> = args => <CountDown {...args} />

export const Main = Template.bind({})
Main.args = {
  defaultText: '获取验证码',
  mobile: '159333222',
  disabled: false,
  starting: false,
  format: 'SS秒之后重试'
}
