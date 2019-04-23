import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewGroup} from '../store/groups'
import {getMyFriends} from '../store/user'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class GroupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      image: '',
      members: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    const {name, password, image, members} = this.state

    const newGroup = {
      name,
      password,
      image,
      members
    }
    this.props.addNewGroup(newGroup)
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
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input
              type="select"
              name="members"
              id="groupMembersSelect"
              multiple
            >
              {this.props.userFriends.map(friend => (
                <option key={friend.id}>{friend.firstName}</option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  groups: state.groups.groups,
  userFriends: state.user.friends
})

const mapDispatchToProps = dispatch => ({
  addNewGroup: newGroup => dispatch(addNewGroup(newGroup)),
  getMyFriends: userId => dispatch(getMyFriends(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
