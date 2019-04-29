import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyFriends} from '../store/user'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardGroup,
  CardTitle
} from 'reactstrap'

class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    this.props.getMyFriends(this.props.userId)
  }

  render() {
    if (!this.props.friends) {
      this.props.friends = []
    }
    return (
      <>
        <CardGroup>
          {this.props.friends.map(friend => (
            <>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Button close />
                  </CardTitle>
                  <CardText>
                    <img src={friend.image} width="100" />
                    <p>
                      {friend.firstName} {friend.lastName}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </>
          ))}
        </CardGroup>
        <h3>Add Friend</h3>
      </>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.user.friends,
  userId: state.user.user.id
})

const mapDispatchToProps = dispatch => ({
  getMyFriends: userId => dispatch(getMyFriends(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
