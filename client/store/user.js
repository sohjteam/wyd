import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_FRIENDS = 'GET_FRIENDS'
const SEARCH_FRIEND = 'SEARCH_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = updatedUser => ({type: UPDATE_USER, updatedUser})
const getFriends = friends => ({type: GET_FRIENDS, friends})
const searchUsername = username => ({type: SEARCH_FRIEND, username})
const addedFriend = friend => ({type: ADD_FRIEND, friend})

const initialState = {
  user: {},
  friends: [],
  search: {}
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState))
  } catch (error) {
    console.error(error)
  }
}

export const logOut = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
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

export const authUpdate = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {email, password})
  } catch (authError) {
    return {error: authError}
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchError) {
    console.error(dispatchError)
  }
}

export const createUser = (
  email,
  password,
  firstName,
  lastName,
  username
) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName,
      username
    })
    dispatch(getUser(res.data))
    history.push('/userhome')
  } catch (error) {
    console.error(error)
  }
}

export const updatedUser = (userId, update) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, update)
    dispatch(updateUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getMyFriends = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/friends`)
    dispatch(getFriends(res.data.friend))
  } catch (error) {
    console.error(error)
  }
}

export const searchFriend = username => async dispatch => {
  try {
    const res = await axios.get(`/api/friend/${username}`)
    dispatch(searchUsername(res.data[0]))
  } catch (error) {
    console.error(error)
  }
}

export const addFriend = (userId, friendId) => async dispatch => {
  try {
    const res = await axios.post(`/api/friend/${userId}`, {
      userId,
      friendId
    })
    dispatch(addedFriend(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case UPDATE_USER:
      return {...state, user: action.updatedUser}
    case GET_FRIENDS:
      return {...state, friends: action.friends}
    case SEARCH_FRIEND:
      return {...state, search: action.username}
    case ADD_FRIEND:
      return {...state, friends: [...state.friends, action.friend]}
    case REMOVE_USER:
      return initialState
    default:
      return state
  }
}
