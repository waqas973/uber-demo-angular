import { createAction, props } from '@ngrx/store';
import { loginApiResponseType } from 'src/app/shared/Types';
import { SelectedLocationsType } from '../reducer/userSelectedLocationsReducer';
import {
  actionModeType,
  loginType,
  logoutType,
  userSelectedLocationsType,
} from './actionType';

export const loginAction = createAction(
  loginType,
  props<{ payload: loginApiResponseType }>()
);

export const actionMode = createAction(
  actionModeType,
  props<{ payload: string }>()
);
export const logoutAction = createAction(logoutType);

export const userSelectedLocationsAction = createAction(
  userSelectedLocationsType,
  props<{
    payload: SelectedLocationsType;
  }>()
);
