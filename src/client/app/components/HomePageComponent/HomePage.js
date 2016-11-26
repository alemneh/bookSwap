import React, { Component } from 'react';
import { Link } from 'react-router';


class HomePage extends Component {
  render() {
    return (
      <div className="">
        <div className="jumbotron">
          <h1>Book Swap Meet</h1>
          <p>Register and list the books you own and then search for other books to trade!</p>
          <p><Link to="/signup"><a className="btn btn-primary btn-lg">Join</a></Link></p>
        </div>
      </div>
    )
  }
}

export default HomePage;
