import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatedUser} from '../store/user'
import {Form, FormGroup, Label, Button, Input} from 'reactstrap'

class UserUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.user.username,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      password: props.password,
      image: props.user.image
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const {username, firstName, lastName, image, email, password} = this.state
    const update = {
      email,
      username,
      firstName,
      lastName,
      password,
      image
    }
    this.props.updatedUser(this.props.userId, update)
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input
              type="username"
              name="username"
              placeholder="New Username"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="New Email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="New Password"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="firstName"
              name="firstName"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="lastName"
              name="lastName"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Image Upload</Label>
            <Input type="file" name="image" onChange={this.handleChange} />
          </FormGroup>
          <Button id="buttonblue">Submit Update</Button>
        </Form>
      </>
    )
  }
}
const mapStateToProps = state => ({
  userId: state.user.user.id,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  updatedUser: (userId, update) => dispatch(updatedUser(userId, update))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate)
