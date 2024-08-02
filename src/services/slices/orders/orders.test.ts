import ordersSlice from './orders';
import { getOrders } from '../../thunks/orders';
import { RequestStatus } from '../../../utils/types';

describe('ordersSlice reducer', () => {
  const initialState = {
    orders: [],
    status: RequestStatus.Idle
  };

  it('should handle getOrders.pending', () => {
    const newState = ordersSlice.reducer(
      initialState,
      getOrders.pending('requestId')
    );
    expect(newState.status).toEqual(RequestStatus.Loading);
  });

  it('should handle getOrders.rejected', () => {
    const newState = ordersSlice.reducer(
      initialState,
      getOrders.rejected(new Error('error'), 'requestId')
    );
    expect(newState.status).toEqual(RequestStatus.Failed);
  });

  it('should handle getOrders.fulfilled', () => {
    const ordersData = [
      {
        _id: '1',
        status: 'ok',
        name: 'bun',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['']
      },
      {
        _id: '2',
        status: '',
        name: 'cheese',
        createdAt: '',
        updatedAt: '',
        number: 2,
        ingredients: ['']
      },
      {
        _id: '3',
        status: 'ok',
        name: 'ketchup',
        createdAt: '',
        updatedAt: '',
        number: 3,
        ingredients: ['']
      }
    ];
    const newState = ordersSlice.reducer(
      initialState,
      getOrders.fulfilled(ordersData, 'requestId')
    );
    expect(newState.orders).toEqual(ordersData);
    expect(newState.status).toEqual(RequestStatus.Success);
  });
});
