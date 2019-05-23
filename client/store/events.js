import axios from 'axios'

const GET_MY_EVENTS = 'GET_MY_EVENTS'
const GET_GROUP_EVENTS = 'GET_GROUP_EVENTS'
const ADD_NEW_EVENT = 'ADD_NEW_EVENT'
const ADD_EVENT_MEMBERS = 'ADD_EVENT_MEMBERS'

const gotMyEvents = myEvents => ({type: GET_MY_EVENTS, myEvents})
const gotGroupEvents = groupEvents => ({type: GET_GROUP_EVENTS, groupEvents})
const addedEvent = newEvent => ({type: ADD_NEW_EVENT, newEvent})
const addedMembers = member => ({type: ADD_EVENT_MEMBERS, member})

const initialState = {
  myEvents: [],
  groupEvents: [],
  members: []
}

export const getMyEvents = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/events`)
    dispatch(gotMyEvents(res.data.events))
  } catch (error) {
    console.log(error)
  }
}

export const getGroupEvents = groupId => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${groupId}/events`)
    dispatch(gotGroupEvents(res.data.events))
  } catch (error) {
    console.log(error)
  }
}

export const addNewEvent = newEvent => async dispatch => {
  try {
    const res = await axios.post('/api/events/', newEvent)
    dispatch(addedEvent(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addEventMember = (userId, eventId) => async dispatch => {
  try {
    const res = await axios.post(`/api/events/${eventId}`, {userId, eventId})
    dispatch(addedMembers(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_EVENTS:
      return {...state, myEvents: action.myEvents}
    case GET_GROUP_EVENTS:
      return {...state, groupEvents: action.groupEvents}
    case ADD_NEW_EVENT:
      return {...state, myEvents: [...state.myEvents, action.newEvent]}
    case ADD_EVENT_MEMBERS:
      return {...state, members: [...state.members, action.member]}

    default:
      return state
  }
}
