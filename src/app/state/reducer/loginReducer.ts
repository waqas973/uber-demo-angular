import { Action, createReducer, on } from '@ngrx/store';
import { loginApiResponseType } from 'src/app/shared/Types';
import * as actions from '../actions/actions';

export interface loginStateType {
  IsUserLogIn: boolean;
  userData: loginApiResponseType | null;
}

export const initialState: loginStateType = {
  IsUserLogIn: false,
  userData: null,
};

const loginReducer = createReducer(
  initialState,
  on(
    actions.loginAction,
    (state, { payload }): loginStateType => ({
      ...state,
      IsUserLogIn: true,
      userData: payload,
    })
  ),
  on(
    actions.logoutAction,
    (state): loginStateType => ({
      ...state,
      IsUserLogIn: false,
      userData: null,
    })
  )
);

export function reducers(state: loginStateType, action: Action) {
  return loginReducer(state, action);
}
