import React, { Component } from 'react';
import { connect} from 'react-redux';
import ReactDom from 'react-dom';
import EditOrg from './EditOrg'
import {editInfo} from '../actions';
//import Popup from 'react-popup';

/*
Gets the state and makes it a prop
*/
function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  const { showEditOrg } = state.counterReducer;
  return {markerInfo, showEditOrg}; //{markerInfo, dispatch}
}

class Info extends Component {

    constructor(props) {
        super(props);
        // Set some initial state variables that are used within the component
    }

  /*  showDialog(){
      console.log("test +++");
      this.props.dispatch(editInfo(true));
    }
*/
  render() {
    //console.log("info: " + this.props.markerInfo)

    return(
      <div className="info">
        {this.props.markerInfo == null ? null : this.props.markerInfo.name}
        <br/>
          <div className="buttons">
              <button onClick = { () =>
                this.props.dispatch(editInfo(true))

              }>Edit Info</button>
          </div>

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
