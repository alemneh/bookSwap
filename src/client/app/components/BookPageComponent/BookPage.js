import React, { PropTypes } from 'react';
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

const BookPage = ({
  userBooks,
  allBooks,
  setRequesteeBook,
  cancelRequesterBook,
  handleTradeRequest,
  requesteeBook,
  onBookSelect,
  requesterBook
}) => {


  const renderBooks = () => {
    const books = allBooks.filter((book) => {
      return !(searchByValue(book.title, 'title', userBooks)) && !book.isPendingTrade;
    });
    if(books.length < 1) {
      return (
        <div>There are no books for trade.</div>
      )
    }
    return books.map((book, index) => {
      return <img src={book.imgUrl} alt={book.title}  key={index} style={ {float: 'left', margin: '10px'} }
              data-toggle="modal" data-target="#myModal"
              onClick={() => { setRequesteeBook(book) }}/>
    })
  }


  return (
    <div style={{ overflow: 'hidden' }}>
      <h1>Books Available for Trade</h1>
      <hr />
      { renderBooks() }
      <TradeRequest requesteeBook={ requesteeBook }
                    requesterBook={ requesterBook }
                    onBookSelect={ onBookSelect }
                    userBooks={ userBooks }
                    handleTradeRequest={ handleTradeRequest }
                    cancelRequesterBook={ cancelRequesterBook }/>
    </div>
  )

}

BookPage.propTypes = {
  userBooks: PropTypes.array.isRequired,
  allBooks: PropTypes.array.isRequired,
  setRequesteeBook: PropTypes.func.isRequired,
  cancelRequesterBook: PropTypes.func.isRequired,
  handleTradeRequest: PropTypes.func.isRequired,
  requesteeBook: PropTypes.object,
  onBookSelect: PropTypes.func.isRequired,
  requesterBook: PropTypes.object
}

export default BookPage;
