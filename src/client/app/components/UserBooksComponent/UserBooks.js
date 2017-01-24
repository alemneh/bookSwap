import React, { PropTypes } from 'react';

const Books = ({
  search,
  userBooks,
  book2Remove,
  _queryBook2Add,
  handleRemoveBook,
  _removeBookFromUser,
  handleBookSearchChange
}) => {


  const renderBookList = () => {
    if(userBooks.length < 1) {
      return (
        <div>No books added!</div>
      )
    }
    return userBooks.map((book, index) => {
      return <div key={index} className="pin"><img src={book.imgUrl}  style={ {float: 'left', margin: '10px'} }
                  alt={ book.title }
                  data-toggle="modal" data-target="#myModal" onClick={handleRemoveBook }/>
            </div>
    })
  }

  const renderBookDeleteModal = () => {
    if(!book2Remove) return;

    return (
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Delete book</h4>
            </div>
            <div className="modal-body">
              <div className="row text-center">
                <div className="col-xs-12"><img src={book2Remove ? book2Remove.imgUrl : ''} /></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => _removeBookFromUser(book2Remove)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="tab-pane fade" id="books">
      <div>
        <h3>Add more books!</h3>
        <input type="text" onChange={ handleBookSearchChange } value={search} />
        <input type="button" value="Add"  onClick={ _queryBook2Add }/>
      </div>
      <hr />
      <div className="masonary_wrapper" style={{ overflow: 'hidden'}}>
        <div className="masonary_columns">
          { renderBookList()}
        </div>
      </div>
      { renderBookDeleteModal() }
    </div>
  )

}

Books.propTypes = {
  search: PropTypes.string.isRequired,
  userBooks: PropTypes.array.isRequired,
  book2Remove: PropTypes.object,
  _queryBook2Add: PropTypes.func.isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
  _removeBookFromUser: PropTypes.func.isRequired,
  handleBookSearchChange: PropTypes.func.isRequired
}

export default Books;
