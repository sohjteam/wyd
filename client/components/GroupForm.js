import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewGroup} from '../store/groups'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class GroupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      image: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const {name, password, image} = this.state

    const newGroup = {
      name,
      password,
      image
    }
    this.props.addNewGroup(newGroup, this.props.userId)
  }

  render() {
    if (!this.props.groups) {
      this.props.groups = []
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

          <Button type="submit">Submit</Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user.id,
  groups: state.groups.groups,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  addNewGroup: (newGroup, userId) => dispatch(addNewGroup(newGroup, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
