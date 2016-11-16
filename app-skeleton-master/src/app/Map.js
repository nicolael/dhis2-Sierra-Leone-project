import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';

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
       var polyset = [];
       let polygon2 = this.props.items.map((item, index) => {
         //var s;
         var s;
         if(item.featureType=="MULTI_POLYGON" || item.featureType=="POLYGON") {
           //ImspTQPwCqd = top parent id(Sierra Leone)
           if(item.parent.id == "ImspTQPwCqd") {
             //s is one long string of the polygon coordinates
             s = item.coordinates.substr(4, item.coordinates.length - 6).split('],[');

             var allPos = [];
             var lastpos;
             for(var i = 0; i < s.length; i++) {
               var cord = s[i];
               cord = cord.split(",");

               var pos = {
                 lat: parseFloat(cord[1]),
                 lng: parseFloat(cord[0])
               };
               /*
               if(lastpos != null) {
                 var d = distance(lastpos.lat, lastpos.lng, pos.lat, pos.lng, 'K');

                 if(d > 100) {
                   allPos.push(pos);
                   break;
                 }
               }
               */
               lastpos = pos;
               allPos.push(pos);
             }
             polyset.push(
               allPos);
           }
         }
       });

       var triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];

        console.log("triangle: " + triangleCoords);

      return(
        <GoogleMapLoader
          containerElement = { mapContainer }
          googleMapElement = {
            <GoogleMap
              defaultZoom={8}
              defaultCenter={this.props.center}
              options={{streetViewControl: false, mapTypeControl: false}}>      
            {coordinates}              
              <Polygon paths = {polyset} />
            </GoogleMap>

          } />
        );
    }
}
export default connect(mapStateToProps) (Map);

/*
<Polygon
strokeColor= "#000"
path= {triangleCoords}
key= {Date.now()}*/

//{coordinates}
//<Polygon paths = {polyset} />
