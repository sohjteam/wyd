import axios from 'axios'

const GET_MY_GROUPS = 'GET_MY_GROUPS'
const GET_SINGLE_GROUP = 'GET_SINGLE_GROUP'
const ADD_NEW_GROUP = 'ADD_NEW_GROUP'

const gotMyGroups = groups => ({type: GET_MY_GROUPS, groups})
const gotSingleGroup = group => ({type: GET_SINGLE_GROUP, group})
const addedGroup = newGroup => ({type: ADD_NEW_GROUP, newGroup})

const initialState = {
  groups: [],
  group: {},
  members: []
}

export const getMyGroups = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/groups`)
    dispatch(gotMyGroups(res.data.groups))
  } catch (error) {
    console.log(error)
  }
}

export const getSingleGroup = groupId => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${groupId}/members`)
    dispatch(gotSingleGroup(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const addNewGroup = newGroup => async dispatch => {
  try {
    const res = await axios.post('/api/groups/', newGroup)
    dispatch(addedGroup(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_GROUPS:
      return {...state, groups: action.groups}
    case GET_SINGLE_GROUP:
      return {...state, group: action.group, members: action.group.users}
    case ADD_NEW_GROUP:
      return {...state, groups: [...state.groups, action.newGroup]}
    default:
      return state
  }
}
