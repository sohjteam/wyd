import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewGroup} from '../store/groups'
import {getMyFriends} from '../store/user'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {postNotif} from '../store/notifications'

class GroupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      image: '',
      invite: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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
    console.log('ME', this.props.userId)
    const userId = this.props
    const {name, password, image} = this.state

    const newGroup = {
      name,
      password,
      image
    }
    this.props.addNewGroup(newGroup, this.props.userId)
  }

  handleAdd() {
    this.state.invite.map(friend => {
      this.props.postNotif({
        content: `${
          this.props.user.username
        } wants to add you to a new group! `,
        invite: 'group',
        userId: friend,
        senderId: this.props.userId
      })
    })
  }

  handleSelect(evt) {
    evt.persist()
    evt.target.style.fontWeight = ''
    if (this.state.invite.includes(evt.target.value)) {
      this.setState(state => ({
        invite: state.invite.filter(elem => elem !== evt.target.value)
      }))
    } else {
      evt.target.style.fontWeight = '700'
      this.setState(prevState => ({
        invite: [...prevState.invite, evt.target.value]
      }))
    }
  }

  render() {
    if (!this.props.groups) {
      this.props.groups = []
    }
    if (!this.props.userFriends) {
      this.props.userFriends = []
    }

    return (
      <>
        <Form id="groupForm" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="groupName">Group Name</Label>
            <Input
              id="groupNameText"
              placeholder="Group Name"
              name="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="groupPassword">Group Password</Label>
            <Input
              id="groupPasswordText"
              placeholder="Group Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="groupImage">Group Image</Label>
            <Input
              id="groupImageText"
              type="file"
              name="image"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="friendList">Select Friends</Label>

            <Input
              type="select"
              id="exampleSelectMulti"
              multiple
              onClick={this.handleSelect}
            >
              {this.props.userFriends.map(friend => (
                <option key={friend.id} value={friend.id}>
                  {friend.username}
                </option>
              ))}
            </Input>
          </FormGroup>

          {/* checkbox instead of multi select
           <FormGroup>
            <Label for="friendList">Select Friends</Label>
            <br />
            {this.props.userFriends.map(friend => (
              <FormGroup key={friend.id} check inline>
                <Label onClick={this.handleSelect} check>
                  <Input type="checkbox" value={friend.id} />
                  {friend.username}
                </Label>
              </FormGroup>
            ))}

            {console.log('invite', this.state.invite)}
          </FormGroup> */}

          <Button type="submit" onClick={this.handleAdd}>
            Submit
          </Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  groups: state.groups.groups,
  userFriends: state.user.friends,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  addNewGroup: (newGroup, userId) => dispatch(addNewGroup(newGroup, userId)),
  getMyFriends: userId => dispatch(getMyFriends(userId)),
  postNotif: newNotif => dispatch(postNotif(newNotif))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
