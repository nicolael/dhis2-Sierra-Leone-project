import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit } from '../api';

class EditOrg extends Component{

  constructor(props) {
    super(props);
    this.state = {
        name: '',
        shortName: '',
        lat:'',
        lng:'',
        parentId:''};

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
    alert('An org was submitted:\n'+"name : "+this.state.name+" id :"+this.state.id+" coords["+this.state.lat+","+this.state.lng+"]");
    event.preventDefault();


    saveOrganisationUnit({"name":"helloo", "shortName":"yoomafaaka","openingDate":"1970-01-01"});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
        ID:
        <input type="text" id={this.state.id} onChange={this.handleId} />
        Lat:
        <input type="text" lat={this.state.lat} onChange={this.handleLat} />
        Lng:
        <input type="text" lng={this.state.lng} onChange={this.handleLng} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default EditOrg
