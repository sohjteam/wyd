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
      invite: []
    }
    // this.handleSubmit = this.handleSubmit.bind(this)
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
  // handleSubmit = evt => {
  //   evt.preventDefault()
  //   const {name, password, image, members} = this.state

  //   const newGroup = {
  //     name,
  //     password,
  //     image,
  //     members
  //   }
  //   this.props.addNewGroup(newGroup)
  // }

  handleAdd() {
    this.props.postNotif({
      content: `${this.props.user.username} wants to add you to a new group! `,
      invite: 'group',
      userId: this.props.search.id,
      senderId: this.props.userId
    })
  }

  handleSelect(evt) {
    evt.persist()
    if (this.state.invite.includes(evt.target.value)) {
      this.setState(state => ({
        invite: state.invite.filter(elem => elem !== evt.target.value)
      }))
    } else {
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
        <Form id="groupForm">
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
              name="selectMulti"
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
            {console.log('INVITE', this.state.invite)}
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
  userFriends: state.user.friends,
  search: state.user.search,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  addNewGroup: newGroup => dispatch(addNewGroup(newGroup)),
  getMyFriends: userId => dispatch(getMyFriends(userId)),
  postNotif: newNotif => dispatch(postNotif(newNotif))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
