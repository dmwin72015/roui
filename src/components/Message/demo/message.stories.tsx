import { useState } from 'react';
import Modal from '../../Modal';
import Message from '../index';

export default {
  title: 'Message',
  Component: Message,
};

export const Basic = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = (type: any) => {
    Message.show({
      type: type,
      content: 'This is a message',
      duration: 2,
    });
  };

  const delay = (time: number, val: any) => {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(val);
      }, time);
    });
  };

  const handleTestTimeout = () => {
    window.setTimeout(() => {}, 10);
    delay(2000, 'test').then((val) => {
      Message.success('kkk -- vvv');
    });
  };

  return (
    <div>
      <button onClick={() => handleToggle('info')}>info message</button>
      <button onClick={() => handleToggle('success')}>success message</button>
      <button onClick={() => handleToggle('warning')}>warning message</button>
      <button onClick={() => handleToggle('error')}>error message</button>

      <div>
        <button onClick={() => setVisible(!visible)}>show modal</button>
      </div>

      <div>
        <button onClick={handleTestTimeout}>测试 timeout</button>
      </div>

      <Modal open={visible} onClose={() => setVisible(false)}>
        modal
        <button
          onClick={() => {
            delay(100, '没你好啊').then((res: any) => {
              Message.info(res, 3);
            });
          }}
        >
          内部message
        </button>
      </Modal>
    </div>
  );
};

Basic.args = {};
