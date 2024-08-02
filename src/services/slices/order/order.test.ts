import orderSlice, { clearData } from './order';
import { postOrderBurger } from '../../thunks/order';
import { RequestStatus } from '../../../utils/types';

describe('orderSlice reducer', () => {
  const initialState = {
    info: null,
    status: RequestStatus.Idle
  };

  it('should handle clearData', () => {
    const stateWithOrderDetails = {
      ...initialState,
      info: {
        order: {
          id: 'orderId',
          _id: '',
          status: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['']
        },
        name: 'OrderName'
      }
    };
    const newState = orderSlice.reducer(stateWithOrderDetails, clearData());
    expect(newState.info).toBeNull();
  });

  it('should handle postOrderBurger.fulfilled', () => {
    const orderData = {
      order: {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['']
      },
      name: 'OrderName',
      success: true
    };
    const newState = orderSlice.reducer(
      initialState,
      postOrderBurger.fulfilled(orderData, 'requestId', [''])
    );
    expect(newState.info).toEqual(orderData);
    expect(newState.status).toEqual(RequestStatus.Success);
  });

  it('should handle postOrderBurger.rejected', () => {
    const newState = orderSlice.reducer(
      initialState,
      postOrderBurger.rejected(new Error('error'), 'requestId', [''])
    );
    expect(newState.status).toEqual(RequestStatus.Failed);
  });

  it('should handle postOrderBurger.pending', () => {
    const newState = orderSlice.reducer(
      initialState,
      postOrderBurger.pending('requestId', [''])
    );
    expect(newState.status).toEqual(RequestStatus.Loading);
  });
});
