import { combineReducers } from 'redux';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { feedSlice } from './feed';
import { orderSlice } from './order';
import { ordersSlice } from './orders';
const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

export default rootReducer;
