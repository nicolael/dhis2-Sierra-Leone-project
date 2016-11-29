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
    	name: 'abcInf5750',
    	shortName: 'abcInf5750',
    	level : 4,
    	featureType: 'POINT',
    	coordinates: '[-11.1447,10.4149]',
    	openingDate:'2016-01-01',
      lat:'',
      lng:'',
      value:'',
      //Must fill out parent for it to show up
      parent: {
        id: 'DNRAeXT9IwS'
      }
    };

    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLong = this.getLong.bind(this);
  }

  handleName(event) {
    this.setState({name: event.target.value});
    this.setState({shortName: event.target.value})
  }


  handleSubmit(event) {
    alert('An organisation unit was submitted\n'+"Name : "+this.state.name
      +"\nParent : "+this.state.parent.id+"\nCoordinates : "+this.state.coordinates);
    event.preventDefault();
    saveOrganisationUnit(this.state);
  }

  handleChange(event) {
    this.setState({parent: {id:this.props.parentId[event.target.value]}});
  }

  drop(Data){

        var MakeItem = function(X) {
              return <option>{X}</option>;
        };
        return <select id ={this.state.id} onChange={this.handleChange}>{Data.map(MakeItem)}</select>;
    }

  getCoords(event){
    var coords = "["+this.props.coordState.latLng.lng()+","+this.props.coordState.latLng.lat()+"]"
    this.setState({coordinates : coords});
    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
        Lat:
        <input type="text" value={this.props.coordState == null ? null : this.props.coordState.latLng.lat()} onChange={this.getLat}/>
        Long:
        <input type="text" value={this.props.coordState == null ? null : this.props.coordState.latLng.lng()} onChange={this.getLong}/>
        <button onClick = {this.getCoords}>Set coordinates</button>
        <br />
        <br />
        Select parent :
        <label>
        {this.drop(this.props.parentName)}
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default connect (mapStateToProps) (SaveOrg);
