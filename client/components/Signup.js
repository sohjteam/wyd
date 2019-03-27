import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser} from '../store/user'

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
    const email = event.target.email
    const password = event.target.password
    const firstName = event.target.firstName
    const lastName = event.target.lastName
    this.props.createUser(email, password, firstName, lastName)
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
          <h1>First Name:</h1>
          <input
            onChange={this.handleChange}
            name="firstName"
            value={this.state.firstName}
          />
          <h1>Last Name:</h1>
          <input
            onChange={this.handleChange}
            name="lastName"
            value={this.state.lastName}
          />
          <button type="submit">Sign Up</button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (email, password, firstName, lastName) =>
    dispatch(createUser(email, password, firstName, lastName))
})

export default connect(null, mapDispatchToProps)(Signup)
