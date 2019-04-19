import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import actions from '../reduxApp/actions'
import { parseError, getAuthHeaders } from './Shared'

function * makeFetchUsersRequest (api, action) {
  const { payload, resolve, reject } = action
  const headers = yield call(getAuthHeaders)
  const response = yield call(api.fetchUsersRequest, headers)
  if (response.ok) {
    const data = get(response, 'data')
    yield put(actions.saveUsersLocal(data))
    yield put(actions.fetchUsersSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(actions.fetchUsersFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeFetchUsersRequest,
  // EXPORT_SAGA_ACTION
}
