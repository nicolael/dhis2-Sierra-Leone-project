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
    	//openingDate:'2016-01-01',
      openingDate : new Date().toISOString().substring(0, 10),
      //Must fill out parent for it to show up
      parent: {
        id: 'DNRAeXT9IwS'
      }
    };

    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.handleDate = this.handleDate.bind(this);
  
  }

  handleName(event) {
    this.setState({name: event.target.value});
    this.setState({shortName: event.target.value})
  }


  handleSubmit(event) {

    var coords = "["+this.props.coordState.latLng.lng()+","+this.props.coordState.latLng.lat()+"]"
    var orgUnit = this.state;
    
    if(coords!=null){
      orgUnit.coordinates = coords;
      var date = new Date().toISOString();;
      var res = date.substring(0, 10);
      alert(res); 
      orgUnit.openingDate = res;
       
    }
    
    alert('An organisation unit was submitted\n'+"Name : "+orgUnit.name
      +"\nParent : "+this.state.parent.id+"\nCoordinates : "+orgUnit.coordinates);
    event.preventDefault();
    saveOrganisationUnit(orgUnit);
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
  getDato(event){
      var date = new Date().toISOString();;
      var res = date.substring(0, 10);
      this.setState({openingDate:res});
      event.preventDefault();
  }
  handleDate(event){
    this.setState({name: event.target.value});
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
        Lat:
        <input type="text" value={this.props.coordState == null ? null : this.props.coordState.latLng.lat()} />
        Long:
        <input type="text" value={this.props.coordState == null ? null : this.props.coordState.latLng.lng()} />
        <br />
        <br />
        Opening date :
        <input type="text" defaultValue={this.state.openingDate} onChange={this.handleDate} />
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
