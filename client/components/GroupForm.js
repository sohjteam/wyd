import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class GroupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      image: '',
      members: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit = evt => {
    evt.preventDefault()
    const {name, password, image, members} = this.state

    const newGroup = {
      name,
      password,
      image,
      members
    }
  }
  render() {
    return <></>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
