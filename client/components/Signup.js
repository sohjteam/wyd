import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/user'
import {Container, Form, FormGroup, Col, Label, Button, Input} from 'reactstrap'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
    this.props.createUser(email, password, firstName, lastName)
  }
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Col md={{size: 6, offset: 5}}>
            <h2>Signup</h2>
          </Col>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email
            </Label>
            <Col sm={10}>
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
            <Label for="password" sm={2}>
              Password
            </Label>
            <Col sm={10}>
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
            <Label for="firstName" sm={2}>
              First Name
            </Label>
            <Col sm={10}>
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
            <Label for="lastName" sm={2}>
              Last Name
            </Label>
            <Col sm={10}>
              <Input
                type="lastName"
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Col>
          </FormGroup>
          <Col md={{size: 12, offset: 3}}>
            <Button>Submit</Button>
          </Col>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, firstName, lastName) =>
    dispatch(createUser(email, password, firstName, lastName))
})

export default connect(null, mapDispatchToProps)(Signup)
