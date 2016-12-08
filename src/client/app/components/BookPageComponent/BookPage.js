import React, { Component } from 'react';
import TradeRequest from '../TradeRequestComponent/TradeRequest';


 //Helper function to filter usersBooks from allBooks
function searchByValue(value, property, array){
    for(var i = 0; i < array.length; i++){
        // check that property is defined first
        if(typeof array[i][property] !== 'undefined') {
            // then check its value
            if(array[i][property] === value){
                return true;
            }
        }
    }
    return false;
}

class BookPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      userBooks: [],
      requesteeBook: [],
      success: null
    }
    this.onRequesteeBookClick = this.onRequesteeBookClick.bind(this);
    this.makeTradeRequest     = this.makeTradeRequest.bind(this);
  }
  componentWillMount() {
    this.fetchUserBooks();
    this.fetchAllBooks();
  }

  fetchUserBooks() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : '';
    if(!user) return;
    axios.get(process.env.URL + '/users/' + user._id + '/books',
      { headers: {'token': localStorage.token }})
      .then((res) => {
        this.setState({ userBooks: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onRequesteeBookClick(e) {
    const book = this.state.books.filter((book) => book.title == e.target.alt);
    this.setState({ requesteeBook: book });
  }

  renderBooks() {
    const books = this.state.books.filter((book) => {
      return !(searchByValue(book.title, 'title', this.state.userBooks)) && !book.isPendingTrade;
    });
    if(books.length < 1) {
      return (
        <div>There are no books for trade.</div>
      )
    }
    return books.map((book, index) => {
      return <img src={book.imgUrl} alt={book.title}  key={index} style={ {float: 'left', margin: '10px'} }
              data-toggle="modal" data-target="#myModal"
              onClick={ this.onRequesteeBookClick }/>
    })
  }

  fetchAllBooks() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : '';
    if(!user) return;
    axios.get(process.env.URL + '/books4trade', {
      headers: {'token': localStorage.token }
    })
    .then((res) => {
      this.setState({ books: res.data.books });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  makeTradeRequest(requesterBook, requesteeBook) {

    if(!requesterBook) {
      this.setState({ success: 'You must select a book from you list to make trade request.'})
      return;
    }

    const books = this.state.books.map((book) => {
      if( requesteeBook.title == book.title) {
        book.isPendingTrade = true;
      }
      return book;
    });
    axios.post(process.env.URL + '/users/' + requesterBook._owner + '/trades',
      {
        requesteeId: requesteeBook._owner,
        requesteeBook: requesteeBook._id,
        requesterBook: requesterBook._id,
        requesteeBookTitle: requesteeBook.title,
        requesterBookTitle: requesterBook.title,
        requesteeName: requesteeBook.owner,
        requesterName: requesterBook.owner,
        requesterImgUrl: requesterBook.imgUrl,
        requesteeImgUrl: requesteeBook.imgUrl
      },
      {headers: {'token': localStorage.token }})
    .then((res) => {
      this.setState({ success: res.data.message, books});
    })
    .catch((err) => {
      console.log(err);
    })
  }


  renderSuccess() {
    if(!this.state.success) { return null }

    window.setTimeout(() => {
      this.setState({ success: null});
    }, 2000)

    return <div className="alert alert-dismissible alert-success">
             <button type="button" className="close" data-dismiss="alert">&times;</button>
             {this.state.success}
           </div>
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        { this.renderSuccess() }
        <h1>Books Available for Trade</h1>
        <hr />
        { this.renderBooks() }
        <TradeRequest requesteeBook={ this.state.requesteeBook[0]}
                      userBooks={ this.state.userBooks }
                      makeTradeRequest={ this.makeTradeRequest }/>
      </div>
    )
  }

}

export default BookPage;
