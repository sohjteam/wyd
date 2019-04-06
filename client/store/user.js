import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_FRIENDS = 'GET_FRIENDS'

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getFriends = friends => ({type: GET_FRIENDS, friends})

const initialState = {
  user: {},
  friends: []
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.user))
  } catch (error) {
    console.error(error)
  }
}

export const logOut = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (error) {
    console.error(error)
  }
}

export const auth = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/userhome')
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
    history.push('/userhome')
  } catch (error) {
    console.error(error)
  }
}

export const getMyFriends = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/friends`)
    dispatch(getFriends(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case GET_FRIENDS:
      console.log('MYFRIENDS', action.friends.friend)
      return {...state, friends: action.friends.friend}
    case REMOVE_USER:
      return initialState
    default:
      return state
  }
}
