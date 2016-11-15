/*
File containing all the fuctions(reducers) that will change the state
*/

import { combineReducers} from 'redux';

//Importing all the types made in the actions.js
import {
  MARKER_CLICKED
} from './actions';

/*
Changes the state after a marker is clicked
*/
function mapReducer(state = {}, action) {
  switch(action.type) {
    case MARKER_CLICKED:
      return Object.assign( {}, state, {
        markerInfo: action.markerInfo
      })
    default:
        return state;
  }
}
