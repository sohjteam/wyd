import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewEvent} from '../store/events'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class EventForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      type: '',
      startDate: '',
      time: '',
      location: '',
      url: ''
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
  handleSubmit = evt => {
    evt.preventDefault()
    const {name, type, startDate, time, location, url} = this.state
    const newEvent = {name, type, startDate, time, location, url}
    this.props.addNewEvent(newEvent)
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }

    return (
      <>
        <Form id="eventForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="eventName">Event Name</Label>
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
            <Label for="eventDate">Date</Label>
            <Input
              type="date"
              name="startDate"
              id="eventDateText"
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

const mapDispatchToProps = dispatch => ({
  addNewEvent: newEvent => dispatch(addNewEvent(newEvent))
})
export default connect(null, mapDispatchToProps)(EventForm)
