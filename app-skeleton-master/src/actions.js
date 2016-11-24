export const MARKER_CLICKED = 'MARKER_CLICKED';
export const POLYGON_CLICKED = 'POLYGON_CLICKED';
export const LAST_POLYGON = 'LAST_POLYGON';
export const COUNTER = 'COUNTER';
export const SEARCHSHOW = 'SEARCHSHOW';
export const MAP_CLICKED = 'MAP_CLICKED';

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

/*
Change the state of the polygons after a polygon is clicked
*/
export function clickedPolygon(polyState) {
  return {
    type: POLYGON_CLICKED,
    polyState
  }
}
/*
  Change the state after a polygon is clicked, if there are no
  more polygons to show, show the markers inside that polygon
*/
export function clickedLastPolygon(markerState) {
  return {
    type: LAST_POLYGON,
    markerState
  }
}

/*

*/
export function showFirstLevelPolygons(counterState) {
  return {
    type: COUNTER,
    counterState
  }
}

/**/
export function showSearch(searchState) {
  return {
    type: SEARCHSHOW,
    searchState
  }
}

/**/
export function clickedMap(coordState) {
  return {
    type: MAP_CLICKED,
    coordState
  }
}
