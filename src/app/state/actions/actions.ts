import { createAction, props } from '@ngrx/store';
import { loginApiResponseType } from 'src/app/shared/Types';
import { actionModeType, loginType, logoutType } from './actionType';

export const loginAction = createAction(
  loginType,
  props<{ payload: loginApiResponseType }>()
);

export const actionMode = createAction(
  actionModeType,
  props<{ payload: string }>()
);
export const logoutAction = createAction(logoutType);
