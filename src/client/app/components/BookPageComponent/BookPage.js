import React, { Component } from 'react';

class BookPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentWillMount() {
    this.fetchAllBooks();
  }

  renderBooks() {
    console.log(this.state.books);
    if(this.state.books.length < 1) {
      return (
        <div>There are no books for trade.</div>
      )
    }
    return this.state.books.map((book, index) => {
      return (
        <div key={index}>
          <img src={book.imgUrl}  style={ {float: 'left', margin: '10px'} } data-toggle="modal" data-target="#myModal"/>
          {/* <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> */}
        </div>
      )
    })
  }

  fetchAllBooks() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : '';
    if(!user) return;
    axios.get(process.env.URL + '/books', {
      headers: {'token': localStorage.token }
    })
    .then((res) => {
      this.setState({ books: res.data.books });
    })
    .catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        { this.renderBooks() }
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <p>One fine body…</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookPage;
