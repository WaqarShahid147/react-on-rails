import { takeLatest, all } from 'redux-saga/effects'
import API                from '../services/Api'
import FixtureAPI         from '../services/FixtureApi'
import DebugConfig        from '../config/DebugConfig'

/* ------------- Types ------------- */

import ActionTypes        from '../reduxApp/actionTypes'

/* ------------- Sagas ------------- */

import AuthSagas          from './AuthSagas'
// IMPORT_SAGAS

const Sagas = {
  ...AuthSagas,
  // SPREAD_SAGAS
}

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {

  yield all([
    // some sagas only receive an action
    takeLatest(ActionTypes.LOGIN_REQUEST, Sagas.makeLoginRequest, api),
    takeLatest(ActionTypes.VERIFY_TOKEN_REQUEST, Sagas.makeVerifyTokenRequest, api),
    takeLatest(ActionTypes.SIGNUP_REQUEST, Sagas.makeSignupRequest, api),
    takeLatest(ActionTypes.SIGNOUT_REQUEST, Sagas.makeSignoutRequest, api),
    takeLatest(ActionTypes.FETCH_CURRENT_USER_REQUEST, Sagas.makeFetchCurrentUserRequest, api),
    // REGISTRER_SAGA
  ])
}
