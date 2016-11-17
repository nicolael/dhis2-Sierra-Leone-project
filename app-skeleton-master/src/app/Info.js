import React, { Component } from 'react';
import { connect} from 'react-redux';

/*
Gets the state and makes it a prop
*/
function mapStateToProps( state ) {
  //const { dispatch } = state;
  const { markerInfo } = state.mapReducer;
  return {markerInfo}; //{markerInfo, dispatch}
}

class Info extends Component {

  componentDidMount() {
      //console.log("hr")
  }
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
