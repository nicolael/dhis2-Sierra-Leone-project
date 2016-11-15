import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import Info from './Info';
import { connect } from 'react-redux';
import { clickedMarker } from '../actions';

function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  return {markerInfo}; //{markerInfo, dispatch}
}

class Map extends Component {
    // map.data.loadGeoJson("http..");

    render(){
      const mapContainer = <div style ={{height: '100%', width:'100%'}}></div>
      //Going through the markers property, map iteration
      var sets;
      let coordinates = this.props.items.map((item, index) => {
        if(item.featureType=="POINT"){
          //console.log(item.coordinates+ " " + item.shortName);
          sets = item.coordinates.substr(1, item.coordinates.length - 2).split(',');
          //console.log(sets[0]+" "+sets[1]);
          var info = item.name + "\n" + item.openingDate + "\n" + item.coordinates;

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
       });

      return(
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = {
            <GoogleMap
              defaultZoom={8}
              defaultCenter={this.props.center}
              options={{streetViewControl: false, mapTypeControl: false}}>
            {coordinates}
            </GoogleMap>

          } />
        );
    }
}
export default connect(mapStateToProps) (Map);
