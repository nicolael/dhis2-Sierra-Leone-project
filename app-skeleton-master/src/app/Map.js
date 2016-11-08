import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {


    render(){
      const mapContainer = <div style ={{height: '100%', width:'100%'}}></div>
      //let items = this.props.items.map((item, index) => { return { id: index, value: item.shortName} });
      //Going through the markers property, map iteration   
      var sets;
      let coordinates = this.props.items.map((item, index) => { 
        if(item.featureType=="POINT"){
          //console.log(item.coordinates+ " " + item.shortName);
          sets = item.coordinates.substr(1, item.coordinates.length - 2).split(',');
          console.log(sets[0]+" "+sets[1]);

          const marker = {
          position: {
            lat: parseFloat(sets[1]),
            lng: parseFloat(sets[0])
          }
        }
        return <Marker key={index}{...marker} />
        }
      

       });
    

    /*
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
  */
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
export default Map