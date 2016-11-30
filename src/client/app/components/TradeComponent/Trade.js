import React, { Component } from 'react';

class TradeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTrade: false
    }
    this.viewTrade = this.viewTrade.bind(this);
    this.handleAcceptTrade = this.handleAcceptTrade.bind(this);
    this.handleDeclineTrade = this.handleDeclineTrade.bind(this);
  }

  renderTrades() {
      if(this.state.viewTrade) {
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
                <a href="#" className="btn btn-default btn-lg btn-block btn-success"
                    onClick={ this.handleAcceptTrade }>Accept Trade</a>
              </div>
              <div style={ {marginTop: '20px'} } className="col-md-6">
                <a href="#" className="btn btn-default btn-lg btn-block btn-danger"
                  onClick={ this.handleDeclineTrade }>Decline Trade</a>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="row" style={ {marginTop: '20px'} }>
          <div className="col-md-6">
            <div className="list-group">
              <a href="#" className="list-group-item active">Pending Trades</a>
              <a href="#" className="list-group-item" onClick={ this.viewTrade }>48 Laws of Power FOR Art of War</a>
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
      )
  }

  viewTrade() {
    this.setState( { viewTrade: true } );
  }

  render() {
    return (
      <div className="tab-pane fade" id="trades">
        {this.renderTrades()}
      </div>
    )
  }

  handleAcceptTrade() {
    this.setState({ viewTrade: false });
  }

  handleDeclineTrade() {
    this.setState({ viewTrade: false });
  }
}

export default TradeComponent;
