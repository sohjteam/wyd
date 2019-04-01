import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'

class UserHome extends Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.userId)
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }
    return (
      <>
        <h1>My Events</h1>
        {this.props.myEvents.map(event => (
          <li key={event.id}>
            <h1>Event: {event.name}</h1>
            <h1>Event Type: {event.type}</h1>
          </li>
        ))}
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  myEvents: state.events.myEvents
})
const mapDispatchToProps = dispatch => ({
  getMyEvents: userId => dispatch(getMyEvents(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
