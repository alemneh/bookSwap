import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/booksActions';
import BookPage from '../../components/BookPageComponent/BookPage';
import Alert from '../../components/AlertComponent/Alert';
import { setAlertMessage } from '../../actions/alertActions';
import { fetchUserBooks } from '../../actions/userActions';



class BookPageContainer extends Component {
  constructor(props) {
    super(props);

    this.onBookSelect = this.onBookSelect.bind(this);
    this.handleTradeRequest = this.handleTradeRequest.bind(this);

  }

  componentWillMount() {
    const { fetchAllBooks, fetchUserBooks, token, user } = this.props;
    fetchAllBooks(token);
    fetchUserBooks(user, token);

  }


  onBookSelect(e) {
    e.preventDefault()
    const { userBooks, setRequesterBook } = this.props;
    const book = userBooks.filter((book) => book.title == e.target.value)[0];
    setRequesterBook(book);
  }

  handleTradeRequest() {
    const { requesterBook, requesteeBook, makeTradeRequest, token} = this.props;

    const trade = {
      requesterId: requesterBook._owner,
      requesteeId: requesteeBook._owner,
      requesteeBook: requesteeBook._id,
      requesterBook: requesterBook._id,
      requesteeBookTitle: requesteeBook.title,
      requesterBookTitle: requesterBook.title,
      requesteeName: requesteeBook.owner,
      requesterName: requesterBook.owner,
      requesterImgUrl: requesterBook.imgUrl,
      requesteeImgUrl: requesteeBook.imgUrl,
      requesteeEmail: requesteeBook.ownerEmail
    }

    makeTradeRequest(trade, token);
  }

  renderAlert() {

    const { success, error, isError, inputError, setAlertMessage } = this.props;
    if(success) {
      setAlertMessage(success, false);
    } else if(error) {
      setAlertMessage(error.response.data.message, true);
    } else {
      return;
    }

    return (
      <div>
        <Alert message={inputError }
               error={isError} />
      </div>
    )
  }

  render() {
    const {
      allBooks,
      userBooks,
      requesteeBook,
      requesterBook,
      setRequesteeBook,
      setRequesterBook,
      cancelRequesterBook
    } = this.props;

    return (
      <div>
        <BookPage allBooks={ allBooks }
                  userBooks={ userBooks }
                  requesteeBook={ requesteeBook }
                  requesterBook={ requesterBook }
                  setRequesteeBook={ setRequesteeBook }
                  onBookSelect={ this.onBookSelect }
                  cancelRequesterBook={ cancelRequesterBook }
                  handleTradeRequest= {this.handleTradeRequest}
                  />
         {/* { this.renderAlert() } */}
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    token: state.login.token,
    user: state.login.user,
    allBooks: state.books.books,
    userBooks: state.user.books,
    requesteeBook: state.books.requesteeBook,
    requesterBook: state.books.requesterBook,
    error: state.books.error,
    success: state.books.success,
    inputError: state.alert.message
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllBooks: actions.fetchAllBooks,
    makeTradeRequest: actions.makeTradeRequest,
    setRequesteeBook: actions.setRequesteeBook,
    setRequesterBook: actions.setRequesterBook,
    cancelRequesterBook: actions.cancelRequesterBook,
    setAlertMessage,
    fetchUserBooks
  }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(BookPageContainer);
