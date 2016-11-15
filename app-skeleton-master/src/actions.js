export const MARKER_CLICKED = 'MARKER_CLICKED';

/*
Different actions to be taken when we want to change a state
A method for each event that will change the state
*/
export function clickedMarker(markerInfo) {
  return {
    type: MARKER_CLICKED,
    markerInfo
  }
}
