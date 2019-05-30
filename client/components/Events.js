import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'
import SingleEvent from './SingleEvent'

class Events extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {collapse: false}
  }
  toggle() {
    this.setState(state => ({collapse: !state.collapse}))
  }
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
          {this.props.myEvents.map(event => (
            <SingleEvent key={event.id} event={event} />
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
