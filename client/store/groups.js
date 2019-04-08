import axios from 'axios'

const GET_MY_GROUPS = 'GET_MY_GROUPS'

const gotMyGroups = groups => ({type: GET_MY_GROUPS, groups})

const initialState = {
  groups: []
}

export const getMyGroups = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/groups`)
    dispatch(gotMyGroups(res.data.groups))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_GROUPS:
      return {...state, groups: action.groups}
    default:
      return state
  }
}
