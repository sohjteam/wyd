import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/user'
import {Container, Form, FormGroup, Col, Label, Button, Input} from 'reactstrap'

const conStyle = {
  marginTop: '20vh',
  width: '40vw'
}

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: ''
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
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const username = event.target.username.value
    this.props.createUser(email, password, firstName, lastName, username)
  }
  render() {
    return (
      <Container style={conStyle}>
        <Form onSubmit={this.handleSubmit}>
          <Col md={{size: 6, offset: 5}}>
            <h2>Signup</h2>
          </Col>
          <FormGroup row>
            <Label for="email" sm={3}>
              Email
            </Label>
            <Col sm={9}>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={3}>
              Password
            </Label>
            <Col sm={9}>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="firstName" sm={3}>
              First Name
            </Label>
            <Col sm={9}>
              <Input
                type="firstName"
                name="firstName"
                id="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={3}>
              Last Name
            </Label>
            <Col sm={9}>
              <Input
                type="lastName"
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="username" sm={3}>
              Username
            </Label>
            <Col sm={9}>
              <Input
                type="username"
                name="username"
                id="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </Col>
          </FormGroup>
          <Col md={{size: 6, offset: 5}}>
            <Button>Submit</Button>
          </Col>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, firstName, lastName, username) =>
    dispatch(createUser(email, password, firstName, lastName, username))
})

export default connect(null, mapDispatchToProps)(Signup)
