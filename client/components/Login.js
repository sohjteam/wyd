import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import {Link} from 'react-router-dom'
import {Form, FormGroup, Label, Col, Input, Button} from 'reactstrap'

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
      <div id="login">
        <img id="loginPic" src="wydWeb.png" />
        <Form id="conStyle" onSubmit={this.handleSubmit}>
          <h2>Login</h2>
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

          <Button id="clearButton">Submit</Button>

          <Link to="/signup">
            <Button id="clearButton">Create an Account</Button>
          </Link>
        </Form>
      </div>
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
