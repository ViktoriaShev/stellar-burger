import { FC, useEffect, useState, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getOrderDetails } from '../../services/slices/feed';
import { getIngredients } from '../../services/slices/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { getOrderByNumber } from '../../services/thunks/feed';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const [loading, setLoading] = useState(true); // Добавлено состояние для отслеживания статуса загрузки
  const orderData = useSelector(getOrderDetails);
  const ingredients: TIngredient[] = useSelector(getIngredients);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(parseInt(number, 10)))
        .then(() => setLoading(false)) // Устанавливаем состояние загрузки в false после завершения загрузки данных
        .catch(() => setLoading(false)); // Устанавливаем состояние загрузки в false в случае ошибки
    }
  }, [number, dispatch]);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(parseInt(number, 10)));
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);
  if (loading) {
    return <Preloader />;
  }
  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
