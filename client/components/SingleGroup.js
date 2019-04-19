import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupEvents} from '../store/events'
import {getSingleGroup} from '../store/groups'
import EventForm from './EventForm'
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
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
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    const groupId = this.props.groupId
    this.props.getGroup(groupId)
    this.props.getEvents(groupId)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    const group = this.props.group
    const members = this.props.members
    return (
      <>
        <Container fluid>
          <Row>
            <Col sm="3" style={memStyle}>
              <img src={group.image} height="150" />
              <h1 className="title">{group.name}</h1>
              <Button onClick={this.toggle}>
                Add Event
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Add An Event!</ModalHeader>
                  <ModalBody>
                    <EventForm groupId={group.id} />
                  </ModalBody>
                </Modal>
              </Button>
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
