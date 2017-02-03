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
    const { fetchAllBooks, fetchUserBooks, token, userId } = this.props;
    fetchAllBooks(token);
    fetchUserBooks(userId, token);

  }


  onBookSelect(e) {
    e.preventDefault()
    const { userBooks, setRequesterBook } = this.props;
    const book = userBooks.filter((book) => book.title == e.target.value)[0];
    setRequesterBook(book);
  }

  handleTradeRequest() {
    const { requesterBook, requesteeBook, makeTradeRequest, token, user} = this.props;

    const trade = {
      requesterId: requesterBook._owner,
      requesteeId: requesteeBook._owner,
      requesteeBook: requesteeBook._id,
      requesterBook: requesterBook._id,
      requesteeEmail: user.email,
      requesteeBookTitle: requesteeBook.title,
      requesterBookTitle: requesterBook.title,
      requesteeName: requesteeBook.owner,
      requesterName: requesterBook.owner,
      requesterImgUrl: requesterBook.imgUrl,
      requesteeImgUrl: requesteeBook.imgUrl,
      requesteeEmail: requesteeBook.ownerEmail
    }
    console.log(user);
    console.log(trade);
    makeTradeRequest(trade, token);
  }

  renderError() {
    const { error, success, setAlertMessage, alertMessage } = this.props;
    if(error) setAlertMessage(error.response.data.message, true);
    if(success) setAlertMessage(success, false);
    if(!alertMessage) { return null;}
    const styles = error ? 'alert alert-dismissible alert-danger' :
                           'alert alert-dismissible alert-success'
    window.setTimeout(() => {
      console.log('late hit');
      setAlertMessage('', false);
    }, 2000)

    return (
         <div className={styles}>
           <button type="button" className="close" data-dismiss="alert">&times;</button>
           {alertMessage}
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
      <section className="container">
        { this.renderError() }
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
      </section>
    )
  }
}

function mapPropsToState(state) {
  return {
    user: state.user.user,
    token: state.login.token,
    userId: state.login.userId,
    allBooks: state.books.books,
    userBooks: state.user.books,
    requesteeBook: state.books.requesteeBook,
    requesterBook: state.books.requesterBook,
    error: state.books.error,
    success: state.books.success,
    alertMessage: state.alert.message
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
