import { useState } from 'react';
import Modal from '../index';
import './demo.scss';

export default {
  title: 'Modal',
  Component: Modal,
};

export const Basic = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <div>
      <button onClick={handleToggle}>显示弹框</button>
      <Modal open={show} onClose={handleToggle}>
        弹框内哦那个
      </Modal>
    </div>
  );
};

Basic.args = {
  open: false,
};

export const WithFunc = () => {
  const handleClick = () => {
    Modal.confirm({
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
