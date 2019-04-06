import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'
import {me} from '../store/user'
import {Container, Row, Col} from 'reactstrap'

class UserHome extends Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.userId)
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }
    let user = this.props.user
    return (
      <>
        <Container>
          <Row>
            <div id="profile">
              <Col xs="3">Profile</Col>
              <img src={user.image} width="150" />
              <h1>
                {' '}
                Name: {user.firstName} {user.lastName}
              </h1>
              <h1>Email: {user.email}</h1>
            </div>
            <div id="userEvents">
              <Col xs="auto">
                My Events
                {this.props.myEvents.map(event => (
                  <div key={event.id}>
                    <h1>Event: {event.name}</h1>
                    <h1>Event Type: {event.type}</h1>
                  </div>
                ))}
              </Col>
            </div>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  myEvents: state.events.myEvents,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getMyEvents: userId => dispatch(getMyEvents(userId)),
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
