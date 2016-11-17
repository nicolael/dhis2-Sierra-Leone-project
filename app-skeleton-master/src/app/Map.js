import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';
import Info from './Info';
import { connect } from 'react-redux';
import { clickedMarker } from '../actions';

function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  return {markerInfo}; //{markerInfo, dispatch}
}
var currentPath = "ImspTQPwCqd";

class Map extends Component {

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
       //Polygon for level 2
       var polyset2 = [];
       let finalPolygon2 = [];
       let polygon2 = this.props.items.map((item, index) => {
         var s;
         if(item.featureType=="MULTI_POLYGON" || item.featureType=="POLYGON") {
           //ImspTQPwCqd = top parent id(Sierra Leone)
           if(item.parent.id == currentPath) {
               let allPos = [];
               //parse the coordinates to JSON
               allPos.push(JSON.parse(item.coordinates))
               //Need to give the coordinates a latlng
               polyset2 = allPos.map( coords =>{
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

               finalPolygon2.push({
                 path: polyset2,
                 info: item
               })

               //hello.push(polyset2)
           }
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

            {
              finalPolygon2.map( content => {
                var info = content.info;
                //path is an array of arrays of arrays etc..
                //console.log(content.path)
                return content.path.map( coords => {
                  return coords.map( coords2 => {
                    return coords2.map( finalCoords => {
                      return (<Polygon
                        paths={finalCoords} onClick={ (e) =>
                          // Update currentPath, and make the polygon for
                          // this area
                            console.log(info)
                      }
                      />)
                    })
                  })
                })
              })
            }
            </GoogleMap>
          } />
        );
    }
}
export default connect(mapStateToProps) (Map);


// Last solution: <Polygon paths = {polyset} />
/*
<Polygon
strokeColor= "#000"
path= {triangleCoords}
key= {Date.now()}*/

//{coordinates}
//<Polygon paths = {polyset} />
