import axios from 'axios'

const GET_NOTIFS = 'GET_NOTIFS'
const POST_NOTIF = 'POST_NOTIF'
const DELETE_NOTIF = 'DELETE_NOTIF'

const gotNotifs = notifs => ({type: GET_NOTIFS, notifs})
const postedNotif = newNotif => ({type: POST_NOTIF, newNotif})
const deletedNotif = notif => ({type: DELETE_NOTIF, notif})

const initialState = {
  notifs: []
}

export const getNotifs = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/notifications`)
    console.log(res.data.notifications)
    dispatch(gotNotifs(res.data.notifications))
  } catch (error) {
    console.log(error)
  }
}

export const postNotif = newNotif => async dispatch => {
  try {
    const res = await axios.post('/api/notifications', newNotif)
    dispatch(postedNotif(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteNotif = notifId => async dispatch => {
  try {
    await axios.delete(`/api/notifications/${notifId}`)
    dispatch(deletedNotif())
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFS:
      return {...state, notifs: action.notifs}
    case DELETE_NOTIF:
      return {
        ...state,
        notifs: state.notifs.filter(notif => notif !== action.notif)
      }
    default:
      return state
  }
}
