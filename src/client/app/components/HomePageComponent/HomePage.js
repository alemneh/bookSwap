import React from 'react';
import { Link } from 'react-router';


const HomePage = () => {

  return (
    <div className="">
      <div className="jumbotron">
        <h1>Book Swap Meet</h1>
        <p>Register and list the books you own and then search for other books to trade!</p>
        <p><Link to="/signup"><a className="btn btn-primary btn-lg">Worked!</a></Link></p>
      </div>
      <blockquote>
        <p>Wow, this is a great app I was able to find a trade for a book that would of cost a fortune.</p>
        <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
      </blockquote>
      <blockquote className="blockquote-reverse">
        <p>So many good books that are available for trade!.</p>
        <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
      </blockquote>
    </div>
  )

}

export default HomePage;
