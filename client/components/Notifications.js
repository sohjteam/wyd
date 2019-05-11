import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNotifs} from '../store/notifications'
import {Container} from 'reactstrap'

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifs(this.props.userId)
  }

  render() {
    if (!this.props.notifs) {
      this.props.notifs = []
    }
    const notifs = this.props.notifs
    return (
      <>
        <Container>
          <div id="notifs">
            {notifs.map(
              notif =>
                notif.status === 'Pending' ? <li>{notif.content}</li> : null
            )}
          </div>
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
  getNotifs: userId => dispatch(getNotifs(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
