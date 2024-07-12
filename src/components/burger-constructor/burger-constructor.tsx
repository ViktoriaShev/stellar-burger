import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConstructorItems,
  selectBurgerIngredients,
  resetConstructor
} from '../../services/slices/burgerConstructor';
import { postOrderBurger } from '../../services/thunks/order';
import { AppDispatch } from '../../services/store';
import { getOrder, clearData } from '../../services/slices/order';
import { Modal } from '@components';
import { getUser } from '../../services/slices/user';
import { NavLink } from 'react-router-dom';
import styles from '../ui/app-header/app-header.module.css';

type Warning = {
  open: boolean;
  subTitle: string;
  link?: boolean;
};

const initialState = {
  open: false,
  subTitle: ''
};

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const dispatch = useDispatch<AppDispatch>();
  const burgerIngredients = useSelector(selectBurgerIngredients).filter(
    (ingredient: string | undefined): ingredient is string =>
      ingredient !== undefined
  );
  const [orderRequestStatus, setOrderRequestStatus] = useState(false);
  const orderModalData = useSelector(getOrder) || null;
  const [showWarning, setShowWarning] = useState<Warning>(initialState);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (user) {
      if (!constructorItems.bun) {
        setShowWarning({
          open: true,
          subTitle: 'Добавьте булку в заказ'
        });
      } else {
        setOrderRequestStatus(true);
        dispatch(postOrderBurger(burgerIngredients)).then(() => {
          dispatch(resetConstructor());
        });
      }
    } else {
      setShowWarning({
        open: true,
        subTitle: 'Для совершения покупки необходима авторизация',
        link: true
      });
    }
  };

  const closeWarningModal = () => {
    setShowWarning(initialState);
  };

  const closeOrderModal = () => {
    setOrderRequestStatus(false);
    dispatch(clearData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? Number(constructorItems.bun.price) * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + Number(v.price),
        0
      ),
    [constructorItems]
  );

  return (
    <>
      {showWarning.open && !showWarning.link && (
        <Modal title='Предупреждение' onClose={closeWarningModal}>
          <div> {showWarning.subTitle} </div>
        </Modal>
      )}
      {showWarning.link && (
        <Modal title='Предупреждение' onClose={closeWarningModal}>
          <p className={styles.link_active}>{showWarning.subTitle}</p>
          <NavLink to='/login' className={styles.link}>
            <p
              className={
                styles.link + ' text text_type_main-default ml-2  mr-10'
              }
            >
              Перейти в личный кабинет
            </p>
          </NavLink>
        </Modal>
      )}
      {
        <BurgerConstructorUI
          price={price}
          orderRequest={orderRequestStatus}
          constructorItems={constructorItems}
          orderModalData={orderModalData}
          onOrderClick={onOrderClick}
          closeOrderModal={closeOrderModal}
        />
      }
    </>
  );
};
