import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNotifs} from '../store/notifications'
import {addFriend} from '../store/user'
import {Container, Button} from 'reactstrap'

class Notifications extends Component {
  constructor() {
    super()
    this.handleAccept = this.handleAccept.bind(this)
  }

  componentDidMount() {
    this.props.getNotifs(this.props.userId)
  }

  handleAccept(friendId) {
    console.log('here')
    this.props.addFriend(this.props.userId, friendId)
  }

  render() {
    if (!this.props.notifs) {
      this.props.notifs = []
    }
    const notifs = this.props.notifs
    return (
      <>
        <Container>
          {notifs.map(
            notif =>
              notif.status === 'Pending' && notif.invite === 'friend' ? (
                <li>
                  {notif.content}
                  {console.log('sender', notif.senderId)}
                  <Button onClick={() => this.handleAccept(notif.senderId)}>
                    Accept
                  </Button>
                  <Button>Decline</Button>
                </li>
              ) : null
          )}
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  notifs: state.notifications.notifs
})

const mapDispatchToProps = dispatch => ({
  getNotifs: userId => dispatch(getNotifs(userId)),
  addFriend: (userId, friendId) => dispatch(addFriend(userId, friendId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
