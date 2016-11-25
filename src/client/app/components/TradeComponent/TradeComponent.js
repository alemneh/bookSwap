import React, { Component } from 'react';

class TradeComponent extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">
            <img src="http://placehold.it/350x150" />
          </div>
          <div className="col-md-6">
            <img src="http://placehold.it/350x150" />
          </div>
        </div>
        <a href="#" className="btn btn-default btn-lg btn-block">Accept Trade</a>
      </div>
    )
  }
}

export default TradeComponent;
