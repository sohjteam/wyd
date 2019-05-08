import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, getMyFriends} from '../store/user'
import {Container, Row, Col} from 'reactstrap'
import Friends from './Friends'
import Notifications from './Notifications'

class UserHome extends Component {
  componentDidMount() {
    this.props.getMyFriends(this.props.userId)
  }

  render() {
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
                <h1 className="title">Profile</h1>

                <img src={user.image} width="150" />
                <h1 className="header"> Name:</h1>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <h1 className="header">Email: </h1>
                <p>{user.email}</p>

                <h1 className="header">Friends:</h1>
                <Friends />
              </Col>
            </div>
          </Row>
          <Row>
            <Notifications />
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  user: state.user.user,
  myFriends: state.user.friends
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getMyFriends: userId => dispatch(getMyFriends(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
