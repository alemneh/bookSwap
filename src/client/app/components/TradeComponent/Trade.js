import React, { Component } from 'react';

class TradeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTrade: false,
      trade: ''
    }
    this.viewTrade = this.viewTrade.bind(this);
    this.handleAcceptTrade = this.handleAcceptTrade.bind(this);
    this.handleDeclineTrade = this.handleDeclineTrade.bind(this);
  }

  renderPendingTrades() {
    const pendingTrades = this.props.pendingTrades;
    if(pendingTrades.length < 1) {
      return <div>No pending trades.</div>;
    }
    return this.props.pendingTrades.map((trade) => {
      return <a href="#" className="list-group-item"
                onClick={ () => this.viewTrade(trade) }>
                <i>{trade.requesterBookTitle}</i> <b style={{margin: '0 5px'}}>For</b>
                <i>{trade.requesteeBookTitle}</i> </a>
    })
  }

  renderTradeRequests() {
    const tradeRequests = this.props.tradeRequests;
    if(tradeRequests.length < 1) {
      return <div>No pending trade requests.</div>;
    }
    return this.props.tradeRequests.map((trade) => {
      return <a href="#" className="list-group-item"
                onClick={() => this.viewTrade(trade) }>
                <i>{trade.requesteeBookTitle}</i> <b style={{margin: '0 5px'}}>For</b>
                <i>{trade.requesterBookTitle}</i> </a>
    })
  }

  renderAcceptNDeclineBtns(user, trade) {
    if(trade.requesteeName == user.name) {
    return (
      <div className="row">
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-success"
               onClick={() => this.handleAcceptTrade(trade) }>Accept Trade</a>
         </div>
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-danger"
             onClick={() => this.handleDeclineTrade(trade) }>Decline Trade</a>
         </div>
       </div>
    )
    }
    return (
      <div className="row">
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <button href="#" className="btn btn-default btn-lg btn-block btn-success"
               onClick={() => this.handleAcceptTrade(trade) } disabled>Accept Trade</button>
         </div>
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-danger"
             onClick={() => this.handleDeclineTrade(trade) }>Decline Trade</a>
         </div>
       </div>
    )
  }


  renderTrades() {
      const user = localStorage.user ? JSON.parse(localStorage.user) :  localStorage.user;
      if(this.state.viewTrade) {
        const trade = this.state.trade
        console.log(trade);
        return (
          <div className="container text-center">
            <div className="row">
              <div className="col-md-6">
                <h2>{ trade.requesterBookTitle }</h2>
                <img src={ trade.requesterImgUrl } />
                <p>Owner: { trade.requesterName}</p>
              </div>
              <div className="col-md-6">
                <h2>{ trade.requesteeBookTitle }</h2>
                <img src={ trade.requesteeImgUrl } />
                <p>Owner: { trade.requesteeName}</p>
              </div>
            </div>
            { this.renderAcceptNDeclineBtns(user, trade) }
          </div>
        )
      }

      return (
        <div className="row" style={ {marginTop: '20px'} }>
          <div className="col-md-6">
          <div className="list-group">
            <a href="#" className="list-group-item active">Pending Trades</a>
            { this.renderPendingTrades() }
          </div>
          </div>
          <div className="col-md-6">
            <div class="list-group">
              <a href="#" className="list-group-item active">Trade Requests</a>
              { this.renderTradeRequests() }
            </div>
          </div>
        </div>
      )
  }

  viewTrade(trade) {
    this.setState( { viewTrade: true,  trade} );
  }


  handleAcceptTrade(tradeId) {
    this.props.handleAcceptTrade(tradeId);
    this.setState({ viewTrade: false });
  }

  handleDeclineTrade(tradeId) {
    this.props.handleDeclineTrade(tradeId);
    this.setState({ viewTrade: false });
  }

  render() {
    return (
      <div className="tab-pane fade" id="trades">
        {this.renderTrades()}
      </div>
    )
  }
}

export default TradeComponent;
