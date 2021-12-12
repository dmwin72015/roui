import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import { ModalFuncProps, HandleAction } from './modal.types';

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;

// 保存弹框回调函数
export const destroyFns: any[] = [];

function isThenable(thing?: PromiseLike<any>): boolean {
  return !!(thing && !!thing.then);
}

function ModaleFunction(this: any, config: ModalFuncProps) {
  const container = document.createDocumentFragment();
  const self = this as any;

  let currentConfig: ModalFuncProps = {
    okText: '确定',
    cancelText: '取消',
    ...config,
    onClose: close,
    open: true,
  };

  function close() {
    currentConfig = {
      ...currentConfig,
      open: false,
      onClosed: () => {
        destroy.apply(self);
      },
    };
    render(currentConfig);
  }

  function destroy(...args: any[]) {
    ReactDOM.unmountComponentAtNode(container);
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel?.(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props: ModalFuncProps) {
    const { okText, cancelText, content, onOk, onCancel, onClose, ...rest } = props;

    const handleAction = (cb?: HandleAction) => {
      if (!cb) {
        onClose?.();
        return;
      }
      const retrunValue = cb();
      if (isThenable(retrunValue)) {
        retrunValue.then(onClose).catch((e: any) => {
          throw e;
        });
      } else if (retrunValue !== false) {
        onClose?.();
      }
    };

    const handleOk = () => {
      handleAction(onOk);
    };

    const handleCancel = () => {
      handleAction(onCancel);
    };

    window.setTimeout(() => {
      ReactDOM.render(
        <Modal onClose={onClose} {...rest}>
          <div>{content}</div>
          <div>
            {okText === false ? null : (
              <button className="btn p-btn" onClick={handleOk}>
                {okText}
              </button>
            )}
            {cancelText === false ? null : (
              <button className="btn" onClick={handleCancel}>
                {cancelText}
              </button>
            )}
          </div>
        </Modal>,
        container,
      );
    }, 0);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);
  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}

export default ModaleFunction;
