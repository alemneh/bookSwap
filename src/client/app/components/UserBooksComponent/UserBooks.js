import React, { Component } from 'react';
import books from 'google-books-search';

class Books extends Component {
  constructor(props) {
    super(props);

    this.renderBookList = this.renderBookList.bind(this);
    this.renderBookDeleteModal = this.renderBookDeleteModal.bind(this);
  }



  renderLoadingSpinner() {
    if(this.props.isLoading) {
      return (
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', marginLeft: '50px'}}></i>
      )
    }
  }

  renderBookList() {
    console.log(this.props);
    const {userBooks, handleRemoveBook } = this.props;
    if(userBooks.length < 1) {
      return (
        <div>No books added!</div>
      )
    }
    return userBooks.map((book, index) => {
      return <img src={book.imgUrl} key={index} style={ {float: 'left', margin: '10px'} }
                  alt={ book.title }
                  data-toggle="modal" data-target="#myModal" onClick={handleRemoveBook }/>
    })
  }

  renderBookDeleteModal() {
    const { book2Remove, userBooks, _removeBookFromUser} = this.props;
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



  render() {
    const { search, _queryBook2Add, handleBookSearchChange } = this.props;
    return (
      <div className="tab-pane fade" id="books">
        <div>
          <h3>Add more books!</h3>
          <input type="text" onChange={ handleBookSearchChange } value={search} />
          <input type="button" value="Add"  onClick={ _queryBook2Add }/>
          { this.renderLoadingSpinner() }
        </div>
        <hr />
        <div style={{ overflow: 'hidden'}}>
          {this.renderBookList()}
        </div>
        { this.renderBookDeleteModal() }
      </div>
    )
  }
}

export default Books;
