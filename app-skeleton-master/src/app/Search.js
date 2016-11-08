import Search from 'react-search';
import { loadOrganisationUnits } from '../api';
import React, { Component, PropTypes } from 'react';

class SearchItem extends Component{

  HiItems(items) {
    console.log(items)
  }  
  
    render(){

    let items = this.props.items.map((item, index) => { return { id: index, value: item.shortName} });
    
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
