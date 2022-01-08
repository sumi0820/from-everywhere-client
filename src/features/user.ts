import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../domains/index';

export type UserState = { loggedInUser: User | null };
const initialState: UserState = { loggedInUser: null };

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    userGotten: (state, action: PayloadAction<{ loggedInUser: User }>) => ({
      ...state,
      loggedInUser: action.payload.loggedInUser,
      isLoading: false,
      error: null,
    }),
  },
});
