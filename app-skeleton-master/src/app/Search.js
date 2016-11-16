import Search from 'react-search';
import { loadOrganisationUnits } from '../api';
import React, { Component, PropTypes } from 'react';

class SearchItem extends Component{

  render(){

    let items = this.props.items.map((item, index) => { return { id: index, value: item.shortName} });
    
      return( 
	      <div>
	       	<Search items={items}
	                placeholder=' Search for a health facility '
	                maxSelected={5}
	                multiple={true}
	                onItemsChanged={this.props.HiItems.bind(this)} />
        </div>
        );
    }
}
export default SearchItem
