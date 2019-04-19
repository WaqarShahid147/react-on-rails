/**
 *
 * App.js
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import localforage from 'localforage';
import { get } from 'lodash';
import HomePage from '../../containers/HomePage/Loadable';
import Signup from '../../containers/Signup/Loadable';
import Login from '../../containers/Login/Loadable';
import MainContainer from '../../containers/MainContainer/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import store from '../../reduxApp/store';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    this.state = { userLoaded: false }
  }

  componentWillMount = async () => {
    this.setState({
      userLoaded: true,
      user: await localforage.getItem('currentUser')
    })
  }

  // get user from either local storage or from redux store
  getAccessToken = () => {
    const { user: userInState } = this.state
    const userInRedux = get(store.getState().get('auth'), 'currentUser')
    return get(userInState, 'accessToken') || get(userInRedux, 'accessToken')
  }

  requireAuth = (ComponentToRender) => () =>
    this.getAccessToken()
      ? (
        <MainContainer style={{height: '100%'}}>
          <ComponentToRender />
        </MainContainer>
      )
      : <Redirect to='/login' />

  render () {
    const { requireAuth } = this
    // a hack to wait for the user to be loaded from localStorage
    if (!this.state.userLoaded) return <div></div>
    return (
      <div style={{height: '100%'}}>
        <Switch>
          <Route exact path="/" render={requireAuth(HomePage)} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
