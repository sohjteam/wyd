import React from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'

const UserHome = () => {
  return (
    <>
      <h1>hi</h1>
    </>
  )
}

const mapStateToProps = () => {}
const mapDispatchToProps = dispatch => ({
  getMyEvents: userId => dispatch(getMyEvents(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
