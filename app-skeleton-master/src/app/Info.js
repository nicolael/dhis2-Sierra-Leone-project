import React, { Component } from 'react';
import { connect} from 'react-redux';
import ReactDom from 'react-dom';
import EditOrg from './EditOrg'
import {editInfo} from '../actions';


//Gets the state and makes it a prop
function mapStateToProps( state ) {
  const { markerInfo } = state.mapReducer;
  const { showEditOrg } = state.counterReducer;
  return {markerInfo, showEditOrg};
}

class Info extends Component {

    constructor(props) {
        super(props);
    }

  render() {

    return(
      <div className="info">


        <div className="buttons">
            <button disabled={!this.props.markerInfo} onClick = { () =>
              this.props.dispatch(editInfo(true))
            }>Edit Info</button>
        </div>

        <h3>Facility Name : {this.props.markerInfo == null ? null : this.props.markerInfo.name}</h3>
        <p>Opening date : {this.props.markerInfo == null ? null : this.props.markerInfo.openingDate.substring(0, 10)}</p>
        <p>ID : {this.props.markerInfo == null ? null : this.props.markerInfo.id}</p>
        <p>Coordinates : {this.props.markerInfo == null ? null : this.props.markerInfo.lat +' , '+this.props.markerInfo.lng}</p>

        {this.props.showEditOrg ?
            <div className="popup">
              <EditOrg/>
            </div>
        : null}
      </div>
    );
  }
}
export default connect(mapStateToProps) (Info);
