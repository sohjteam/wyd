import axios from 'axios'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

const defaultUser = {}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (error) {
    console.error(error)
  }
}

export const logOut = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (error) {
    console.error(error)
  }
}

export const auth = (email, password) => async dispatch => {
  let res
  try {
    console.log('HDUHSADIH')
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    console.log('REDIRECT')
  } catch (dispatchError) {
    console.error(dispatchError)
  }
}

export const createUser = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName
    })
    dispatch(getUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
