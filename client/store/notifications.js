import axios from 'axios'

const GET_NOTIFS = 'GET_NOTIFS'
const POST_NOTIF = 'POST_NOTIF'
// const DELETE_NOTIF = 'DELETE_NOTIF'
const UPDATE_STATUS = 'UPDATE_STATUS'

const gotNotifs = notifs => ({type: GET_NOTIFS, notifs})
const postedNotif = newNotif => ({type: POST_NOTIF, newNotif})
// const deletedNotif = notif => ({type: DELETE_NOTIF, notif})
const updatedStatus = notif => ({type: UPDATE_STATUS, notif})

const initialState = {
  notifs: []
}

export const getNotifs = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/notifications`)
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

// export const deleteNotif = notifId => async dispatch => {
//   try {
//     await axios.delete(`/api/notifications/${notifId}`)
//     dispatch(deletedNotif())
//   } catch (error) {
//     console.log(error)
//   }
// }

export const updateStatus = (notifId, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/notifications/${notifId}`, data)
    dispatch(updatedStatus(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  let newNotifs
  switch (action.type) {
    case GET_NOTIFS:
      return {...state, notifs: action.notifs}
    case UPDATE_STATUS:
      newNotifs = state.notifs.filter(notif => notif.id !== action.notif.id)
      console.log('sss', newNotifs)
      return {
        ...state,
        notifs: newNotifs
      }
    default:
      return state
  }
}
