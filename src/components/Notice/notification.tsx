import React from 'react';
import Notice, { NoticeProps } from './notice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReactDOM from 'react-dom';

let seed = 0;
const ts = Date.now();

function uuid() {
  const id = seed;
  seed += 1;
  return `rou-notice-${ts}-${id}`;
}

type NoticeItem = NoticeProps & {
  key: string;
};

export interface NotificationState {
  notices: NoticeItem[];
  animationDuration: number;
}

export type NoticeFunc = (props: NoticeProps) => void;

export interface NotificationInstance {
  notice: NoticeFunc;
  remove: (key: React.Key) => void;
  destroy: () => void;
  component: Notification;
  useNotification?: () => [NoticeFunc, React.ReactElement];
}

export interface NotificationProps {
  noticeType?: string;
  className?: string;
  style?: React.CSSProperties;
  transitionName?: string;
  animation?: string | object;
  maxCount?: number;
  closeIcon?: React.ReactNode;
}

// 消息
export default class Notification extends React.Component<NotificationProps, NotificationState> {
  static defaultDuration = 1.5;

  static newInstance: (
    properties: { getContainer?: () => HTMLElement; noticeType: string },
    callback: (instance: NotificationInstance) => void,
  ) => void;

  state: NotificationState = {
    notices: [],
    animationDuration: 200,
  };

  add(props: NoticeProps) {
    let { duration, onClose, closeable } = props;
    let { notices } = this.state;
    // 大于最大数量
    if (this.props.maxCount && notices.length > this.props.maxCount) {
      return;
    }
    let key = uuid();
    let options: NoticeItem = { ...props, key };
    options.duration = isNaN(Number(duration)) ? Notification.defaultDuration : duration;

    let timer: number | null;
    let callback = () => {
      let { notices } = this.state;
      this.setState({ notices: notices.filter((item) => item.key !== key) });
      window.clearTimeout(timer as number);
      timer = null;
    };

    if (options.duration) {
      window.setTimeout(callback, options.duration * 1000);
    }
    if (closeable) {
      options.onClose = callback;
    }
    notices.push(options);
    this.setState({
      notices,
    });
  }

  remove(key: React.Key) {
    this.setState(({ notices }: NotificationState) => ({
      notices: notices.filter((item) => {
        return item.key !== key;
      }),
    }));
  }

  componentWillUnmount() {}

  render() {
    let { notices, animationDuration } = this.state;
    const { noticeType } = this.props;
    return (
      <TransitionGroup className={`rou-${noticeType}-list`}>
        {notices.map((item) => (
          <CSSTransition key={item.key} timeout={animationDuration} classNames={`slide-down`}>
            <Notice {...item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

Notification.newInstance = function newNoticeInstance(options, cb) {
  let div = document.createElement('div');
  let called = false;

  function ref(notice: Notification) {
    if (called) {
      return;
    }
    called = true;

    cb({
      notice(props) {
        notice.add(props);
      },
      remove(key) {
        notice.remove(key);
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      },
      component: notice,
    });
  }

  let component = React.createElement(Notification, { ...options, ref });

  div.className = `rou-${options.noticeType}`;
  ReactDOM.render(component, div);
  document.body.appendChild(div);
};
