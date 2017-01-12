import React, { Component } from 'react';

class Alert extends Component {
  render() {
    return (
      <div className="alert alert-dismissible alert-danger">
         <button type="button" className="close" data-dismiss="alert">&times;</button>
         {this.state.error}
       </div>
    )
  }
}


export default Alert;
