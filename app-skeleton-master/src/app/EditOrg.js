import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit, editOrganisationUnit, loadOrganisationUnitToEdit } from '../api';
import { connect} from 'react-redux';
import { editInfo } from '../actions';

function mapStateToProps( state ) {
  const { showEditOrg } = state.counterReducer;
  const { markerInfo } = state.mapReducer;
  return {markerInfo, showEditOrg};
}

class EditOrg extends Component{

  constructor(props) {
    super(props);
    this.state = {
      // Setting default values
        name: this.props.markerInfo.name,
        lat: this.props.markerInfo.lat,
        lng: this.props.markerInfo.lng,
        orgUnit: []

      };

    this.handleName = this.handleName.bind(this);
    this.handleLat = this.handleLat.bind(this);
    this.handleLng = this.handleLng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadOrg();
  }

  // Sets values from the text fields when submitting
  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleLat(event){
    this.setState({lat: event.target.value});
  }
  handleLng(event){
    this.setState({lng: event.target.value});
  }

  handleClose(){
    this.props.dispatch(editInfo(false))
  }

  // Fetches a new organisationUnit based on id
  loadOrg() {
  loadOrganisationUnitToEdit(this.props.markerInfo.id)
    .then((organisationUnits) => {
      this.setState({
        orgUnit: organisationUnits
      });
    });
  }



  handleSubmit(event) {
    // Sets the showEditOrg variable to false (hides the box)
    this.props.dispatch(editInfo(false))

    var orgUnitEdit = this.state.orgUnit;
    orgUnitEdit.name = this.state.name;
    orgUnitEdit.shortName = this.state.name;

    var coords = '['+this.state.lng+','+this.state.lat+']';
    orgUnitEdit.coordinates = coords;

    // Popup when submitting the new updates.
    alert('An organisation unit was edited:\n'+"name : "+this.state.name+" id :"+this.props.markerInfo.id+" coords["+this.state.lat+","+this.state.lng+"]");
    event.preventDefault();

    editOrganisationUnit(orgUnitEdit);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Edit Organisation information
        <br></br>

        Name:
        <input type="text" name={this.state.name} onChange={(e) => this.handleName(e)} value={this.state.name} />

        Lat:
        <input type="text" lat={this.state.lat} onChange={(e) => this.handleLat(e)} value={this.state.lat} />

        Lng:
        <input type="text" lng={this.state.lng} onChange={(e) => this.handleLng(e)} value={this.state.lng} />
        <input type="Submit" value="Edit Info"/>

        <input type="button" value="Close" onClick = { () =>
          this.props.dispatch(editInfo(false))}
        />

      </form>
    );
  }
}

export default connect(mapStateToProps)(EditOrg);
