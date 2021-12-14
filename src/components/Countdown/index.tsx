import React, { FC, useEffect, useState, useRef } from 'react';
import cls from 'classnames';
import { LoadingIcon } from '../icons';
import './style/index.scss';

export interface CountDownProps {
  className?: string;
  time?: number;
  defaultText?: string;
  format?: string;
  request?: () => Promise<any>;
  onClick?: () => void;
  loadingDom?: React.ReactNode;
}

const DefaultTime = 60;
const DefaultFormat = 'SSs后重试';

const formatText = (time: number, format: string): string => {
  return format.replace('SS', `${time}`);
};

const CountDown: FC<CountDownProps> = (props) => {
  const { className, time = DefaultTime, defaultText, format = DefaultFormat, request, onClick, loadingDom } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [counting, setCounting] = useState<boolean>(false);
  const [currTime, setCurrTime] = useState<number>(time || 60);
  const [text, setText] = useState<string>();

  const timeRef = useRef<number>(time);

  const count = () => {
    setCounting(true);
    timeRef.current = timeRef.current - 1;
    setCurrTime(timeRef.current);
    if (timeRef.current <= 0) {
      timeRef.current = time;
      setCurrTime(timeRef.current);
      setCounting(false);
      return;
    }
    window.setTimeout(count, 1000);
  };

  const handleStart = () => {
    onClick?.();
    if (counting || loading) {
      return;
    }
    if (request) {
      setLoading(true);
      request()
        .then(() => {
          count();
        })
        .finally(() => setLoading(false));
    } else {
      count();
    }
  };

  useEffect(() => {
    if (currTime >= time || currTime <= 0) {
      setText(defaultText);
    } else {
      setText(formatText(currTime, format));
    }
  }, [currTime]);

  return (
    <span
      className={cls('countdown', className, {
        'count-disbaled': counting,
      })}
      onClick={handleStart}
    >
      {text}
      {loading && <em className="count-loading">{loadingDom || <LoadingIcon />}</em>}
    </span>
  );
};

CountDown.defaultProps = {
  time: DefaultTime,
  format: DefaultFormat,
  defaultText: '获取验证码',
};

export default CountDown;
