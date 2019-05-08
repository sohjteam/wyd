import axios from 'axios'

const GET_NOTIFS = 'GET_NOTIFS'
const POST_NOTIFS = 'POST_NOTIFS'

const gotNotifs = notifs => ({type: GET_NOTIFS, notifs})
const postedNotifs = newNotifs => ({type: POST_NOTIFS, newNotifs})

const initialState = {
  notifs: []
}

export const getNotifs = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/notifications`)
    dispatch(gotNotifs(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const postNotifs = userId => async dispatch => {
  try {
    const res = await axios.post(`/api/notifications/${userId}`)
    dispatch(postedNotifs(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFS:
      return {...state, notifs: action.notifs}
    case POST_NOTIFS:
      return {state, notifs: action.newNotifs}
    default:
      return state
  }
}
