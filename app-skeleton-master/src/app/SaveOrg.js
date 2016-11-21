import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit } from '../api';

class SaveOrg extends Component {


	render(){

		return(
	    <div>
	    	<form>
				  Name :
				  <input type="text" name="name"/>
				  ID :
				  <input type="text" name="id" />
				  Lat :
				  <input type="text" name="lat" />
				  Lng :
				  <input type="text" name="lng" />
				  <input type="submit" value="Submit" />
				</form>
    	</div>
  	);
	}
}
export default SaveOrg
