import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'
import localforage from 'localforage'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password', 'resolve', 'reject'],
  loginSuccess: null,
  loginFailure: ['error'],
  changeEmail: ['email'],
  changePassword: ['password'],
  changePasswordConfirmation: ['passwordConfirmation'],
  saveUser: ['currentUser'],
  verifyTokenRequest: ['token', 'resolve', 'reject'],
  signupRequest: ['payload', 'resolve', 'reject'],
  signupSuccess: null,
  signupFailure: ['error'],
  clearForm: null,
  signoutRequest: ['resolve', 'reject'],
  signoutSuccess: null,
  addError: ['error'],
  clearError: null,
  fetchCurrentUserRequest: ['resolve', 'reject'],
  fetchCurrentUserSuccess: null,
  fetchCurrentUserFailure: ['error'],
  // add action here
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggingIn: null,
  signingUp: null,
  updatingUser: null,
  currentUser: {},
  educationalContentUrls: {},
  // // for signup
  // form: { error: '', email: 'admin@example.com',
    // password: '123123', passwordConfirmation: '123123'},

  // // for login
  // form: { error: '', email: 'admin@example.com', password: '123123'},

  form: { error: ''},
})

/* ------------- Reducers ------------- */

export const loginRequest = (state, action) =>
  state.merge({ loggingIn: true, form: { ...state.form, error: '' } })

export const loginSuccess = (state, action) =>
  state.merge({ loggingIn: false, form: { ...state.form, error: '' } })

export const loginFailure = (state, { error }) =>
  state.merge({ loggingIn: false, form: { ...state.form, error } })

export const changeEmail = (state, { email }) =>
  state.setIn(['form', 'email'], email)

export const changePassword = (state, { password }) =>
  state.setIn(['form', 'password'], password)

export const changePasswordConfirmation = (state, { passwordConfirmation }) =>
  state.setIn(['form', 'passwordConfirmation'], passwordConfirmation)

export const saveUser = (state, { currentUser }) =>
  state.merge({ currentUser })

export const verifyTokenRequest = (state, action) => state

export const signupRequest = (state, action) =>
  state.merge({ signingUp: true, form: { ...state.form, error: '' } })

export const signupSuccess = (state, action) =>
  state.merge({ signingUp: false, form: { ...state.form, error: '' } })

export const signupFailure = (state, { error }) =>
  state.merge({ signingUp: false, form: { ...state.form, error } })

export const clearForm = (state, action) => state.set('form', { error: '' })

export const signoutRequest = (state, action) => state

export const signoutSuccess = (state, action) =>
  state.merge({})

export const addError = (state, { error }) =>
  state.setIn(['form', 'error'], error)

export const clearError = (state, action) =>
  state.setIn(['form', 'error'], '')

export const fetchCurrentUserRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchCurrentUserSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchCurrentUserFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.CHANGE_EMAIL]: changeEmail,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_CONFIRMATION]: changePasswordConfirmation,
  [Types.SAVE_USER]: saveUser,
  [Types.VERIFY_TOKEN_REQUEST]: verifyTokenRequest,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.CLEAR_FORM]: clearForm,
  [Types.SIGNOUT_REQUEST]: signoutRequest,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
  [Types.ADD_ERROR]: addError,
  [Types.CLEAR_ERROR]: clearError,
  [Types.FETCH_CURRENT_USER_REQUEST]: fetchCurrentUserRequest,
  [Types.FETCH_CURRENT_USER_SUCCESS]: fetchCurrentUserSuccess,
  [Types.FETCH_CURRENT_USER_FAILURE]: fetchCurrentUserFailure,
  // add reducer hook up here
})
