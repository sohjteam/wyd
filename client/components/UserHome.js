import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, getMyFriends} from '../store/user'
import {Container, Row, Col} from 'reactstrap'
import Friends from './Friends'

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
        <Container id="userHome">
          <Row>
            <Col xs="6">
              <div id="profile">
                <div className="circle_image">
                  <img src={user.image} id="myProPic" />
                </div>

                <div className="userInfo">
                  <h3 className="header"> Name: </h3>
                  <p className="info">
                    {user.firstName} {user.lastName}
                  </p>
                  <br />
                  <h3 className="header"> Username: </h3>
                  <p className="info">{user.username}</p>
                  <br />
                  <h3 className="header">Email: </h3>
                  <p className="info">{user.email}</p>
                  <br />
                  <h3 className="header">Friends:</h3>
                  <Friends />
                </div>
              </div>
            </Col>

            <Col xs="6">
              <div id="notifs">
                <p>notifs</p>
              </div>
            </Col>
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
