/*
File containing all the fuctions(reducers) that will change the state
*/

import { combineReducers} from 'redux';

//Importing all the types made in the actions.js
import {
  MARKER_CLICKED,
  POLYGON_CLICKED,
  LAST_POLYGON,
  MAP_CLICKED,
  COUNTER,
  SEARCHSHOW
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
    case POLYGON_CLICKED:
      return Object.assign( {}, state, {
        polyState: action.polyState
      })
    case LAST_POLYGON:
      return Object.assign( {}, state, {
        markerState: action.markerState
    })
    case MAP_CLICKED:
      return Object.assign( {}, state, {
        coordState: action.coordState
      })
    default:
      return state;
  }
}

function counterReducer(state = false, action) {
  switch(action.type) {
    case COUNTER:
      return Object.assign( {}, state, {
        counterState: action.counterState
      })
    case SEARCHSHOW:
      return Object.assign( {}, state, {
        searchState: action.searchState
      })
    default:
    return state;
  }
}

const combinedReducers = combineReducers({
  mapReducer,
  counterReducer
})

export default combinedReducers;
