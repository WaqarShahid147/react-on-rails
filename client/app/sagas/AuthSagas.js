import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import localforage from 'localforage'
import actions from '../reduxApp/actions'
import { parseError, getAuthHeaders } from './Shared'


function * makeLoginRequest (api, action) {
  const { email, password, resolve, reject } = action
  const response = yield call(api.login, email, password)
  const responseCode = get(response, 'data.code')
  if (response.ok && responseCode !== 401) {
    const headers = get(response, 'headers')
    const user = get(response, 'data.data')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }

    yield put(actions.saveUser(currentUser))
    yield* saveUserToLocalStorage(currentUser)
    yield put(actions.loginSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(actions.addError(error))
    yield put(actions.loginFailure(error))
    return reject(error)
  }
}

function * saveUserToLocalStorage(currentUser) {
  yield localforage.setItem('currentUser', currentUser);
}

function * removeUserFromLocalStorage() {
  yield localforage.setItem('currentUser', {});
}

export function * makeVerifyTokenRequest (api, action) {
  const { token, resolve, reject } = action
  const response = yield call(api.verifyToken, token)
  return (response.ok ? resolve() : reject(response.problem))
}

export function * makeSignupRequest (api, action) {
  const { payload: { email, password, passwordConfirmation }, resolve, reject } = action
  const response = yield call(api.signup, email, password, passwordConfirmation)
  const responseCode = get(response, 'data.code')
  if (response.ok && responseCode !== 400) {
    const user = get(response, 'data.data')
    yield put(actions.saveUser(user))
    yield put(actions.signupSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(actions.addError(error))
    yield put(actions.signupFailure(error))
    return reject(error)
  }
}

export function * makeSignoutRequest (api, action) {
  const { resolve, reject } = action
  const headers = yield call(getAuthHeaders)
  const response = yield call(api.signout, headers)
  yield put(actions.saveUser({}))
  yield* removeUserFromLocalStorage()
  if (response.ok) {
    return resolve()
  } else {
    return reject()
  }
}

export function * makeFetchEducationalContentRequest (api, action) {
  const { resolve, reject } = action
  const headers = yield call(getAuthHeaders)
  const response = yield call(api.fetchEducationalContentRequest, headers)
  if (response.ok) {
    const data = get(response, 'data')
    yield put(actions.saveEducationalContent(data))
    yield put(actions.fetchEducationalContentSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(actions.fetchEducationalContentFailure(error))
    return reject(error)
  }
}

function * makeFetchCurrentUserRequest (api, action) {
  const { resolve, reject } = action
  const headers = yield call(getAuthHeaders)
  const response = yield call(api.fetchCurrentUserRequest, headers)
  if (response.ok) {
    const headers = get(response, 'headers')
    const user = get(response, 'data')
    const currentUser = {
      accessToken: headers['access-token'],
      uid: headers['uid'],
      client: headers['client'],
      ...user,
    }
    yield put(actions.saveUser(currentUser))
    yield* saveUserToLocalStorage(currentUser)
    yield put(actions.fetchCurrentUserSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(actions.fetchCurrentUserFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeVerifyTokenRequest,
  makeLoginRequest,
  makeSignupRequest,
  makeSignoutRequest,
  makeFetchEducationalContentRequest,
  makeFetchCurrentUserRequest,
  // EXPORT_SAGA_ACTION
}
