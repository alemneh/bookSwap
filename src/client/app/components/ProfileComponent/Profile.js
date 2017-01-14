import React, { Component } from 'react';
import Info  from '../UserInfoComponent/UserInfo';
import Books from '../UserBooksComponent/UserBooks';
import Trade from '../TradeComponent/Trade';

//Helper function to find book in array
function searchByValue(value, property, array){
   for(var i = 0; i < array.length; i++){
       // check that property is defined first
       if(typeof array[i][property] !== 'undefined') {
           // then check its value
           if(array[i][property] === value){
               return array[i];
           }
       }
   }
   return false;
}


class ProfileComponent extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      user,
      isEditing,
      search,
      book2Remove,
      userBooks,
      pendingTrades,
      tradeRequests,
      _queryBook2Add,
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
     } = this.props;
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
                   handleAcceptTrade={ handleAcceptTrade }
                   handleDeclineTrade={ handleDeclineTrade }
                  />
          </div>
        </div>
    );
  }

}

export default ProfileComponent;
