/*
This is the store for the setting up of redux,
does not need to be changed
*/

import {createStore} from 'redux';
import combinedReducers from './reducer';

export default function Store(preloadedState) {
  return createStore(combinedReducers, preloadedState);
}
