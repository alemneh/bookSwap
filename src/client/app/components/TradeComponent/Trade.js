import React, { PropTypes } from 'react';

const TradeComponent = ({
  pendingTrades,
  viewTrade,
  tradeRequests,
  user,
  trade,
  handleAcceptTrade,
  handleDeclineTrade
}) => {


  const renderPendingTrades = () => {
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

  const renderTradeRequests = () => {
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

  const renderAcceptNDeclineBtns = (user, trade, handleAcceptTrade, handleDeclineTrade) => {
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


  const renderTrades = () => {
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
            { renderAcceptNDeclineBtns(user, trade,
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
            { renderPendingTrades() }
          </div>
          </div>
          <div className="col-md-6">
            <div className="list-group">
              <a href="#" className="list-group-item active">Trade Requests</a>
              { renderTradeRequests() }
            </div>
          </div>
        </div>
      )
  }




  return (
    <div className="tab-pane fade" id="trades">
      { renderTrades() }
    </div>
  )

}

TradeComponent.propTypes = {
  pendingTrades: PropTypes.array.isRequired,
  viewTrade: PropTypes.func.isRequired,
  tradeRequests: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  trade: PropTypes.object,
  handleAcceptTrade: PropTypes.func.isRequired,
  handleDeclineTrade: PropTypes.func.isRequired
}

export default TradeComponent;
