import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupEvents} from '../store/events'
import {getGroup} from '../store/groups'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = Calendar.momentLocalizer(moment)

class SingleGroup extends Component {
  componentDidMount() {
    const groupId = this.props.match.params.id
    this.props.getGroup(groupId)
    this.props.getEvents(groupId)
  }

  render() {
    const group = this.props.group
    const members = this.props.members
    return (
      <>
        <>
          <img src={group.image} width="150" />
          <h5>{group.name}</h5>
          <p>Members: </p>
          <ul>
            {members.map(member => (
              <li>
                <img src={member.image} />
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        </>
        <>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.props.events.map(event => ({
              start: event.startDate,
              end: event.startDate,
              title: event.name
            }))}
            style={{height: '80vh', width: '70vw'}}
          />
        </>
      </>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.groupEvents,
  group: state.groups.group,
  members: state.groups.members
})

const mapDispatchToProps = dispatch => ({
  getEvents: groupId => dispatch(getGroupEvents(groupId)),
  getGroup: groupId => dispatch(getGroup(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
