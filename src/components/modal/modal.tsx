import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { getOrderDetails } from '../../services/slices/feed';
import { useSelector } from 'react-redux';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(
  ({ title, onClose, children, open }) => {
    const numberOrder = useSelector(getOrderDetails)?.number;

    if (title === '' && numberOrder) {
      title = '#' + numberOrder || '';
    }

    if (title === 'Заказ готов') {
      title = '';
    }

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        e.key === 'Escape' && onClose();
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    return ReactDOM.createPortal(
      <ModalUI title={title} onClose={onClose} open>
        {children}
      </ModalUI>,
      modalRoot as HTMLDivElement
    );
  }
);
