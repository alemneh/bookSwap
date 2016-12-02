import React, { Component } from 'react';

class TradeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesterBook: null,
      books: [
        {
          title: '48 laws of Power',
          _owner: 'Alem',
          imgUrl: "http://books.google.com/books/content?id=P_zMW3EHnTEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        {
          title: 'Economic Hitman',
          _owner: 'Tesfu',
          imgUrl: "http://books.google.com/books/content?id=nJFFrLX-924C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        {
          title: 'Power',
          _owner: 'Shumye' ,
          imgUrl: "http://books.google.com/books/content?id=OVfdq4O8fb8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }
      ]
    }
    this.onBookSelect = this.onBookSelect.bind(this);
    this.changRequesterBook = this.changRequesterBook.bind(this);
  }

  onBookSelect(e) {
    const book = this.props.userBooks.filter((book) => book.title == e.target.value);
    this.setState({ requesterBook: book[0] });
  }

  renderRequesteeBook() {
    if(!this.props.requesteeBook) return;
    return (
      <div>
        <p><b>Owner:</b> { this.props.requesteeBook.owner }</p>
        <img src={ this.props.requesteeBook.imgUrl } />
      </div>
    )
  }

  changRequesterBook() {
    this.setState({ requesterBook: null });
  }

  renderBook2Trade() {
    const book = this.state.requesterBook;
    if(book) {
      return (
        <div>
          <p><b>Owner:</b> {book.owner}</p>
          <img src={book.imgUrl} /><br />
          <a href="#" onClick={ this.changRequesterBook } className="btn btn-link">Change</a>
        </div>
      )
    }
    return (
        <select onChange={ this.onBookSelect } style={{ marginTop: '40%', width: '100%'}} className="custom-select">
           <option>Select a book to trade</option>
           {this.props.userBooks.map((book, index) => {
             return <option value={book.title} key={index}>{book.title}</option>
           })}
         </select>
    )
  }

  render() {
    console.log(this.props.userBooks);
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
                  { this.renderBook2Trade() }
                </div>
                <div className="col-xs-6">
                  { this.renderRequesteeBook() }
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal"
                      onClick={() => this.props.makeTradeRequest(this.state.requesterBook, this.props.requesteeBook)}
                      >Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TradeRequest;
