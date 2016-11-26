import React, { Component } from 'react';

class TradeComponent extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">
            <h2>48 Laws of Power</h2>
            <img src="http://placehold.it/350x150" />
            <p>Owner: Tesfu</p>
          </div>
          <div className="col-md-6">
            <h2>Art of War</h2>
            <img src="http://placehold.it/350x150" />
            <p>Owner: Alem</p>
          </div>
          <div style={ {marginTop: '20px'} } className="col-md-6">
            <a href="#" className="btn btn-default btn-lg btn-block btn-success">Accept Trade</a>
          </div>
          <div style={ {marginTop: '20px'} } className="col-md-6">
            <a href="#" className="btn btn-default btn-lg btn-block btn-danger">Decline Trade</a>
          </div>
        </div>
      </div>
    )
  }
}

export default TradeComponent;
