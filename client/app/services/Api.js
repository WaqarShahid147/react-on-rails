// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { map, get, isEmpty } from 'lodash'

const create = () => {
  const api = apisauce.create({
    baseURL: '/api/v1/',
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
    },
    timeout: 10000
  })

  const authApi = apisauce.create({
    baseURL: '/',
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
    },
    timeout: 10000
  })

  const getRoot = () => api.get('')

  const login = (email, password) =>
    authApi.post('auth/sign_in', { email, password })

  const signup = (email, password, password_confirmation) => {
    const formData = new FormData()
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);

    return authApi.post('auth', formData)
  }

  const signout = (headers) =>
    authApi.delete('auth/sign_out', {}, { headers })

  const fetchCurrentUserRequest = (headers) =>
    api.get('profile', {}, { headers })

  // ADD_API_HANDLER

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    login,
    signup,
    signout,
    fetchCurrentUserRequest,
    // EXPORT_API_HANDLER
  }
}

// let's return back our create method as the default.
export default {
  create
}
