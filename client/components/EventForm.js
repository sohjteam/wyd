import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewEvent, getMyEvents} from '../store/events'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {postNotif} from '../store/notifications'

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      startDate: '',
      endDate: '',
      time: '',
      location: '',
      url: '',
      groupId: this.props.groupId
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMyEvents(this.props.userId)
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = async evt => {
    evt.preventDefault()

    const {
      name,
      type,
      startDate,
      endDate,
      time,
      location,
      url,
      groupId
    } = this.state

    const newEvent = {
      name,
      type,
      startDate,
      endDate,
      time,
      location,
      url,
      groupId
    }

    await this.props.addNewEvent(newEvent)
  }
  handleAdd = () => {
    console.log('HEEEE', this.props.myEvents[this.props.myEvents.length - 1])
    this.props.members.map(friend => {
      this.props.postNotif({
        content: `${
          this.props.user.username
        } wants to add you to a new event : ${this.state.name} - ${
          this.state.type
        }`,
        invite: 'event',
        userId: friend,
        senderId: this.props.userId
        // eventId: .id
      })
    })
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }

    return (
      <>
        {console.log('myevents', this.props.myEvents)}{' '}
        <Form id="eventForm" onSubmit={this.handleSubmit}>
          <FormGroup onSubmit={this.handleAdd}>
            <Label for="name">Event Name</Label>
            <Input
              id="eventNameText"
              placeholder="Event Name"
              name="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventType">Event Type</Label>
            <Input
              type="select"
              name="type"
              id="eventTypeSelect"
              onChange={this.handleChange}
            >
              <option value="">Select</option>
              <option>Meet Up</option>
              <option>Study Group</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="eventStartDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="eventStartDateText"
              placeholder="MM/DD/YY"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventEndDate">End Date</Label>
            <Input
              type="date"
              name="endDate"
              id="eventEndDateText"
              placeholder="MM/DD/YY"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventTime">Time</Label>
            <Input
              type="time"
              name="time"
              id="eventTimeText"
              placeholder=""
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventLocation"> Location</Label>
            <Input
              id="eventLocationText"
              placeholder=""
              name="location"
              onChange={this.handleChange}
            />
            <Label for="exampleUrl">Location URL</Label>
            <Input
              type="url"
              name="url"
              id="exampleUrl"
              placeholder="www.wyd.com"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    )
  }
}
const mapStateToProps = state => ({
  userId: state.user.user.id,
  myEvents: state.events.myEvents,
  user: state.user.user
})
const mapDispatchToProps = dispatch => ({
  getMyEvents: userId => dispatch(getMyEvents(userId)),
  addNewEvent: newEvent => dispatch(addNewEvent(newEvent)),
  postNotif: newNotif => dispatch(postNotif(newNotif))
})
export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
