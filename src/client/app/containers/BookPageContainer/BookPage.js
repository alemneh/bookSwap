import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/booksActions';
import BookPage from '../../components/BookPageComponent/BookPage';

class BookPageContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchAllBooks, token } = this.props;
    fetchAllBooks(token);
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
      requesteeImgUrl: requesteeBook.imgUrl
    }

    makeTradeRequest(trade, token);
  }

  render() {
    const {
      allBooks,
      userBooks,
      requesteeBook,
      setRequesteeBook,
      setRequesterBook,
      cancelRequesterBook
    } = this.props;

    return (
      <div>
        <BookPage allBooks={ allBooks }
                  userBooks={ userBooks }
                  requesteeBook={ requesteeBook }
                  setRequesteeBook={ setRequesteeBook }
                  setRequesterBook={ setRequesterBook }
                  cancelRequesterBook={ cancelRequesterBook }
                  handleTradeRequest= {this.handleTradeRequest}
                  />
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    token: state.login.token,
    allBooks: state.books.books,
    userBooks: state.user.books,
    requesteeBook: state.books.requesteeBook,
    requesterBook: state.books.requesterBook
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllBooks: actions.fetchAllBooks,
    makeTradeRequest: actions.makeTradeRequest,
    setRequesteeBook: actions.setRequesteeBook,
    setRequesterBook: actions.setRequesterBook,
    cancelRequesterBook: actions.cancelRequesterBook
  }, dispatch)
}

export default connect(mapPropsToState, matchDispatchToProps)(BookPageContainer);
