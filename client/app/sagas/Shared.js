import { get, map, join } from 'lodash'
import localforage from 'localforage'

export function parseError(response) {
  let errors = get(response, 'data.meta.message')
  if (!errors) {
    errors = get(response, 'data.errors')
  }
  if (response.problem === 'NETWORK_ERROR' || response.problem === 'SERVER_ERROR')
    errors = 'Backend server is down.'
  return errors
}

export const getAuthHeaders = async () => {
  const user = await localforage.getItem('currentUser')
  return {
    'access-token': user.accessToken,
    uid: user.uid,
    client: user.client,
  }
}
