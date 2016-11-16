import React, { Component } from 'react';
import { loadOrganisationUnits } from '../api';
import List from './List';
import Map from './Map';
import SearchItem from './Search';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class Load extends Component {

    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
            isLoading: true,
            items: [],
        };
    }

    componentDidMount() {
        this.loadOrganisationUnits();
    }

    loadOrganisationUnits() {
        // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
        loadOrganisationUnits()
            .then((organisationUnits) => {
                this.setState({
                    isLoading: false,
                    items: organisationUnits,
                });
            });
    }

    render() {

      //let items = this.data.loadGeoJson("/api/26/geoFeatures.json?ou=ou:LEVEL-3");

      //for(var i =0; i<items.length; i++){
        //console.log(items[i].id);
      //}
  /*    const basicAuth = `Basic ${btoa('admin:district')}`;
      const fetchOptions = {
          method: 'GET',
          headers: {
              Authorization: basicAuth,
              'Content-Type': 'application/json',
          },
      };

      function promises(response){
        if(response.status != 0)
          return Promise.resolve(response);
        }
        return Promise.reject(response);

      export function test(){
        return fetch(`http://localhost:8082/api/geoFeatures.json?ou=ou:LEVEL-2`, fetchOptions)
         .then(promises)
         .then(response => response.json())
         .then(({organisationUnits}) => organisationUnits);
      }*/


        const center = {
            lat: 8.431759,
            lng: -11.743826
        }
        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
        return (

            <div className="mapAndList">
                <div className="listDiv">
                    <SearchItem items={this.state.items}/>
                </div>

                <div className ="mapDiv">
                <Map center={center} items={this.state.items}/>
                </div>
            </div>

        );

    }
}
