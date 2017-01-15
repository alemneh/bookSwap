import React, { PropTypes } from 'react';
import Info  from '../UserInfoComponent/UserInfo';
import Books from '../UserBooksComponent/UserBooks';
import Trade from '../TradeComponent/Trade';


const ProfileComponent = ({
  user,
  isEditing,
  search,
  book2Remove,
  userBooks,
  pendingTrades,
  tradeRequests,
  _queryBook2Add,
  viewTrade,
  trade,
  _removeBookFromUser,
  onEditClick,
  onCancelClick,
  onSaveClick,
  handleUsernameChange,
  handleStateChange,
  handleCityChange,
  handleUpdateOnUser,
  handleAcceptTrade,
  handleDeclineTrade,
  handleBookSearchChange,
  handleRemoveBook
 }) => {

  return (
      <div>
        <h2>{user.name}'s Profile</h2>
        <hr />
        <ul className="nav nav-tabs">
          <li className="active"><a href="#info" data-toggle="tab" aria-expanded="true">Info</a></li>
          <li className=""><a href="#books" data-toggle="tab" aria-expanded="false">Books</a></li>
          <li className=""><a href="#trades" data-toggle="tab" aria-expanded="false">Trades</a></li>
        </ul>
        <div id="myTabContent" className="tab-content">
          <Info user={user}
                isEditing={ isEditing }
                handleUsernameChange={ handleUsernameChange }
                handleStateChange={ handleStateChange }
                handleCityChange={ handleCityChange }
                onEditClick={ onEditClick }
                onCancelClick= { onCancelClick }
                onSaveClick={ onSaveClick }
                />
          <Books userBooks={ userBooks }
                 book2Remove={ book2Remove }
                 search={ search }
                 _queryBook2Add={ _queryBook2Add }
                 _removeBookFromUser={ _removeBookFromUser }
                 handleBookSearchChange={ handleBookSearchChange }
                 handleRemoveBook={ handleRemoveBook }
                 />
          <Trade pendingTrades={ pendingTrades }
                 tradeRequests={ tradeRequests }
                 viewTrade={ viewTrade }
                 trade={ trade }
                 user={ user }
                 handleAcceptTrade={ handleAcceptTrade }
                 handleDeclineTrade={ handleDeclineTrade }
                />
        </div>
      </div>
  );

}

ProfileComponent.propTypes = {
  user: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  book2Remove: PropTypes.object,
  userBooks: PropTypes.array.isRequired,
  pendingTrades: PropTypes.array.isRequired,
  tradeRequests: PropTypes.array.isRequired,
  _queryBook2Add: PropTypes.func.isRequired,
  viewTrade: PropTypes.func.isRequired,
  trade: PropTypes.object,
  _removeBookFromUser: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleAcceptTrade: PropTypes.func.isRequired,
  handleDeclineTrade: PropTypes.func.isRequired,
  handleBookSearchChange: PropTypes.func.isRequired,
  handleRemoveBook: PropTypes.func.isRequired
}

export default ProfileComponent;
