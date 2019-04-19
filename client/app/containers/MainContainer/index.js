/*
 * MainContainer
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import localforage from 'localforage';
import { connect } from 'react-redux';
import Images from '../../images';
import { Header, Footer } from '../../components'
import actions from '../../reduxApp/actions';
import './style.css';

class MainContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    localforage.getItem('currentUser')
    .then(this.props.saveUser)
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.get('auth').currentUser
})

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(actions.saveUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
