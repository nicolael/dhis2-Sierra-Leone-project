import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit } from '../api';
import { connect } from 'react-redux';

function mapStateToProps(state) {

  const { coordState } = state.mapReducer;
  return {coordState};
}

class SaveOrg extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	shortName: 'Yuuu1',
    	level : 4,
    	featureType: 'POINT',
    	coordinates: '[-11.1447,10.4149]',
    	lat:'',
    	lng:'',
    	openingDate:'2016-01-01',
      //Must fill out parent for it to show up
      parent: {
        id: 'YuQRtpLP10I'
      }
    };

    this.handleName = this.handleName.bind(this);
    this.handleId   = this.handleId.bind(this);
    this.handleLat  = this.handleLat.bind(this);
    this.handleLng  = this.handleLng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    saveOrganisationUnit(this.state);
  }
  handleChange(event) {
    this.setState({id: event.target.value});
  }

  drop(Data){
        
        //var Data     = ['this', 'example', 'isnt', 'funny'],
        var MakeItem = function(X) {
              return <option>{X}</option>;
        };

        return <select id ={this.state.id} onChange={this.handleChange}>{Data.map(MakeItem)}</select>;
    
    }

  render() {
<<<<<<< HEAD

    console.log(this.state.id)
=======
>>>>>>> 0f6903c2bdff456ce598303fc06b658e2a917979

    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
        Lat:
        <input type="text" lat={this.state.lat} placeholder = {this.props.coordState == null ? null : this.props.coordState.latLng.lat()} onChange={this.handleLat} />
        Lng:
        <input type="text" lng={this.state.lng} placeholder = {this.props.coordState == null ? null : this.props.coordState.latLng.lng()} onChange={this.handleLng} />
        Select parent :
        <label>
        {this.drop(this.props.parent)}
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default connect (mapStateToProps) (SaveOrg);
