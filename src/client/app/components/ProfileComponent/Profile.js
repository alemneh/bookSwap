import React, { Component } from 'react';
import Info from './Info';
import Books from './Books';
import Trade from '../TradeComponent/Trade';
import books from 'google-books-search';


class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      trades: [],
      success: null
    }
  }

  componentWillMount() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    this.setState({ user });
    this.getCurrentUser(user);
    this.fetchUserBooks(user);

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
  }

  render() {
    return (
        <div>
          <h2>Profile</h2>
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
                   />
            <Trade trades={this.state.trades} />
          </div>
        </div>
    );
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
    const userId = this.state.user._id;
    axios.post(process.env.URL + '/users/' + userId + '/books',
      { title: book.title, imgUrl: book.imgUrl},
      { headers: {'token': localStorage.token }})
    .then((res) => {
      console.log(res);
      console.log(book);
      let books = this.state.books;
      console.log(books);
      books.push(book);
      console.log(books);
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
}

export default ProfileComponent;
