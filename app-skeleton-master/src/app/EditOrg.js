import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit } from '../api';
import { connect} from 'react-redux';

function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  return {markerInfo}; //{markerInfo, dispatch}
}

class EditOrg extends Component{

  constructor(props) {
    super(props);
    this.state = {
      // Setting default values
        name: this.props.markerInfo.name,
        lat: this.props.markerInfo.lat,
        lng:this.props.markerInfo.lng,

      };

    this.handleName = this.handleName.bind(this);
    //this.handleId   = this.handleId.bind(this);
    this.handleLat = this.handleLat.bind(this);
    this.handleLng = this.handleLng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValuesById(){

  }



  handleName(event) {
    this.setState({name: event.target.value});
  }

/*  handleId(event) {

    this.setState({id: event.target.value});
  }*/

  handleLat(event){
    this.setState({lat: event.target.value});
  }
  handleLng(event){
    this.setState({lng: event.target.value});
  }

  handleSubmit(event) {
    alert('An org was submitted:\n'+"name : "+this.state.name+" id :"+this.state.id+" coords["+this.state.lat+","+this.state.lng+"]");
    event.preventDefault();


    //saveOrganisationUnit({"name":"helloo", "shortName":"yoomafaaka","openingDate":"1970-01-01"});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={(e) => this.handleName(e)} value={this.state.name} />

        Lat:
        <input type="text" lat={this.state.lat} onChange={(e) => this.handleLat(e)} value={this.state.lat} />

        Lng:
        <input type="text" lng={this.state.lng} onChange={(e) => this.handleLng(e)} value={this.state.lng} />
      </form>
    );
  }
}

export default connect(mapStateToProps)(EditOrg);
