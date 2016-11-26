import React, { Component } from 'react';
import Trade from '../TradeComponent/Trade';


class ProfileComponent extends Component {
  render() {
    return (
        <div>
          <h2>Profile</h2>
          <hr />
          <ul className="nav nav-tabs">
            <li className="active"><a href="#info" data-toggle="tab" aria-expanded="true">Info</a></li>
            <li className=""><a href="#books" data-toggle="tab" aria-expanded="false">Books</a></li>
            <li className=""><a href="#trades" data-toggle="tab" aria-expanded="false">Trades</a></li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade active in" id="info">
              <h3><b>NAME:</b> &nbsp;Alemneh Asefa</h3>
              <h3><b>CITY:</b> &nbsp;&nbsp;&nbsp;&nbsp;Settle</h3>
              <h3><b>STATE:</b> &nbsp;WA</h3>
            </div>
            <div className="tab-pane fade" id="books">
              <div>
                <h3>Add more books!</h3>
                <input type="text" />
                <input type="button" value="Add" />
              </div>
              <hr />
              <div>
                <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
                <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
                <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
                <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
                <div style={ {backgroundColor: 'blue', width: '200px', height: '250px', float: 'left', margin: '10px'} }>Book</div>
              </div>
            </div>
            <div className="tab-pane fade" id="trades">
              <div className="row" style={ {marginTop: '20px'} }>
                <div className="col-md-6">
                  <div className="list-group">
                    <a href="#" className="list-group-item active">Pending Trades</a>
                    <a href="#" className="list-group-item">48 Laws of Power FOR Art of War</a>
                    <a href="#" className="list-group-item">Magic FOR Junk Mail</a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="list-group">
                    <a href="#" className="list-group-item active">Trade Requests</a>
                    <a href="#" className="list-group-item">48 Laws of Power FOR Art of War</a>
                    <a href="#" className="list-group-item">Magic FOR Junk Mail</a>
                  </div>
                </div>
              </div>
              <Trade />
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileComponent;
