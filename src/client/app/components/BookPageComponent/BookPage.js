import React, { Component } from 'react';
import TradeRequest from './TradeRequest';


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
      requesteeBook: [{
        title: '48 laws of Power',
        _owner: 'Alem',
        imgUrl: "http://books.google.com/books/content?id=P_zMW3EHnTEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      }]
    }
    this.onRequesteeBookClick = this.onRequesteeBookClick.bind(this);
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
      return !(searchByValue(book.title, 'title', this.state.userBooks));
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
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        { this.renderBooks() }
        <TradeRequest requesteeBook={ this.state.requesteeBook[0]}
                      userBooks={ this.state.userBooks }
                      makeTradeRequest={ this.makeTradeRequest }/>
      </div>
    )
  }
}

export default BookPage;
