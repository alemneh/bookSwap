import React, { Component } from 'react';
import Info  from '../UserInfoComponent/UserInfo';
import Books from '../UserBooksComponent/UserBooks';
import Trade from '../TradeComponent/Trade';
import books from 'google-books-search';

//Helper function to find book in array
function searchByValue(value, property, array){
   for(var i = 0; i < array.length; i++){
       // check that property is defined first
       if(typeof array[i][property] !== 'undefined') {
           // then check its value
           if(array[i][property] === value){
               return array[i];
           }
       }
   }
   return false;
}


class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      pendingTrades: [],
      tradeRequests: [],
      isLoading: false,
      error: null,
      success: null
    }

    this.handleAcceptTrade = this.handleAcceptTrade.bind(this);
    this.handleDeclineTrade = this.handleDeclineTrade.bind(this);
  }

  componentWillMount() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    this.setState({ user });
    this.getCurrentUser(user);
    this.fetchUserBooks(user);
    this.fetchUserTrades(user);

  }

  getCurrentUser(user) {
    if(!user) return;
    axios.get(process.env.URL + '/users/' + user._id, {
      headers: {'token': localStorage.token }
    })
    .then((res) => {
      console.log(res.data.data);
      this.setState({ user: res.data.data})
    })
    .catch((err) => {
      this.setState({ error: err.message });
      console.log(err);
    })
  }

  fetchUserTrades(user) {
    if(!user) return;
    axios.get(process.env.URL + '/users/' + user._id + '/trades', {
      headers: {'token': localStorage.token }
    })
    .then((res) => {
      console.log(res);
      this.setState({
        pendingTrades: res.data.pendingTrades,
        tradeRequests: res.data.tradeRequests
      })
      console.log(res.data);
    })
    .catch((err) => {
      this.setState({ error: err.message });
      console.log(err);
    })

  }

  renderError() {
    if(!this.state.error) { return null;}

    window.setTimeout(() => {
      this.setState({ error: null});
    }, 2000)

    return <div className="alert alert-dismissible alert-danger">
             <button type="button" className="close" data-dismiss="alert">&times;</button>
             {this.state.error}
           </div>
  }



  handleAcceptTrade(trade) {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    if(!user) return;
    let tradeRequests = this.state.tradeRequests.filter((t) => t._id != trade._id);
    let pendingTrades = this.state.pendingTrades.filter((t) => t._id != trade._id);



    axios.put(process.env.URL + '/users/' + user._id + '/trades/' + trade._id,
    { trade },
    { headers: {'token': localStorage.token }
    })
    .then((res) => {
      this.setState({ tradeRequests, pendingTrades});
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleDeclineTrade(trade) {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    if(!user) return;
    let tradeRequests = this.state.tradeRequests.filter((t) => t._id != trade._id);
    let pendingTrades = this.state.pendingTrades.filter((t) => t._id != trade._id);

    axios.delete(process.env.URL + '/users/' + user._id + '/trades/' + trade._id, {
      headers: {'token': localStorage.token }
    })
    .then((res) => {
      this.setState({ tradeRequests, pendingTrades});
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleUpdateOnUser(user) {
    const userId = this.state.user._id;
    const updatedUser = {
      _id: this.state.user._id,
      name: user.name,
      city: user.city,
      state: user.state
    }
    axios.put(process.env.URL + '/users/' + userId,
      {
        name: user.name,
        city: user.city,
        state: user.state
      },
      { headers: {'token': localStorage.token }})
    .then((res) => {
      console.log(res);
      this.setState({ success: res.data.message, user: updatedUser });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  fetchUserBooks(user) {
    if(!user) return;
    axios.get(process.env.URL + '/users/' + user._id + '/books',
      { headers: {'token': localStorage.token }})
      .then((res) => {
        this.setState({ books: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addBookToUser(book) {
    const user = this.state.user;
    this.setState({ isLoading: true});

    axios.post(process.env.URL + '/users/' + user._id + '/books',
      { title: book.title, imgUrl: book.imgUrl, owner: user.name },
      { headers: {'token': localStorage.token }})
    .then((res) => {
      console.log(res);
      console.log(book);
      let books = this.state.books;
      console.log(books);
      books.push(book);
      console.log(books);
      this.setState({ books, isLoading: false });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  removeBookFromUserList(title) {
    let books = this.state.books;
    console.log(books);
    const book  = books.filter((book) => book.title == title);
    books = books.filter((book) => book.title != title);
    this._deleteBook(book[0], books);

  }

  _deleteBook(book, books) {
    const user = this.state.user
    axios.delete(process.env.URL + '/users/' + user._id + '/books/' + book._id,
      { headers: {'token': localStorage.token }})
      .then((res) => {
        console.log(res);
        this.setState({ books });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  _queryBook2Add(query) {
    books.search(query, (err, res) => {
      if(!err) {
        const newBook = {title: res[0].title, imgUrl: res[0].thumbnail};
        this.addBookToUser(newBook);
        console.log(res[0]);

      } else {
        console.log(err);
      }
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
        <div>
          { this.renderSuccess() }
          <h2>{this.state.user.name}'s Profile</h2>
          <hr />
          <ul className="nav nav-tabs">
            <li className="active"><a href="#info" data-toggle="tab" aria-expanded="true">Info</a></li>
            <li className=""><a href="#books" data-toggle="tab" aria-expanded="false">Books</a></li>
            <li className=""><a href="#trades" data-toggle="tab" aria-expanded="false">Trades</a></li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <Info user={this.state.user}
                  handleUpdateOnUser={this.handleUpdateOnUser.bind(this)}
                  />
            <Books books={ this.state.books }
                   _queryBook2Add={ this._queryBook2Add.bind(this) }
                   removeBookFromUserList={ this.removeBookFromUserList.bind(this) }
                   isLoading={ this.state.isLoading }
                   />
            <Trade pendingTrades={this.state.pendingTrades}
                   tradeRequests={this.state.tradeRequests}
                   handleAcceptTrade={this.handleAcceptTrade}
                   handleDeclineTrade={this.handleDeclineTrade}
                  />
          </div>
        </div>
    );
  }

}

export default ProfileComponent;
