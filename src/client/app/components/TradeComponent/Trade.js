import React, { Component } from 'react';

class TradeComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderPendingTrades() {
    const { pendingTrades, viewTrade } = this.props;
    if(pendingTrades.length < 1) {
      return <div>No pending trades.</div>;
    }
    return pendingTrades.map((trade, index) => {
      return <a href="#" className="list-group-item"
                key={index}
                onClick={ () => viewTrade(trade) }>
                <i>{trade.requesterBookTitle}</i> <b style={{margin: '0 5px'}}>For</b>
                <i>{trade.requesteeBookTitle}</i> </a>
    })
  }

  renderTradeRequests() {
    const { tradeRequests, viewTrade } = this.props;
    if(tradeRequests.length < 1) {
      return <div>No pending trade requests.</div>;
    }
    return tradeRequests.map((trade, index) => {
      return <a href="#" className="list-group-item"
                key={index}
                onClick={() => viewTrade(trade) }>
                <i>{trade.requesteeBookTitle}</i> <b style={{margin: '0 5px'}}>For</b>
                <i>{trade.requesterBookTitle}</i> </a>
    })
  }

  renderAcceptNDeclineBtns(user, trade, handleAcceptTrade, handleDeclineTrade) {
    if(trade.requesteeName == user.name) {
    return (
      <div className="row">
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-success"
               onClick={() => {handleAcceptTrade(trade) } }>Accept Trade</a>
         </div>
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-danger"
             onClick={() => {handleDeclineTrade(trade)} }>Decline Trade</a>
         </div>
       </div>
    )
    }
    return (
      <div className="row">
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <button href="#" className="btn btn-default btn-lg btn-block btn-success"
               onClick={() => {handleAcceptTrade(trade) }} disabled>Accept Trade</button>
         </div>
         <div style={ {marginTop: '20px'} } className="col-md-6">
           <a href="#" className="btn btn-default btn-lg btn-block btn-danger"
             onClick={ () => {handleDeclineTrade(trade)}  }>Decline Trade</a>
         </div>
       </div>
    )
  }


  renderTrades() {
      const {
        user,
        viewTrade,
        trade,
        handleAcceptTrade,
        handleDeclineTrade
      } = this.props;

      if(trade) {
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
            { this.renderAcceptNDeclineBtns(user, trade,
                                            handleAcceptTrade,
                                            handleDeclineTrade) }
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




  render() {
    return (
      <div className="tab-pane fade" id="trades">
        {this.renderTrades()}
      </div>
    )
  }
}

export default TradeComponent;
