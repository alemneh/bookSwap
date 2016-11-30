import React, { Component } from 'react';
import Info from './Info';
import Books from './Books';
import Trade from '../TradeComponent/Trade';


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
            <Books books={ this.state.books} />
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
}

export default ProfileComponent;
