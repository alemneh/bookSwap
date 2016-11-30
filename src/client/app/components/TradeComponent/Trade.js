import React, { Component } from 'react';

class TradeComponent extends Component {
  render() {
    return (
      <div className="tab-pane fade" id="trades">
        <div className="row" style={ {marginTop: '20px'} }>
          <div className="col-md-6">
            <div className="list-group">
              <a href="#" className="list-group-item active">Pending Trades</a>
              <a href="#" className="list-group-item">48 Laws of Power FOR Art of War</a>
              <a href="#" className="list-group-item">Magic FOR Junk Mail</a>
            </div>
          </div>
          <div className="col-md-6">
            <div class="list-group">
              <a href="#" className="list-group-item active">Trade Requests</a>
              <a href="#" className="list-group-item">48 Laws of Power FOR Art of War</a>
              <a href="#" className="list-group-item">Magic FOR Junk Mail</a>
            </div>
          </div>
        </div>      
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
      </div>
    )
  }
}

export default TradeComponent;
