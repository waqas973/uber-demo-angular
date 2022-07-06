import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loginStateType } from './reducer/loginReducer';
import { SelectedLocationsType } from './reducer/userSelectedLocationsReducer';

export const loginFeatureSelector =
  createFeatureSelector<loginStateType>('login');

export const actionModeFeatureSelector = createFeatureSelector<{
  action_mode: string;
}>('actionMode');

export const selectedLocationFeatureSelector =
  createFeatureSelector<SelectedLocationsType>('selectedLocations');

export const loginSelector = createSelector(
  loginFeatureSelector,
  (loginState) => loginState
);
export const actionModeSelector = createSelector(
  actionModeFeatureSelector,
  (actionModeState) => actionModeState.action_mode
);

export const selectedLocationsSelector = createSelector(
  selectedLocationFeatureSelector,
  (selectedLocationsState) => selectedLocationsState
);
