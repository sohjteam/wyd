import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import {Link} from 'react-router-dom'
import {Container, Form, FormGroup, Label, Col, Input, Button} from 'reactstrap'

const conStyle = {
  marginTop: '20vh',
  width: '40vw'
}

const buttonStyle = {
  marginRight: 20,
  width: 100
}

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
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
  }

  render() {
    const error = this.props.error
    return (
      <Container style={conStyle}>
        <Form onSubmit={this.handleSubmit}>
          <Col md={{size: 6, offset: 5}}>
            <h2>Login</h2>
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
              {error && error.response && <div> {error.response.data} </div>}
            </Col>
          </FormGroup>

          <Col md={{size: 12, offset: 3}}>
            <Button style={buttonStyle}>Submit</Button>

            <Link to="/signup">
              <Button>Create an Account</Button>
            </Link>
          </Col>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.user.error
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
