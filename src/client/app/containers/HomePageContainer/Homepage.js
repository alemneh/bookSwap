import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import HomePage from '../../components/HomePageComponent/HomePage';
import { fetchCurrentUser } from '../../actions/userActions';


class HomePageContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  const { fetchCurrentUser, token, userId } = this.props;
    // fetchCurrentUser(userId, token);
  }

  render() {
    return (
      <div>
        <HomePage />
      </div>
    )
  }
}


function mapPropsToState(state) {
  return {
    userId: state.login.userId,
    token: state.login.token
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser }, dispatch);
}

export default connect(mapPropsToState, matchDispatchToProps)(HomePageContainer);
