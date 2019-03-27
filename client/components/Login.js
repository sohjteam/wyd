import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'

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
    const email = event.target.email
    const password = event.target.password
    this.props.auth(email, password)
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>Email:</h1>
          <input
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
          />
          <h1>Password:</h1>
          <input
            onChange={this.handleChange}
            name="password"
            value={this.state.password}
          />
          <button type="submit">Login</button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password))
})

export default connect(null, mapDispatchToProps)(Login)
