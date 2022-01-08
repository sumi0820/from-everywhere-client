import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../domains/models/item';

export type ItemsState = { items: Item[] };
const initialState: ItemsState = { items: [] };

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsGotten: (state, action: PayloadAction<{ items: Item[] }>) => ({
      ...state,
      items: action.payload.items,
    }),
  },
});
