import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appSelector, useAppSelector } from 'app/store/store';
import { RootStateType } from 'app/store/types';
import { ReactElement } from 'react';

type AppRootStateType = RootStateType<messageSliceType>;

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
  state: boolean;
  options: {
    variant: 'success' | 'error' | 'warning' | 'info';
    anchorOrigin: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'center' | 'right';
    };
    autoHideDuration: number | null;
    message: ReactElement | string;
  };
};

/**
 * The initial state of the message slice.
 */
const initialState: initialStateProps = {
  state: false,
  options: {
    variant: 'info',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 2000,
    message: 'Hi'
  }
};

export type ShowToast = Partial<initialStateProps['options']>;

/**
 * The Message slice.
 */
export const fuseMessageSlice = createSlice({
  name: 'fuseMessage',
  initialState,
  reducers: {
    showMessage(state, action: PayloadAction<ShowToast>) {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload
      };
    },
    hideMessage(state) {
      state.state = false;
    }
  }
});

export const { hideMessage, showMessage } = fuseMessageSlice.actions;

export const selectFuseMessageState = (state: AppRootStateType) => state.fuseMessage.state;

export const selectFuseMessageOptions = (state: AppRootStateType) => state.fuseMessage.options;

export type messageSliceType = typeof fuseMessageSlice;

export default fuseMessageSlice.reducer;
