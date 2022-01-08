import { combineReducers } from 'redux';
import { itemsSlice } from './item';
import { userSlice } from './user';

const reducers = combineReducers({
  item: itemsSlice.reducer,
  user: userSlice.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>
