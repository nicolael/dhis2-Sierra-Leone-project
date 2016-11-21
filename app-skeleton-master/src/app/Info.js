import React, { Component } from 'react';
import { connect} from 'react-redux';
import ReactDom from 'react-dom';
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

/*  constructor(props){
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = {
      isPoppedOut: false;
    }
  }

  popout(){
    this.setState({
      isPoppedOut:true
    });
  }

  popoutClosed(){
    this.setState({
      isPoppedOut:false
    });
  }
*/

  render() {
    console.log("info: " + this.props.markerInfo)

    return(
      <div className="info">
        <p>{this.props.markerInfo}</p>
      </div>
    );
  }
}
export default connect(mapStateToProps) (Info);
