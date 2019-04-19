/*
 * HomePage
 */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { map, filter, isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl';
import actions from '../../reduxApp/actions';
import {
  Section,
  Heading,
} from '../../components';
import './styles.css';
import Images from '../../images';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount () {
    this.props.fetchCurrentUser()
    .catch(console.log)
  }

  render() {
    return (
      <div className={'container-fluid'}>
        <div className={'noTextSelect'}
          onClick={() => {
            this.props.signout()
            this.props.history.push('/login')
          }}
        >
          Logout
        </div>
        <Section>
          Home
        </Section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.get('auth').currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () =>  new Promise((resolve, reject) =>
    dispatch(actions.fetchCurrentUserRequest(resolve, reject))),
  signout: () =>  new Promise((resolve, reject) =>
    dispatch(actions.signoutRequest(resolve, reject))),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
