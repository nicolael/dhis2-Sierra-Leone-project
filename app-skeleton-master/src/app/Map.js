import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';

class Map extends Component {
   /*
   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
  */
    render(){
      
        /*just for testing purposes*/
        var triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757}
        ];

        //console.log(triangleCoords);

      const mapContainer = <div style ={{height: '100%', width:'100%'}}></div>
      //Going through the markers property, map iteration   
      var sets;
      let coordinates = this.props.items.map((item, index) => { 
      
      if(item.featureType=="POINT"){
          //console.log(item.coordinates+ " " + item.shortName);
          sets = item.coordinates.substr(1, item.coordinates.length - 2).split(',');
          //console.log(sets[0]+" "+sets[1]);

          const marker = {
          position: {
            lat: parseFloat(sets[1]),
            lng: parseFloat(sets[0])
          }
        }
        return <Marker key={index}{...marker} />
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
            < Polygon paths={triangleCoords} />
            </GoogleMap>

          } />
        );
    }
}
export default Map