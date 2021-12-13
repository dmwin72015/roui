import React from 'react';

export type NoticeType = 'success' | 'error' | 'info' | 'warning';

export interface NoticeProps {
  visible?: boolean;
  onClose?: () => void;
  wrapClassName?: string;
  className?: string;
  duration: number;
  type?: NoticeType;
  closeable?: boolean;
  content?: React.ReactNode;
}
