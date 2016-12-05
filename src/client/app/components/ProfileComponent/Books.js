import React, { Component } from 'react';
import books from 'google-books-search';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      book2Remove: ''
    }
    this.handleBookSearchChange = this.handleBookSearchChange.bind(this);
    this.renderBookList = this.renderBookList.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.renderBookDeleteModal = this.renderBookDeleteModal.bind(this);
  }

  handleBookSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  handleRemoveBook(e) {
    this.setState({book2Remove: e.target.alt})
  }

  renderLoadingSpinner() {
    if(this.props.isLoading) {
      return (
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', marginLeft: '50px'}}></i>
      )
    }
  }

  renderBookList() {
    if(this.props.books.length < 1) {
      return (
        <div>No books added!</div>
      )
    }
    return this.props.books.map((book, index) => {
      return <img src={book.imgUrl} key={index} style={ {float: 'left', margin: '10px'} }
                  alt={ book.title }
                  data-toggle="modal" data-target="#myModal" onClick={ this.handleRemoveBook }/>
    })
  }

  renderBookDeleteModal() {
    const title = this.state.book2Remove;
    if(!title) return;
    const book = this.props.books.filter((book) => book.title == title);

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
                <div className="col-xs-12"><img src={book[0] ? book[0].imgUrl : ''} /></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.removeBookFromUserList(title)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="tab-pane fade" id="books">
        <div>
          <h3>Add more books!</h3>
          <input type="text" onChange={ this.handleBookSearchChange } value={this.state.search} />
          <input type="button" value="Add"  onClick={ this.handleAddBook }/>
          { this.renderLoadingSpinner() }
        </div>
        <hr />
        <div>
          {this.renderBookList()}
        </div>
        { this.renderBookDeleteModal() }
      </div>
    )
  }

  handleAddBook(e) {
    e.preventDefault()
    this.props._queryBook2Add(this.state.search);
    console.log(this.state.search);
    this.setState({ search: ''});
  }
}

export default Books;
