import { FC, memo, useState } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, open = true, children }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleClose = () => {
      setIsOpen(false);
      onClose();
    };
    return (
      <>
        {isOpen && (
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3 className={`${styles.title} text text_type_main-large`}>
                {title}
              </h3>
              <button
                className={styles.button}
                type='button'
                onClick={handleClose}
              >
                <CloseIcon type='primary' />
              </button>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        )}
        {isOpen && <ModalOverlayUI onClick={handleClose} />}
      </>
    );
  }
);
