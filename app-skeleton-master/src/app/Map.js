import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';
import Info from './Info';
import { connect } from 'react-redux';
import { clickedMarker, clickedPolygon, clickedLastPolygon, showFirstLevelPolygons, clickedMap, showSearch } from '../actions';

function mapStateToProps( state ) {
  const { markerInfo } = state.mapReducer;
  const { polyState } = state.mapReducer;
  const { markerState } = state.mapReducer;
  const { coordState } = state.mapReducer;
  const { counterState } = state.counterReducer;
  const { searchState } = state.counterReducer;
  return {markerInfo, polyState, markerState, counterState, searchState, coordState};
}

class Map extends Component {

  //Runs every time the component updates
  componentDidUpdate() {
    if(this.props.searchState != null){
      this.findMultipleMarkersAndPolygons();
      this.props.dispatch(showSearch(null));
    }
  }

  //Helper method to set the polyState
  setPolyState(polygon) {
    this.props.dispatch(clickedPolygon(polygon))
  }

  setFirstPolygon(id) {
    if(!this.props.counterState) {
      //Set counterState to true
      this.props.dispatch(showFirstLevelPolygons(true))
      this.nextPolygon(id)
     }
  }

  // Sets the state to the next polygon
  nextPolygon(id) {
    var polyset = [];
    let finalPolygon = [];
    let polygon = this.props.items.map((item, index) => {
      var s;
      if(item.featureType=="MULTI_POLYGON" || item.featureType=="POLYGON") {
        if(item.parent.id == id) {
            let allPos = [];
            //Parse the coordinates to JSON
            allPos.push(JSON.parse(item.coordinates))
            //Need to give the coordinates a latlng
            polyset = allPos.map( coords =>{
              return coords.map( coords2 => {
                return coords2.map( coords3 =>{
                  return coords3.map( finalCoord =>{
                    return {
                      //The order is switched, so lat is position 1 and lng 2
                      lat: finalCoord[1],
                      lng: finalCoord[0]
                    }
                  })
                })
              })
            })

            finalPolygon.push({
              path: polyset,
              info: item
            })
        }
      }
    });
    //Code for markers
    if(finalPolygon.length == 0) {
      this.getMarker(id);
      //Call a method to set the polyState to only the polygon last clicked
      this.getOnePolygon(id);
    } else {
      this.setPolyState(finalPolygon);
    }
  }

  // Finds the right polygon when setting markers.
  // Sets the polygon with the markers.
  getOnePolygon(currentId) {
    var polyset = [];
    let finalPolygon = [];
    let polygon = this.props.items.map((item, index) => {
      var s;
      if(item.featureType=="MULTI_POLYGON" || item.featureType=="POLYGON") {
        if(item.id == currentId) {
            let allPos = [];
            //parse the coordinates to JSON
            allPos.push(JSON.parse(item.coordinates))
            //Need to give the coordinates a latlng
            polyset = allPos.map( coords =>{
              return coords.map( coords2 => {
                return coords2.map( coords3 =>{
                  return coords3.map( finalCoord =>{
                    return {
                      //The order is switched, so lat is position 1 and lng 2
                      lat: finalCoord[1],
                      lng: finalCoord[0]
                    }
                  })
                })
              })
            })
            finalPolygon.push({
              path: polyset,
              info: item
            })
        }
      }
    });
    this.setPolyState(finalPolygon);
  }

  //Sets a state for markers at the last level
  //finds all the markers for that has the parent sent in as a parameter
  getMarker(parent) {
    var sets;
    let coordinates = this.props.items.map((item, index) => {
      if(item.featureType=="POINT"){
        if(item.parent.id == parent) {

          sets = item.coordinates.substr(1, item.coordinates.length - 2).split(',');

          var info = [];
          info['name'] = item.name;
          info['openingDate'] = item.openingDate;
          info['id'] = item.id;
          info['lat'] = parseFloat(sets[1]);
          info ['lng'] = parseFloat(sets[0]);

          const marker = {
            position: {
              lat: parseFloat(sets[1]),
              lng: parseFloat(sets[0])
            }
          }
        return <Marker key={index}{...marker}
            onClick={ () =>
                this.props.dispatch(clickedMarker(info))
            }/>
        }
      }
     });
     this.props.dispatch(clickedLastPolygon(coordinates))
  }

  //Finds the markers and polygons that have been searched on
  findMultipleMarkersAndPolygons() {
    var sets;
    let coords = this.props.items.map(item2 => {
      return this.props.items.map((item, index) => {
        if(item.featureType=="POINT"){
          if(item.id == item2.id) {

            sets = item.coordinates.substr(1, item.coordinates.length - 2).split(',');

            var info = [];
            info['name'] = item.name;
            info['openingDate'] = item.openingDate;
            info['id'] = item.id;
            info['lat'] = parseFloat(sets[1]);
            info ['lng'] = parseFloat(sets[0]);

            const marker = {
              position: {
                lat: parseFloat(sets[1]),
                lng: parseFloat(sets[0])
              }
            }
          return <Marker key={index}{...marker}
              onClick={ () =>
                  this.props.dispatch(clickedMarker(info))
              }/>
          }
        } else if(item.featureType=="MULTI_POLYGON" || item.featureType=="POLYGON") {
          this.nextPolygon(this.props.mainId);
        }
       });
    })
     this.props.dispatch(clickedLastPolygon(coords))
  }

    render(){

      const mapContainer = <div style ={{height: '100%', width:'100%'}}></div>

      return(
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = {
            <GoogleMap
              defaultZoom={8}
              defaultCenter={this.props.center}
              options={{streetViewControl: false, mapTypeControl: false}}
              onClick={(e) => this.props.dispatch(clickedMap(e)) }
            >
            <div className="polyButton">
              <button onClick = {() => this.setFirstPolygon(this.props.mainId)}>Show polygons</button>
            </div>
            {
              this.props.polyState == null ? null : this.props.polyState.map( content => {
                var info = content.info;
                //path is an array of arrays of arrays etc..
                return content.path.map( coords => {
                  return coords.map( coords2 => {
                    return coords2.map( finalCoords => {
                      return (<Polygon
                        paths={finalCoords} onClick={ () => this.nextPolygon(info.id)
                      }
                      />)
                    })
                  })
                })
              })
            }

            {
              this.props.markerState == null ? null : this.props.markerState
            }
            </GoogleMap>
          } />
        );
    }
}
export default connect(mapStateToProps) (Map);
