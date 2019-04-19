/*
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';
import { get, isEmpty } from 'lodash';
import actions from '../../reduxApp/actions';
import Images from '../../images';
import './styles.css';

class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props)
    this.state = {
      selectedSwitchIndex: 0
    }
  }

  componentWillMount() {
    this.props.clearForm()
  }

  login = () => {
    const { email, password, history } = this.props;
    if (this.validateInputs()) {
      this.props.clearError()
      this.props.login(email, password)
      .then(() => history.push('/'))
      .catch(console.log)
    }
  }

  validateInputs() {
    return this.validEmail() && this.validPassword()
  }

  validEmail = () => {
    const { email, addError } = this.props
    const emailRegex =/^(([^$-\/:-?{-~!"^`\[\]@\\#]+([.\-_+][^$-\/:-?{-~!"^`\[\]@\\]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (isEmpty(email)) {
      addError('Please input email.')
      return false
    } else if (!emailRegex.test(email)) {
      addError('Please input valid email.')
      return false
    }
    return true
  }

  validPassword() {
    const { password, addError } = this.props
    if (isEmpty(password)) {
      addError('Please input password.')
      return false
    } else if (password.length < 6) {
      addError('Too short password. Input at least 6 characters.')
      return false
    }
    return true
  }

  render() {
    const { selectedSwitchIndex } = this.state
    const { email, password, changeEmail, changePassword, history } = this.props
    const { login } = this;
    return (
      <div className='offset-md-5 col-md-3'>
        <div className='hasError'>
          {this.props.error}
        </div>
        <LoginForm
          {...{ email, password, changeEmail, changePassword, login, history }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.get('auth').form.error,
  email: state.get('auth').form.email,
  password: state.get('auth').form.password,
  currentUser: state.get('auth').currentUser,
  loggingIn: state.get('auth').loggingIn,
})

const mapDispatchToProps = (dispatch) => ({
  clearError: (payload) => dispatch(actions.clearError(payload)),
  addError: (payload) => dispatch(actions.addError(payload)),
  login: (email, password) => {
    return new Promise((resolve, reject) =>
      dispatch(actions.loginRequest(email, password, resolve, reject)))
  },
  changeEmail: (email) => dispatch(actions.changeEmail(email)),
  changePassword: (password) => dispatch(actions.changePassword(password)),
  clearForm: () => dispatch(actions.clearForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
