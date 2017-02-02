import React, { Component } from 'react';
import NavBar from './containers/NavBarContainer/NavBar';
import Footer from './components/FooterComponent/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleNavBar } from './actions/loginActions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    }
    this._handleWindowResize = this._handleWindowResize.bind(this);
  }

  componentDIdMount() {
    window.addEventListener('resize', () => console.log(resize));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleWindowResize);
  }

  _handleWindowResize() {
    console.log('resize');
    this.setState({
     windowWidth: window.innerWidth
   });
  }

  styles() {
    console.log(window.innerWidth);
    const { token, slideToggleClass, toggleNavBar } = this.props;
    console.log('slideToggleClass: ' + slideToggleClass);
    console.log('token: ' + token);
    if(window.innerWidth > 700 && slideToggleClass == 'none' ) {
        console.log('hit');
        console.log('slideToggleClass: ' + slideToggleClass);
        return toggleNavBar();

    }  else if (token && !slideToggleClass && window.innerWidth < 700) {

      console.log('logged In');
      return {
        marginTop: '320px'
      }
    } else if (!token && !slideToggleClass && window.innerWidth < 700) {
      console.log('not logged in');
      return {
        marginTop: '220px'
      }
    }
  }


  render() {


    return (
      <div>
        <NavBar />
        <section style={this.styles()}>
        {this.props.children}
        </section>
        <Footer />
      </div>
    );
  }

}

function mapPropsToState(state) {
  return {
    slideToggleClass: state.login.slideToggleClass,
    token: state.login.token
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ toggleNavBar }, dispatch);
}


export default connect(mapPropsToState, matchDispatchToProps)(App);
