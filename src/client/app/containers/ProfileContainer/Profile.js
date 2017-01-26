import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import books from 'google-books-search';
import Profile from '../../components/ProfileComponent/Profile';
import {
  fetchUserBooks,
  fetchUserTrades,
  addBookToUser,
  removeBookFromUser,
  updateUserInfo,
  copyCityInput,
  emailCheckboxClick,
  textCheckboxClick,
  copyUserNameInput,
  copyStateInput,
  onEditClick,
  onCancelClick,
  setBook2Remove,
  copySearchInput,
  copyPhoneNumberInput,
  declineTrade,
  acceptTrade,
  viewTrade
} from '../../actions/userActions';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCityChange        = this.handleCityChange.bind(this)
    this.handleUsernameChange    = this.handleUsernameChange.bind(this);
    this.handleStateChange       = this.handleStateChange.bind(this);
    this.handleBookSearchChange  = this.handleBookSearchChange.bind(this);
    this.handleEmailChange       = this.handleEmailChange.bind(this);
    this.handleCheckBoxChange    = this.handleCheckBoxChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.onSaveClick             = this.onSaveClick.bind(this);
    this._queryBook2Add          = this._queryBook2Add.bind(this);
    this._removeBookFromUser     = this._removeBookFromUser.bind(this);
    this.handleRemoveBook        = this.handleRemoveBook.bind(this);
    this.handleAcceptTrade       = this.handleAcceptTrade.bind(this);
    this.handleDeclineTrade      = this.handleDeclineTrade.bind(this);
  }

  componentWillMount() {
    const {fetchUserBooks, fetchUserTrades, user, token} = this.props;
    if(!user) return browserHistory.push('/');
    fetchUserBooks(user, token);
    fetchUserTrades(user, token);
  }

  _queryBook2Add() {
    const { user, token, addBookToUser, search } = this.props;
    books.search(search, (err, res) => {
      if(!err) {
        const newBook = {
          title: res[0].title,
          imgUrl: res[0].thumbnail,
          owner: user.name
        };
        console.log(newBook);

        addBookToUser(newBook, user, token);

      } else {
        console.log(err);
      }
    })
  }


  _removeBookFromUser(book) {
    let { removeBookFromUser, token } = this.props;

    removeBookFromUser(book, token);
  }

  handleDeclineTrade(trade) {
    const { user, token, tradeRequests, pendingTrades, declineTrade } = this.props;
    if(!user) return;

    declineTrade(trade, user._id, token);
  }


  handleAcceptTrade(trade) {
    const { user, token, tradeRequests, pendingTrades, acceptTrade } = this.props;
    if(!user) return;

    acceptTrade(trade, user._id, token);
  }

  handleBookSearchChange(e) {
    this.props.copySearchInput(e.target.value)
  }

  handlePhoneNumberChange(e) {

    this.props.copyPhoneNumberInput(e.target.value)
  }

  handleEmailChange(e) {

    this.props.copyEmailInput(e.target.value)
  }

  handleRemoveBook(e) {
    this.props.setBook2Remove(e.target.alt)
  }

  handleCityChange(e) {
    this.props.copyCityInput(e.target.value)
  }

  handleStateChange(e) {
    this.props.copyStateInput(e.target.value)
  }

  handleUsernameChange(e) {
    this.props.copyUserNameInput(e.target.value)
  }

  handleCheckBoxChange(e) {
    const { emailCheckboxClick, textCheckboxClick } = this.props;
    if(e.target.name === 'checkboxEmail') {
      emailCheckboxClick();
      return;
    }
    textCheckboxClick();
  }

  onSaveClick(e) {
    e.preventDefault();
    const {
      updateUserInfo,
      user,
      token,
      newCity,
      newEmail,
      newPhoneNumber,
      email_notification,
      text_notification,
      newUserName,
      newState
    } = this.props

    const updatedUser = {
      name:  newUserName ? newUserName : user.name,
      email: newEmail    ? newEmail : user.email,
      city:  newCity     ? newCity : user.city,
      state: newState    ? newState : user.state,
      phoneNumber: newPhoneNumber ? newPhoneNumber : user.phoneNumber,
      email_notification: email_notification ? true : false,
      text_notification: text_notification ? true : false
    }

    updateUserInfo(updatedUser, user._id, token)
  }


  render() {
    const {
      user,
      isEditing,
      userBooks,
      book2Remove,
      viewTrade,
      search,
      trade,
      pendingTrades,
      tradeRequests,
      onEditClick,
      onCancelClick
     } = this.props;
    return (
      <section className="container">
        <Profile  user={ user }
                  book2Remove={ book2Remove }
                  search={ search }
                  trade={ trade }
                  userBooks={ userBooks }
                  isEditing={ isEditing }
                  viewTrade={ viewTrade }
                  pendingTrades={ pendingTrades }
                  tradeRequests={ tradeRequests }
                  onEditClick={ onEditClick }
                  onCancelClick= { onCancelClick }
                  _queryBook2Add={ this._queryBook2Add }
                  _removeBookFromUser={ this._removeBookFromUser }
                  handlePhoneNumberChange={ this.handlePhoneNumberChange }
                  handleCheckBoxChange={ this.handleCheckBoxChange }
                  handlePasswordChange={ this.handlePasswordChange}
                  handleUsernameChange={ this.handleUsernameChange }
                  handleStateChange={ this.handleStateChange }
                  handleCityChange={ this.handleCityChange }
                  onSaveClick={ this.onSaveClick }
                  handleAcceptTrade={ this.handleAcceptTrade }
                  handleDeclineTrade={ this.handleDeclineTrade }
                  handleBookSearchChange={ this.handleBookSearchChange }
                  handleRemoveBook={ this.handleRemoveBook }
                  />
      </section>
    )
  }
}

function mapPropsToState(state) {
  return {
    user: state.user.user || state.login.user,
    token: state.login.token,
    isEditing: state.user.isEditing,
    userBooks: state.user.books,
    newPhoneNumber: state.user.newPhoneNumber,
    email_notification: state.user.email_notification,
    text_notification: state.user.text_notification,
    newState: state.user.newState,
    newEmail: state.user.newEmail,
    newCity: state.user.newCity,
    search: state.user.search,
    trade: state.user.trade,
    book2Remove: state.user.book2Remove,
    newUserName: state.user.newUserName,
    pendingTrades: state.user.pendingTrades,
    tradeRequests: state.user.tradeRequests
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserBooks,
    fetchUserTrades,
    addBookToUser,
    removeBookFromUser,
    updateUserInfo,
    copyCityInput,
    copyUserNameInput,
    copyStateInput,
    declineTrade,
    acceptTrade,
    onEditClick,
    onCancelClick,
    setBook2Remove,
    copySearchInput,
    viewTrade
  }, dispatch)
}


export default connect(mapPropsToState, matchDispatchToProps)(ProfileContainer);
