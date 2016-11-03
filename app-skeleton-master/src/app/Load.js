import React, { Component } from 'react';
import { loadOrganisationUnits } from '../api';
import List from './List';
import Map from './Map';
import SearchItem from './Search';
import superagent from 'superagent';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class Load extends Component {


    componentDidMount() {
        // Overwrites 
        console.log('compoenentDidMount')

        const url = 
        // Promises
        superagent
        .get()
        .query(null)
        .set('Accept', 'text/json')
        .end((error, response) => {

            console.log(JSON.stringify(response.body))

        })
    }

    render() {
        const location = {
            lat: 8.431759,
            lng: -11.743826
        }

         // Marker to Map
        const markers = [
            {
                location: {
                    lat: 8.431759,
                    lng: -11.743826
                }
            }
        ]
        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
        return (

            <div className="mapAndList">
                
                <div className="listDiv">
                    <SearchItem />
                </div>

                <div className ="mapDiv">
                <Map center={location} markers={markers}/>
                </div>
            </div>
        );
    }
}