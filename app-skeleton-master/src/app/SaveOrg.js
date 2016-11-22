import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit } from '../api';

class SaveOrg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: 'Yuuu',
    	shortName: 'Yuuu',
    	level : 4,
    	featureType: 'POINT',
    	coordinates: '[-11.1447,10.4149]',
    	lat:'',
    	lng:'',
    	openingDate:'1970-01-01'};

    this.handleName = this.handleName.bind(this);
    this.handleId   = this.handleId.bind(this);
    this.handleLat = this.handleLat.bind(this);
    this.handleLng = this.handleLng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleName(event) {
    this.setState({name: event.target.value});
  }
  handleId(event) {
    this.setState({id: event.target.value});
  }
  handleLat(event){
  	this.setState({lat: event.target.value});
  }
  handleLng(event){
  	this.setState({lng: event.target.value});
  }

  handleSubmit(event) {
    alert('An org was submitted:\n'+"name : "+this.state.name+" id :"+" coords" +this.state.coordinates);
    event.preventDefault();
    //saveOrganisationUnit({"name":"helloo", "shortName":"yoomafaaka","openingDate":"1970-01-01"});
    saveOrganisationUnit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
        Lat:
        <input type="text" lat={this.state.lat} onChange={this.handleLat} />
        Lng:
        <input type="text" lng={this.state.lng} onChange={this.handleLng} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default SaveOrg