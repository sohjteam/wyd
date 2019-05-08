import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyFriends, searchFriend} from '../store/user'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardGroup,
  CardTitle,
  Form,
  Label,
  Input
} from 'reactstrap'

class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getMyFriends(this.props.userId)
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.searchFriend(this.state.username)
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
        <Form id="addFriend" onSubmit={this.handleSubmit}>
          <Label for="friendSearch">Search:</Label>
          <Input
            id="addFriend"
            placeholder="Search Username"
            name="username"
            onChange={this.handleChange}
          />
          <Button type="submit">Add Friend</Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  search: state.user.search,
  friends: state.user.friends,
  userId: state.user.user.id
})

const mapDispatchToProps = dispatch => ({
  getMyFriends: userId => dispatch(getMyFriends(userId)),
  searchFriend: username => dispatch(searchFriend(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
