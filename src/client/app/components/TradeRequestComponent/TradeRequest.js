import React, { PropTypes } from 'react';

const TradeRequest = ({
  userBooks,
  requesteeBook,
  onBookSelect,
  requesterBook,
  cancelRequesterBook,
  handleTradeRequest
}) => {




  const renderRequesteeBook = () => {
    if(!requesteeBook) return;
    return (
      <div>
        <p><b>Owner:</b> { requesteeBook.owner }</p>
        <img src={ requesteeBook.imgUrl } />
      </div>
    )
  }


  const renderBook2Trade = () => {
    if(requesterBook) {
      return (
        <div>
          <p><b>Owner:</b> {requesterBook.owner}</p>
          <img src={requesterBook.imgUrl} /><br />
          <a href="#" onClick={ cancelRequesterBook } className="btn btn-link">Change</a>
        </div>
      )
    }
    return (
        <select onChange={ onBookSelect } style={{ marginTop: '40%', width: '100%'}} className="custom-select">
           <option>Select a book to trade</option>
           { userBooks.map((book, index) => {
             return <option value={book.title} key={index}>{book.title}</option>
           })}
         </select>
    )
  }

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 className="modal-title">Trade Request</h4>
          </div>
          <div className="modal-body">
            <div className="row text-center">
              <div className="col-xs-6">
                { renderBook2Trade() }
              </div>
              <div className="col-xs-6">
                { renderRequesteeBook() }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal"
                    onClick={ handleTradeRequest }
                    >Send</button>
          </div>
        </div>
      </div>
    </div>
  )

}

TradeRequest.propTypes = {
  userBooks: PropTypes.array.isRequired,
  requesteeBook: PropTypes.object,
  onBookSelect: PropTypes.func.isRequired,
  requesterBook: PropTypes.object,
  cancelRequesterBook: PropTypes.func.isRequired,
  handleTradeRequest: PropTypes.func.isRequired
}

export default TradeRequest;
