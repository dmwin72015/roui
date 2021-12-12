import { useState } from 'react';
import Modal, { confirm } from '../index';

export default {
  title: 'Modal',
};

export const Default = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleShow = () => {
    confirm({
      title: 'Are you sure?',
      content: 'This is a confirm modal',
      onOk: () => {
        console.log('OK');
      },
    });
  };
  return (
    <div>
      <button onClick={handleToggle}>显示弹框</button>
      <button onClick={handleShow}>通过方法调用</button>
      <Modal open={show} onClose={handleToggle}>
        弹框内哦那个
      </Modal>
    </div>
  );
};

export const WithFunc = () => {
  const handleClick = () => {
    confirm({
      title: '提示',
      content: '确定要删除吗？',
      onOk: () => {},
      onCancel: () => {},
    });
  };

  return (
    <div>
      <button onClick={handleClick}>弹出</button>
    </div>
  );
};
