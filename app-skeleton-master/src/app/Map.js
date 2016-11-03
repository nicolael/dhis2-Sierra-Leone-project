import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {

    render(){
      const mapContainer = <div style ={{height: '100%', width:'100%'}}></div>
      
      // Going through the markers property, map iteration
      const markers = this.props.markers.map((venue, i) => {

        // Creating a marker variable for elements in the array
        const marker = {
          position: {
            lat: venue.location.lat,
            lng: venue.location.lng
          }
        }
        return <Marker key={i}{...marker} />
      })

      return( 
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = { 
            <GoogleMap
              defaultZoom={8}
              defaultCenter={this.props.center}
              options={{streetViewControl: false, mapTypeControl: false}}>
              { markers }            
            </GoogleMap>
          } />
        );
    }
}
export default Map