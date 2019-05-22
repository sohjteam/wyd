import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'
import {Collapse, Button, CardBody, Card, CardTitle, CardText} from 'reactstrap'

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
            <div key={event.id}>
              <Card body>
                <CardTitle className="title" onClick={this.toggle}>
                  {event.name}
                </CardTitle>
                <Collapse isOpen={this.state.collapse}>
                  <CardBody>
                    <h4 className="header">Event: </h4>
                    <p>{event.name}</p>
                    <h4 className="header">Event Type: </h4>
                    <p>{event.type}</p>
                    <h4 className="header">Group:</h4>
                    <p>{event.group.name}</p>
                  </CardBody>
                </Collapse>
              </Card>
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
