import React, { Component, PropTypes } from 'react';
import { saveOrganisationUnit, editOrganisationUnit, loadOrganisationUnitToEdit } from '../api';
import { connect} from 'react-redux';
import { editInfo } from '../actions';

function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { showEditOrg } = state.counterReducer;
  const { markerInfo } = state.mapReducer;
  return {markerInfo, showEditOrg}; //{markerInfo, dispatch}
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
    //console.log(this.state)
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleLat(event){
    this.setState({lat: event.target.value});
  }
  handleLng(event){
    this.setState({lng: event.target.value});
  }

  loadOrg() {
  loadOrganisationUnitToEdit(this.props.markerInfo.id)
    .then((organisationUnits) => {
      console.log(organisationUnits)
      this.setState({
        orgUnit: organisationUnits
      });
    });
}


  handleSubmit(event) {
    console.log("handleSubmit")
    this.props.dispatch(editInfo(false))

    var orgUnitEdit = this.state.orgUnit;
    orgUnitEdit.name = this.state.name;

    //Updated orgUnit
    console.log(orgUnitEdit)

    alert('An org was submitted:\n'+"name : "+this.state.name+" id :"+this.props.markerInfo.id+" coords["+this.state.lat+","+this.state.lng+"]");
    event.preventDefault();


    //saveOrganisationUnit({"name":"helloo", "shortName":"yoomafaaka","openingDate":"1970-01-01"});
    var editcoordinates = "[ " + this.state.lng + "," + this.state.lat + "]";
    //ny fetch på organisationUnit med id, bare endre det vi vil
    //editOrganisationUnit({"name": this.state.name, "shortName": this.state.name, "openingDate": "1970-01-01", "id": this.props.markerInfo.id, "parent":{id: 'YuQRtpLP10I'}});
    //console.log(editcoordinates);
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
      </form>
    );
  }
}

export default connect(mapStateToProps)(EditOrg);
