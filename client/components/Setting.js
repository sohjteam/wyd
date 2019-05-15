import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authUpdate} from '../store/user'
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import {UserUpdate} from '../components'

class Setting extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      authorized: false,
      modal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const test = await this.props.auth(email, password)
    if (!test) {
      this.setState(state => ({authorized: !state.authorized}))
    } else {
      alert('Wrong Password or Email')
    }
    this.setState(() => ({
      email: '',
      password: ''
    }))
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      authorized: false
    }))
  }

  render() {
    return (
      <>
        <Button outline color="info" onClick={this.toggle}>
          Settings
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {this.state.authorized === false ? (
            <>
              <ModalHeader toggle={this.toggle}>
                Enter Email and Password
              </ModalHeader>
              <ModalBody>
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
                  {/* {error &&
                    error.response && <div> {error.response.data} </div>} */}
                </Form>
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader toggle={this.toggle}>Update Profile</ModalHeader>
              <ModalBody>
                <UserUpdate password={this.state.password} />
              </ModalBody>
            </>
          )}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  auth: (email, password) => dispatch(authUpdate(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
