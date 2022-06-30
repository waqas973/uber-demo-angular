import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/actions';

export const initialState: { action_mode: string } = {
  action_mode: '',
};

const actionModeReducer = createReducer(
  initialState,
  on(actions.actionMode, (state, { payload }): { action_mode: string } => ({
    ...state,
    action_mode: payload,
  }))
);

export function reducers(state: { action_mode: string }, action: Action) {
  return actionModeReducer(state, action);
}
