import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'

class Events extends Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.userId)
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }
    return (
      <>
        <div id="userEvents">
          <h1 className="title">My Events</h1>
          {this.props.myEvents.map(event => (
            <div key={event.id}>
              <img src={event.group.image} width="150" />
              <p>Group : {event.group.name}</p>
              <h1 className="header">Event: </h1>
              <p>{event.name}</p>
              <h1 className="header">Event Type: </h1>
              <p>{event.type}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  myEvents: state.events.myEvents
})
const mapDispatchToProps = dispatch => ({
  getMyEvents: userId => dispatch(getMyEvents(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(Events)
