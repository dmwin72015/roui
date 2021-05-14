import { FC } from 'react';
export interface CountDownProps {
    /**
     * 手机号码
     */
    mobile?: string;
    /**
     * 是否立即开始
     */
    starting?: boolean;
    /**
     * 默认显示内容
     */
    defaultText?: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 请求函数
     */
    request?: () => Promise<any>;
    /**
     * 格式化文本
     */
    format?: string;
    /**
     * 点击事件
     */
    onClick?: () => void;
    /**
     * 倒计时开始数字
     */
    startNum?: number;
}
/**
 * 倒计时
 * @param props CountDownProps
 * @returns
 */
declare const CountDown: FC<CountDownProps>;
export default CountDown;
