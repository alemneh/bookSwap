import React, { Component } from 'react';
import TradeRequest from '../TradeRequestComponent/TradeRequest';
import axios from 'axios';


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

  }






  renderBooks() {
    const books = this.props.allBooks.filter((book) => {
      return !(searchByValue(book.title, 'title', this.props.userBooks)) && !book.isPendingTrade;
    });
    if(books.length < 1) {
      return (
        <div>There are no books for trade.</div>
      )
    }
    return books.map((book, index) => {
      return <img src={book.imgUrl} alt={book.title}  key={index} style={ {float: 'left', margin: '10px'} }
              data-toggle="modal" data-target="#myModal"
              onClick={() => { this.props.setRequesteeBook(book) }}/>
    })
  }



  renderSuccess() {

  }

  render() {
    const {
      cancelRequesterBook,
      handleTradeRequest,
      setRequesterBook,
      requesteeBook,
      requesterBook,
      userBooks
    } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        { this.renderSuccess() }
        <h1>Books Available for Trade</h1>
        <hr />
        { this.renderBooks() }
        <TradeRequest requesteeBook={ requesteeBook }
                      requesterBook={ requesterBook }
                      setRequesterBook={ setRequesterBook }
                      userBooks={ userBooks }
                      handleTradeRequest={ handleTradeRequest }
                      cancelRequesterBook={ cancelRequesterBook }/>
      </div>
    )
  }

}

export default BookPage;
