import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupEvents} from '../store/events'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = Calendar.momentLocalizer(moment)

class SingleGroup extends Component {
  constructor() {
    super()
    // this.state = {
    //   events: [
    //     {
    //       start: new Date(),
    //       end: new Date(moment().add(1, 'days')),
    //       title: 'Some title'
    //     }
    //   ]
    // }
  }

  componentDidMount() {
    const groupId = this.props.match.params.id
    this.props.getEvents(groupId)
  }

  render() {
    return (
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={this.props.events.map(event => ({
          start: event.startDate,
          end: event.startDate,
          title: event.name
        }))}
        style={{height: '100vh'}}
      />
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.groupEvents
})

const mapDispatchToProps = dispatch => ({
  getEvents: groupId => dispatch(getGroupEvents(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
