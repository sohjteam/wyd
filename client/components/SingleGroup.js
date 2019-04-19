import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupEvents} from '../store/events'
import {getSingleGroup} from '../store/groups'
import {Container, Col, Row} from 'reactstrap'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const CalStyle = {
  paddingTop: 20,
  paddingRight: 30,
  PaddingLeft: 20
}

const memStyle = {
  paddingTop: 20,
  PaddingLeft: 50
}
const localizer = Calendar.momentLocalizer(moment)

class SingleGroup extends Component {
  constructor() {
    super()
  }

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
        <Container fluid>
          <Row>
            <Col sm="3" style={memStyle}>
              <img src={window.location.origin + group.image} height="150" />
              <h1 className="title">{group.name}</h1>
              <h3>Members: </h3>
              {members.map(member => (
                <li>
                  <img src={member.image} height="150" />
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </Col>
            <Col style={CalStyle}>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.props.events.map(event => ({
                  start: event.startDate,
                  end: event.startDate,
                  title: event.name
                }))}
                style={{height: '80vh'}}
              />
            </Col>
          </Row>
        </Container>
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
  getGroup: groupId => dispatch(getSingleGroup(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
