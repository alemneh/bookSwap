import React, { Component } from 'react';
import books from 'google-books-search';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.handleBookSearchChange = this.handleBookSearchChange.bind(this);
    this.renderBookList = this.renderBookList.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  handleBookSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  renderBookList() {
    if(this.props.books.length < 1) {
      return (
        <div>No books added!</div>
      )
    }
    return this.props.books.map((book, index) => {
      return <img src={book.imgUrl} key={index} style={ {float: 'left', margin: '10px'} } />
    })
  }

  render() {
    return (
      <div className="tab-pane fade" id="books">
        <div>
          <h3>Add more books!</h3>
          <input type="text" onChange={ this.handleBookSearchChange } value={this.state.search} />
          <input type="button" value="Add"  onClick={ this.handleAddBook }/>
        </div>
        <hr />
        <div>
          {this.renderBookList()}
        </div>
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
