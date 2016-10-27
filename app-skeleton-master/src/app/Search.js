import Search from 'react-search';
import { loadOrganisationUnits } from '../api';
import React, { Component, PropTypes } from 'react';

class SearchItem extends Component{

  HiItems(items) {
    console.log(items)
  }  
   
  constructor(props) {
    super(props);
    this.state = { repos: [] };
  }

  componentDidMount() {
    this.loadOrganisationUnits();
  }

  loadOrganisationUnits() {
     // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
    loadOrganisationUnits()
        .then((organisationUnits) => {
            this.setState({
            repos: organisationUnits,
        });
      });
    }

    render(){

    let items = this.state.repos.map((item, index) => { return { id: index, value: item.displayName } });
    
      return( 
	      <div id="searchDiv">
	       	<Search items={items}
	                placeholder='Search for a health facility'
	                maxSelected={3}
	                multiple={true}
	                onItemsChanged={this.HiItems.bind(this)} />
            </div>
        );
    }
}
export default SearchItem
