import React, { Component } from 'react';
import { connect} from 'react-redux';
import ReactDom from 'react-dom';
import EditOrg from './EditOrg'
//import Popup from 'react-popup';

/*
Gets the state and makes it a prop
*/
function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  return {markerInfo}; //{markerInfo, dispatch}
}

class Info extends Component {

    constructor(props) {
        super(props);
        // Set some initial state variables that are used within the component
        this.state = {
            showEditOrg: false
        };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
    }
    
    showDialog(){
      this.setState({showEditOrg: true});
      console.log("onClick called");
    }
 
    hideDialog(){
        this.setState({showEditOrg: false});
    }

  render() {
    //console.log("info: " + this.props.markerInfo)

    return(
      <div className="info">
        {this.props.markerInfo == null ? null : this.props.markerInfo.name}
        <br/>
          <div className="buttons">
              <button onClick = {this.showDialog}>Edit Info</button>
          </div>
          {this.state.showEditOrg ?
            <div className="popup">
              <input type="Submit" value="Edit Info" onClick={this.hideDialog}/>
                <EditOrg/>
            </div>
          : null} 
      </div>
    );
  }
}
export default connect(mapStateToProps) (Info);
