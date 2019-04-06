import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyEvents} from '../store/events'
import {me, getMyFriends} from '../store/user'
import {Container, Row, Col} from 'reactstrap'

class UserHome extends Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.userId)
    this.props.getMyFriends(this.props.userId)
  }

  render() {
    if (!this.props.myEvents) {
      this.props.myEvents = []
    }
    if (!this.props.myFriends) {
      this.props.myFriends = []
    }

    let user = this.props.user
    return (
      <>
        <Container>
          <Row>
            <div id="profile">
              <Col s="auto">
                <h1>Profile</h1>

                <img src={user.image} width="150" />
                <h1 className="header"> Name:</h1>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <h1 className="header">Email: </h1>
                <p>{user.email}</p>

                <h1 className="header">Friends:</h1>
                {this.props.myFriends.map(friend => (
                  <>
                    <h1 key={friend.id}>Name:</h1>
                    <p>
                      {' '}
                      {friend.firstName} {friend.lastName}
                    </p>
                  </>
                ))}
              </Col>
            </div>
            <div id="userEvents">
              <Col s="auto">
                <h1>My Events</h1>
                {this.props.myEvents.map(event => (
                  <div key={event.id}>
                    <h1 className="header">Event: </h1>
                    <p>{event.name}</p>
                    <h1 className="header">Event Type: </h1>
                    <p>{event.type}</p>
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
  userId: state.user.user.id,
  myEvents: state.events.myEvents,
  user: state.user.user,
  myFriends: state.user.friends
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getMyEvents: userId => dispatch(getMyEvents(userId)),
  getMyFriends: userId => dispatch(getMyFriends(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
