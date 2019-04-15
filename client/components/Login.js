import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    console.log('huh', this.handleChange)
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
          <Link to="/signup">
            <button>Create an Account</button>
          </Link>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password))
})

export default connect(null, mapDispatchToProps)(Login)
