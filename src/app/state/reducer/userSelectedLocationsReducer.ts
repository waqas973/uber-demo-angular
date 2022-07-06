import { createReducer, on, Action } from '@ngrx/store';
import { selectedFromType } from 'src/app/shared/Types';
import * as actions from '../actions/actions';

export interface SelectedLocationsType {
  pickupLocation: selectedFromType | null;
  destinationLocation: selectedFromType | null;
}

const initState: SelectedLocationsType = {
  pickupLocation: null,
  destinationLocation: null,
};

const userSelectedLocationsReducer = createReducer(
  initState,
  on(actions.userSelectedLocationsAction, (state, { payload }) => ({
    ...state,
    pickupLocation: payload.pickupLocation,
    destinationLocation: payload.destinationLocation,
  }))
);

export function reducers(state: SelectedLocationsType, action: Action) {
  return userSelectedLocationsReducer(state, action);
}
