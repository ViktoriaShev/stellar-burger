import feedSlice, { clearOrderDetails } from './feed';
import { getFeedsFromServer, getOrderByNumber } from '../../thunks/feed';
import { RequestStatus } from '../../../utils/types';

describe('feedSlice reducer', () => {
  const initialState = {
    orders: [],
    orderDetails: null,
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle
  };

  it('should handle clearOrderDetails', () => {
    const stateWithOrderDetails = {
      ...initialState,
      orderDetails: {
        _id: '1',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['']
      }
    };
    const newState = feedSlice.reducer(
      stateWithOrderDetails,
      clearOrderDetails()
    );
    expect(newState.orderDetails).toBeNull();
  });

  it('should handle getFeedsFromServer.fulfilled', () => {
    const feedsData = {
      orders: [
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
      ],
      total: 10,
      totalToday: 5,
      success: true
    };
    const newState = feedSlice.reducer(
      initialState,
      getFeedsFromServer.fulfilled(feedsData, 'requestId')
    );
    expect(newState.orders).toEqual(feedsData.orders);
    expect(newState.total).toEqual(feedsData.total);
    expect(newState.totalToday).toEqual(feedsData.totalToday);
    expect(newState.status).toEqual(RequestStatus.Success);
  });

  it('should handle getOrderByNumber.fulfilled', () => {
    const order = {
      _id: '1',
      status: 'ok',
      name: 'bun',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['']
    };
    const newState = feedSlice.reducer(
      initialState,
      getOrderByNumber.fulfilled(
        { success: true, orders: [order] },
        'requestId',
        1
      )
    );
    expect(newState.orderDetails).toEqual(order);
    expect(newState.status).toEqual(RequestStatus.Success);
  });

  it('should handle getFeedsFromServer.rejected and getOrderByNumber.rejected', () => {
    const newState = feedSlice.reducer(
      initialState,
      getFeedsFromServer.rejected(new Error(''), '')
    );
    expect(newState.status).toEqual(RequestStatus.Failed);

    const newState2 = feedSlice.reducer(
      initialState,
      getOrderByNumber.rejected(new Error(), '', 400)
    );
    expect(newState2.status).toEqual(RequestStatus.Failed);
  });

  it('should handle getFeedsFromServer.pending and getOrderByNumber.pending', () => {
    const newState = feedSlice.reducer(
      initialState,
      getFeedsFromServer.pending('')
    );
    expect(newState.status).toEqual(RequestStatus.Loading);

    const newState2 = feedSlice.reducer(
      initialState,
      getOrderByNumber.pending('', 204)
    );
    expect(newState2.status).toEqual(RequestStatus.Loading);
  });
});
