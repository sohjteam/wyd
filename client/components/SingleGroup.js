import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGroupEvents} from '../store/events'
import {getSingleGroup} from '../store/groups'
import {getMyFriends} from '../store/user'
import EventForm from './EventForm'
import {postNotif} from '../store/notifications'

import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
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
      modal: false,
      modalMembers: false,
      invite: []
    }

    this.toggle = this.toggle.bind(this)
    this.toggleMembers = this.toggleMembers.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.getGroup(this.props.groupId)
    this.props.getEvents(this.props.groupId)
    this.props.getMyFriends(this.props.userId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.groupId !== prevProps.groupId) {
      this.props.getGroup(this.props.groupId)
      this.props.getEvents(this.props.groupId)
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  toggleMembers() {
    this.setState(prevState => ({
      modalMembers: !prevState.modalMembers
    }))
  }

  handleSelect(evt) {
    evt.persist()
    evt.target.style.fontWeight = ''
    if (this.state.invite.includes(evt.target.value)) {
      this.setState(state => ({
        invite: state.invite.filter(elem => elem !== evt.target.value)
      }))
    } else {
      evt.target.style.fontWeight = '700'
      this.setState(prevState => ({
        invite: [...prevState.invite, evt.target.value]
      }))
    }
  }

  handleAdd() {
    this.state.invite.map(friend => {
      this.props.postNotif({
        content: `${
          this.props.user.username
        } wants to add you to a new group : ${this.props.group.name}`,
        invite: 'group',
        userId: friend,
        senderId: this.props.userId,
        groupId: this.props.group.id
      })
    })
  }
  render() {
    const group = this.props.group
    const members = this.props.members
    if (!this.props.userFriends) {
      this.props.userFriends = []
    }
    return (
      <>
        <Container fluid>
          <Row>
            <Col sm="3" style={memStyle}>
              <h1 className="header">{group.name}</h1>
              <br />
              <div id="groupInfo">
                <img id="memberphoto" src={group.image} height="150" />
                <br />
                <Button id="clearButton" onClick={this.toggle}>
                  Add Event
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      Add An Event!
                    </ModalHeader>
                    <ModalBody>
                      <EventForm
                        groupId={this.props.groupId}
                        members={this.props.members}
                      />
                    </ModalBody>
                  </Modal>
                </Button>
              </div>
              <div id="members">
                <h3 className="header">Members: </h3>

                {members.map(member => (
                  <div key={member.id}>
                    <img id="memberphoto" src={member.image} height="100" />
                    {member.firstName} {member.lastName}
                    <br />
                  </div>
                ))}

                <Button id="clearButton" onClick={this.toggleMembers}>
                  Add Members
                  <Modal
                    isOpen={this.state.modalMembers}
                    toggle={this.toggleMembers}
                  >
                    <ModalHeader toggle={this.toggleMembers}>
                      Add Members!
                    </ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.handleAdd}>
                        <FormGroup>
                          <Label for="friendList">Select Friends</Label>
                          <Input
                            type="select"
                            id="exampleSelectMulti"
                            multiple
                            onClick={this.handleSelect}
                          >
                            {this.props.userFriends.map(friend => (
                              <option key={friend.id} value={friend.id}>
                                {friend.username}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                      </Form>
                    </ModalBody>
                  </Modal>
                </Button>
              </div>
            </Col>

            <Col style={CalStyle}>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.props.events.map(event => ({
                  title: event.name,
                  start: new Date(Date.parse(event.startDate)),
                  end: new Date(Date.parse(event.endDate))
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
  members: state.groups.members,
  userFriends: state.user.friends,
  userId: state.user.user.id,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  getEvents: groupId => dispatch(getGroupEvents(groupId)),
  getGroup: groupId => dispatch(getSingleGroup(groupId)),
  getMyFriends: userId => dispatch(getMyFriends(userId)),
  postNotif: newNotif => dispatch(postNotif(newNotif))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
