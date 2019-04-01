import axios from 'axios'

const GET_MY_EVENTS = 'GET_MY_EVENTS'

const gotMyEvents = myEvents => ({type: GET_MY_EVENTS, myEvents})

const initialState = {
  myEvents: []
}

export const getMyEvents = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/events`)
    dispatch(gotMyEvents(res.data.events))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_EVENTS:
      return {...state, myEvents: action.myEvents}
    default:
      return state
  }
}
