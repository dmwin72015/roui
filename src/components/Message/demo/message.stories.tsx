import { useState } from 'react';
import Message from '../index';

export default {
  title: 'Message',
  Component: Message,
};

export const Basic = () => {
  const handleToggle = (type: any) => {
    Message.show({
      type: type,
      content: 'This is a message',
      duration: 2222,
    });
  };

  return (
    <div>
      <button onClick={() => handleToggle('info')}>info message</button>
      <button onClick={() => handleToggle('success')}>success message</button>
      <button onClick={() => handleToggle('warning')}>warning message</button>
      <button onClick={() => handleToggle('error')}>error message</button>
    </div>
  );
};

Basic.args = {};
