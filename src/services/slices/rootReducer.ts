import { combineReducers } from 'redux';
import { userSlice } from './user/user';
import { ingredientsSlice } from './ingredients/ingredients';
import { constructorSlice } from './burgerConstructor/burgerConstructor';
import { feedSlice } from './feed/feed';
import { orderSlice } from './order/order';
import { ordersSlice } from './orders/orders';
const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

export default rootReducer;
