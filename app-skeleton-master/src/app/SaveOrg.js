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
      //Must fill out parent for it to show up
      parent: {
        id: 'DNRAeXT9IwS'
      }
    };

    this.handleName = this.handleName.bind(this);
    this.handleId   = this.handleId.bind(this);
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
    //this.setState({coordinates: '['+this.state.lng+","+this.state.lat});
    alert('An org was submitted:\n'+"name : "+this.state.name+"\nlat : " +this.state.lat + "\nlong :"+this.state.lng+"\n coordinates : "+this.state.coordinates);
    event.preventDefault();
    saveOrganisationUnit(this.state);
  }
  handleChange(event) {
    this.setState({parent: {id:event.target.value}});
    console.log(this.state.parent.id);
  }

  drop(Data){
        
        var MakeItem = function(X) {
              return <option>{X}</option>;
        };

        return <select id ={this.state.id} onChange={this.handleChange}>{Data.map(MakeItem)}</select>;
    
    }

  getLat(){
    var test = this.props.coordState == null ? null : this.props.coordState.latLng.lat();
    return test;
  }
  getLong(){
    var test = this.props.coordState == null ? null : this.props.coordState.latLng.lng();
    return test;
  }

  render() {

    console.log(this.state.parent.id)

    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <input type="text" name={this.state.name} onChange={this.handleName} />
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
