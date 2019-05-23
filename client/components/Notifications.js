import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNotifs, updateStatus} from '../store/notifications'
import {addFriend} from '../store/user'
import {addMember} from '../store/groups'
import {addEventMember} from '../store/events'
import {Container, Button, Card, CardText, CardTitle} from 'reactstrap'

class Notifications extends Component {
  constructor() {
    super()
    this.handleAccept = this.handleAccept.bind(this)
    this.handleAcceptGroup = this.handleAcceptGroup.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }

  componentDidMount() {
    this.props.getNotifs(this.props.userId)
  }

  handleAccept(friendId, notifId) {
    this.props.addFriend(this.props.userId, friendId)
    this.props.updateStatus(notifId, {status: 'Accepted', clear: 'TRUE'})
  }

  handleAcceptGroup(notifId, groupId) {
    this.props.addMember(this.props.userId, groupId)
    this.props.updateStatus(notifId, {status: 'Accepted', clear: 'TRUE'})
  }

  handleReject(notifId) {
    this.props.updateStatus(notifId, {status: 'Rejected', clear: 'TRUE'})
  }

  render() {
    if (!this.props.notifs) {
      this.props.notifs = []
    }
    const notifs = this.props.notifs
    return (
      <div id="notifs">
        <Container>
          {notifs.map(
            notif =>
              notif.status === 'Pending' && notif.invite === 'friend' ? (
                <div>
                  <Card body>
                    <CardTitle>
                      {notif.invite.charAt(0).toUpperCase() +
                        notif.invite.slice(1)}{' '}
                      Invitation
                    </CardTitle>
                    <CardText>
                      {notif.content.charAt(0).toUpperCase() +
                        notif.content.slice(1)}!
                    </CardText>
                    <Button
                      id="clearButton"
                      onClick={() =>
                        this.handleAccept(notif.senderId, notif.id)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      id="clearButton"
                      onClick={() => this.handleReject(notif.id)}
                    >
                      Decline
                    </Button>
                  </Card>
                </div>
              ) : null
          )}
        </Container>
        <Container>
          {notifs.map(
            notif =>
              notif.status === 'Pending' && notif.invite === 'group' ? (
                <div>
                  <Card body>
                    <CardTitle>
                      {notif.invite.charAt(0).toUpperCase() +
                        notif.invite.slice(1)}{' '}
                      Invitation
                    </CardTitle>
                    <CardText>
                      {notif.content.charAt(0).toUpperCase() +
                        notif.content.slice(1)}!
                    </CardText>
                    <Button
                      id="clearButton"
                      onClick={() =>
                        this.handleAcceptGroup(notif.id, notif.groupId)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      id="clearButton"
                      onClick={() => this.handleReject(notif.id)}
                    >
                      Decline
                    </Button>
                  </Card>
                </div>
              ) : null
          )}
        </Container>
        <Container>
          {notifs.map(
            notif =>
              notif.status === 'Pending' && notif.invite === 'event' ? (
                <div>
                  <Card body>
                    <CardTitle>
                      {notif.invite.charAt(0).toUpperCase() +
                        notif.invite.slice(1)}{' '}
                      Invitation
                    </CardTitle>
                    <CardText>
                      {notif.content.charAt(0).toUpperCase() +
                        notif.content.slice(1)}!
                    </CardText>
                    <Button
                      id="clearButton"
                      onClick={() =>
                        this.handleAccept(notif.senderId, notif.id)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      id="clearButton"
                      onClick={this.handleReject(notif.id)}
                    >
                      Decline
                    </Button>
                  </Card>
                </div>
              ) : null
          )}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  notifs: state.notifications.notifs
})

const mapDispatchToProps = dispatch => ({
  getNotifs: userId => dispatch(getNotifs(userId)),
  addFriend: (userId, friendId) => dispatch(addFriend(userId, friendId)),
  addMember: (userId, groupId) => dispatch(addMember(userId, groupId)),
  updateStatus: (notifId, data) => dispatch(updateStatus(notifId, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
