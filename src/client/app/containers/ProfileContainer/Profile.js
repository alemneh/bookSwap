import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import books from 'google-books-search';
import Profile from '../../components/ProfileComponent/Profile';
import { declineTrade, acceptTrade } from '../../actions/tradeActions';
import {
  fetchUserBooks,
  fetchUserTrades,
  addBookToUser,
  removeBookFromUser,
  updateUserInfo,
  copyCityInput,
  copyUserNameInput,
  copyStateInput,
  onEditClick,
  onCancelClick,
  setBook2Remove,
  copySearchInput
} from '../../actions/userActions';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleStateChange  = this.handleStateChange.bind(this);
    this.handleBookSearchChange = this.handleBookSearchChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this._queryBook2Add = this._queryBook2Add.bind(this);
    this._removeBookFromUser = this._removeBookFromUser.bind(this);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
  }

  componentWillMount() {
    const {fetchUserBooks, fetchUserTrades, user, token} = this.props;
    fetchUserBooks(user, token);
    fetchUserTrades(user, token);
  }

  _queryBook2Add() {
    const { user, token, addBookToUser, search } = this.props;
    books.search(search, (err, res) => {
      if(!err) {
        const newBook = {title: res[0].title, imgUrl: res[0].thumbnail};

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

  handleUpdateOnUser(user) {
    const userId = this.state.user._id;
    const updatedUser = {
      _id: this.state.user._id,
      name: user.name,
      city: user.city,
      state: user.state
    }

    updateUserInfo(updatedUser, token)
  }

  handleDeclineTrade(trade) {
    const { user, token, tradeRequests, pendingTrades } = this.props;
    if(!user) return;
    // tradeRequests = tradeRequests.filter((t) => t._id != trade._id);
    // pendingTrades = pendingTrades.filter((t) => t._id != trade._id);

    declineTrade(trade, user._id, token);
  }


  handleAcceptTrade(trade) {
    const { user, token, tradeRequests, pendingTrades } = this.props;
    if(!user) return;
    // tradeRequests = tradeRequests.filter((t) => t._id != trade._id);
    // pendingTrades = pendingTrades.filter((t) => t._id != trade._id);

    acceptTrade(trade, user._id, token);
  }

  handleBookSearchChange(e) {
    this.props.copySearchInput(e.target.value)
  }

  handleRemoveBook(e) {
    console.log(e.target.alt);
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

  onSaveClick(e) {
    console.log('hellooooo!');
    e.preventDefault();
    const {
      updateUserInfo,
      user,
      token,
      newCity,
      newUserName,
      newState
    } = this.props

    const updatedUser = {
      name:  newUserName ? newUserName : user.name,
      city:  newCity     ? newCity : user.city,
      state: newState    ? newState : user.state
    }

    updateUserInfo(updatedUser, user._id, token)
  }


  render() {
    const {
      user,
      isEditing,
      userBooks,
      book2Remove,
      search,
      pendingTrades,
      tradeRequests,
      onEditClick,
      onCancelClick
     } = this.props;
    return (
      <div>
        <Profile  user={ user }
                  book2Remove={ book2Remove }
                  search={ search }
                  userBooks={ userBooks }
                  isEditing={ isEditing }
                  pendingTrades={ pendingTrades }
                  tradeRequests={ tradeRequests }
                  onEditClick={ onEditClick }
                  onCancelClick= { onCancelClick }
                  _queryBook2Add={ this._queryBook2Add }
                  _removeBookFromUser={ this._removeBookFromUser }
                  handleUsernameChange={ this.handleUsernameChange }
                  handleStateChange={ this.handleStateChange }
                  handleCityChange={ this.handleCityChange }
                  onSaveClick={ this.onSaveClick }
                  handleAcceptTrade={ this.handleAcceptTrade }
                  handleDeclineTrade={ this.handleDeclineTrade }
                  handleBookSearchChange={ this.handleBookSearchChange }
                  handleRemoveBook={ this.handleRemoveBook }
                  />
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    user: state.user.user || state.login.user,
    token: state.login.token,
    isEditing: state.user.isEditing,
    userBooks: state.user.books,
    newState: state.user.newState,
    newCity: state.user.newCity,
    search: state.user.search,
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
    copySearchInput
  }, dispatch)
}


export default connect(mapPropsToState, matchDispatchToProps)(ProfileContainer);
