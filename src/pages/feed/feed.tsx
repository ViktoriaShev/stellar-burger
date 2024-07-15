import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersToFeed } from '../../services/slices/feed';
import { AppDispatch } from '../../services/store';
import { getFeedsFromServer } from '../../services/thunks/feed';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersToFeed);

  useEffect(() => {
    dispatch(getFeedsFromServer());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsFromServer());
      }}
    />
  );
};
