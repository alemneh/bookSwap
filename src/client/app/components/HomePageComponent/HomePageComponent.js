import React, { Component } from 'react';
import NavComponent from '../NavComponent/NavComponent';
import SignUpComponent from '../SignUpComponent/SignUpComponent';
import ProfileComponent from '../ProfileComponent/ProfileComponent';
import TradeComponent from '../TradeComponent/TradeComponent';


class HomePage extends Component {
  render() {
    return (
      <div className="">
        <NavComponent />
        <div className="jumbotron">
          <h1>Book Swap Meet</h1>
          <p>Register and list the books you own and then search for other books to trade!</p>
          <p><a className="btn btn-primary btn-lg">Join</a></p>
        </div>
        <SignUpComponent />
        <ProfileComponent />
        <TradeComponent />
      </div>
    )
  }
}

export default HomePage;
