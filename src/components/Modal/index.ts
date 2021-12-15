import OriginModal from './modal';
import modalFunc, { destroyFns, ModalStaticFunctions } from './modalFunc';

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    destroyAll: () => void;
    confirm: typeof modalFunc;
  };

const Modal: ModalType = OriginModal as ModalType;

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

Modal.confirm = modalFunc;

export { ModalProps, ModalFuncProps } from './modal.types';

export default Modal;
