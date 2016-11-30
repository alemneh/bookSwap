import React, { Component } from 'react';

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
    return (
      this.props.books.forEach((book) => {
        return <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
      })
    )
  }

  render() {
    return (
      <div className="tab-pane fade" id="books">
        <div>
          <h3>Add more books!</h3>
          <input type="text" onChange={ this.props.handleBookSearchChange } />
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
    console.log(this.state.search);
  }
}

export default Books;
