import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import {Form, FormGroup, Label, Button, Input} from 'reactstrap'
import {UserUpdate} from '.'

class Setting extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      authorized: false
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
    const email = event.target.email.value
    const password = event.target.password.value
    this.props.auth(email, password)
    if (this.props.auth(email, password)) {
      this.setState(state => ({authorized: !state.authorized}))
    }
  }

  render() {
    return (
      <>
        {this.state.authorized === false ? (
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </FormGroup>
            <Button>Continue</Button>
          </Form>
        ) : (
          <UserUpdate password={this.state.password} />
        )}
      </>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
