/*
 * Signup
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isEmpty } from 'lodash';
import SignupForm from './SignupForm';
import actions from '../../reduxApp/actions'
import './styles.css';

class Signup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.clearForm()
  }

  signup = () => {
    const { email, password, passwordConfirmation, history } = this.props;
    if (this.validateInputs()) {
      this.props.clearError()
      this.props.signup({ email, password, passwordConfirmation })
      .then(() => {
        history.push('/')
      })
      .catch(console.log)
    }
  }

  validateInputs() {
    return this.validEmail() && this.validPassword() && this.validPasswordConfirmation()
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

  validPasswordConfirmation() {
    const { password, passwordConfirmation, addError } = this.props
    if (isEmpty(passwordConfirmation)) {
      addError('Please match password.')
      return false
    } else if (password !== passwordConfirmation) {
      addError('Password confirmation does not match with password.')
      return false
    }
    return true
  }

  render() {
    const { signup } = this;
    const { email, password, passwordConfirmation, changeEmail,
      changePassword, changePasswordConfirmation } = this.props

    return (
      <div className='offset-md-5 col-md-3'>
        <div className='hasError'>
          {this.props.error}
        </div>
        <SignupForm
          {...{ email, password, passwordConfirmation, changeEmail,
            changePassword, changePasswordConfirmation, signup }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.get('auth').form.error,
  email: state.get('auth').form.email,
  password: state.get('auth').form.password,
  passwordConfirmation: state.get('auth').form.passwordConfirmation,
  currentUser: state.get('auth').currentUser,
  loggingIn: state.get('auth').loggingIn,
})

const mapDispatchToProps = (dispatch) => ({
  clearError: (payload) => dispatch(actions.clearError(payload)),
  addError: (payload) => dispatch(actions.addError(payload)),
  signup: (payload) => {
    return new Promise((resolve, reject) =>
      dispatch(actions.signupRequest(payload, resolve, reject)))
  },
  changeEmail: (email) => dispatch(actions.changeEmail(email)),
  changePassword: (password) => dispatch(actions.changePassword(password)),
  changePasswordConfirmation: (passwordConfirmation) =>
    dispatch(actions.changePasswordConfirmation(passwordConfirmation)),
  clearForm: () => dispatch(actions.clearForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
